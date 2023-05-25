import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDb from 'rca/models';
import { Config } from 'rca/models/configs';
import { Registration } from 'rca/models/registration';
import { TestCenter } from 'rca/models/testCenter';

const getProfileData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDb();
    const session = await getSession({ req });
    if (!session) throw new Error('Unauthorized');

    const configs = await Config.find({}).lean();
    const registration = await Registration.findOne({
      // @ts-ignore
      user: new mongoose.Types.ObjectId(session.user?._id),
    }).populate('user');
    const testCenter = await TestCenter.findById(
      registration?.testCenter
    ).lean();

    return res.status(200).json({
      dateOfExam: configs.find((c) => c.name === 'dateOfExam')?.value,
      timeOfExam: configs.find((c) => c.name === 'timeOfExam')?.value,
      registration,
      testCenter,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default getProfileData;
