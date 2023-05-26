import { INotice, Notice } from 'rca/models/notice';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDb from 'rca/models';

interface Data {
  error: string | null;
  data: INotice | INotice[] | null;
}

const notices = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connectDb();

  if (req.method === 'GET') {
    const notices = await Notice.find({});
    return res.status(200).json({ error: null, data: notices });
  } else if (req.method === 'POST') {
    const { title, description, issuedBy } = req.body;
    if (!title || !description || !issuedBy) {
      return res
        .status(400)
        .json({ error: 'Missing title/description/issuedBy', data: null });
    }
    const notice = new Notice<INotice>({ title, description, issuedBy });
    const newNotice = await notice.save();
    return res.status(200).json({ error: null, data: newNotice });
  } else if (req.method === 'PUT') {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedNotice = await Notice.findByIdAndUpdate(_id, { ...updates });
    return res.status(200).json({ error: null, data: updatedNotice });
  } else if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });

    const deletedNotice = await Notice.findByIdAndDelete(_id);
    return res.status(200).json({ error: null, data: deletedNotice });
  } else {
    return res.status(405).json({ error: 'Method not allowed', data: null });
  }
};

export default notices;
