import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'rca/models';
import { User } from 'rca/models/user';
import { compareHash } from 'rca/utils/auth';
import { getHash } from 'rca/utils/auth';

const changePassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { currentPwd, newPwd, userId } = req.body;
    if (!currentPwd || !newPwd) throw new Error('Insufficient Data');

    await connectDb();

    if (!userId) throw new Error('Unauthorized');
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const isValidPwd = compareHash(currentPwd, user.password);
    if (!isValidPwd) throw new Error('Password not matched');

    const hashedPassword = await getHash(newPwd);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export default changePassword;
