import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from 'rca/pages/api/auth/[...nextauth]';
import { User, IUser } from 'rca/models/user';
import connectDb from 'rca/models';
import { getHash } from 'rca/utils/auth';

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, username, email, password, devPassword } = req.body;

  let userType: IUser['type'] = 'CO_ADMIN';
  const session = await getServerSession(req, res, authOptions);

  if (session && (session.user as IUser).type !== 'ADMIN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!session) {
    if (!devPassword || devPassword !== process.env.DEV_PASSWORD) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      // created by dev
      userType = 'ADMIN';
    }
  }

  if (!name || !password || (!username && !email)) {
    return res.status(400).json({ message: 'Bad request' });
  }

  const hash = await getHash(password);

  await connectDb();

  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User<IUser>({
    name,
    username,
    email,
    password: hash,
    type: userType,
  });

  await user.save();
  return res.status(200).json({ message: 'User created' });
};

export default createUser;
