import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'rca/models';
import { Registration } from 'rca/models/registration';

const registrations = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    await connectDb();
    const allRegistrations = await Registration.find().lean().populate('user');
    console.log(allRegistrations);
    return res.status(200).json(allRegistrations);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export default registrations;
