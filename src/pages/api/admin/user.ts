import connectDb from 'rca/models';
import { IUser, User } from 'rca/models/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'rca/pages/api/auth/[...nextauth]';

interface Data {
  error: string | null;
  data: IUser | IUser[] | null;
}

const user = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connectDb();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    const users = await User.find({});
    const newUsers = users.reduce((acc, user) => {
      if (session && (session?.user as IUser)._id === user._id) {
        return acc;
      }
      delete user.password;
      return [
        ...acc,
        {
          name: user.name,
          email: user.email,
          username: user.username,
          type: user.type,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      ];
    }, []);

    return res.status(200).json({ error: null, data: newUsers });
  }
};

export default user;
