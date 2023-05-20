import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'rca/models';
import { Registration } from 'rca/models/registration';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {} = req.body;
  await connectDb();
  const registration = new Registration(req.body);
  await registration.save();
  return res.status(200).json({ message: 'Registration created' });
};

export default register;
