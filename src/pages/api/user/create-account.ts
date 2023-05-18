import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'rca/models';
import { IUser, User } from 'rca/models/user';
import { getHash } from 'rca/utils/auth';

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const hash = await getHash(password);
  await connectDb();

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User<IUser>({
    name,
    email,
    password: hash,
    type: 'USER',
  });

  await user.save();
  return res.status(200).json({ message: 'User created' });
};

export default createUser;
