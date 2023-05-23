import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRegister } from 'rca/components/register/validate';
import connectDb from 'rca/models';
import { Registration } from 'rca/models/registration';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const errors = validateRegister(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }

    const count = await Registration.countDocuments();
    const rollNumber = `RCA-${String(new Date().getFullYear())}-${(
      count + 1
    ).toFixed(4)}`;

    await connectDb();
    const registration = new Registration({
      ...req.body,
      rollNumber: rollNumber,
      registerComplete: true,
    });
    await registration.save();
    return res.status(200).json({ message: 'Registration created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default register;
