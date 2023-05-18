import connectDb from 'rca/models';
import { IUser, User } from 'rca/models/user';
import { compareHash } from 'rca/utils/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string | boolean;
  data: IUser | null;
};

export const loginService = async (body: {
  email?: string;
  password: string;
}): Promise<Data> => {
  const { password, email } = body;
  if (!password || !email) {
    return { error: 'Missing email or username and password', data: null };
  }
  await connectDb();

  const user = await User.findOne({ email });
  if (!user) return { error: true, data: null };

  const passwordValid = await compareHash(password, user.password);
  if (!passwordValid) return { error: true, data: null };
  return { error: false, data: user };
};

export const getUserService = async ({
  id,
  email,
}: {
  id?: string;
  email?: string;
}): Promise<Data> => {
  if (!id && !email) return { error: true, data: null };
  let user: IUser | null = null;

  if (id) user = await User.findById(id);
  else user = await User.findOne({ email });
  if (!user) return { error: true, data: null };
  return { error: false, data: user };
};

const login = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const response = await loginService({ email, password });

    return res.status(200).json(response);
  } else {
    return res.status(405).json({ error: 'Method not allowed', data: null });
  }
};

export default login;
