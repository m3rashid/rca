import axios from 'axios';
import NextAuth, { AuthOptions, DefaultSession, User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

import connectDb from 'rca/models';
import { IUser } from 'rca/models/user';
import { loginService } from '../login';

connectDb();

export interface Session extends DefaultSession {
  id: string | null;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      authorize: async (credentials) => {
        if (
          !credentials ||
          (!credentials.username && !credentials.email) ||
          !credentials.password
        ) {
          return null;
        }
        const { data, error } = await loginService(credentials);
        return error ? null : data;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // @ts-ignore
        token.id = user._id;
        token.sub = JSON.stringify(user);
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        // @ts-ignore
        session.id = token.id;
        session.user = JSON.parse(token.sub ?? '{}') as IUser;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/auth',
  },
};

export default NextAuth(authOptions);
