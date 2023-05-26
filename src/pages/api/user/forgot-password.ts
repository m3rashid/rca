import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'rca/models';
import { Otp } from 'rca/models/otp';
import { IUser, User } from 'rca/models/user';
import { getHash } from 'rca/utils/auth';
import { getOtp } from 'rca/utils/strings';

const forgotPassword = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDb();
    const { email, step } = req.body;
    if (!email || !step) throw new Error('Bad Input');
    if (step === 1) {
      let otp: number;
      const foundOtp = await Otp.findOne({ email });
      if (foundOtp) otp = foundOtp.otp;
      else {
        const newOtp = new Otp({ email, otp: getOtp() });
        await newOtp.save();
        otp = newOtp.otp;
      }

      // send mail with the OTP
    } else if (step === 2) {
      const { otp, password } = req.body;
      if (!otp || !password) throw new Error('Bad Input');

      const foundOtp = await Otp.findOne({ email });
      if (!foundOtp || foundOtp.otp !== otp) throw new Error('Invalid OTP');

      const newPassword = await getHash(password);
      await User.findOneAndUpdate({ email }, { password: newPassword });
      return res.status(200).json({ message: 'Password Updated successfully' });
    } else throw new Error('Invalid Step');
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export default forgotPassword;
