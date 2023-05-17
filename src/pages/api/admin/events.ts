import connectDb from 'rca/models';
import { Event, IEvent } from 'rca/models/event';
import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  error: string | null;
  data: IEvent | IEvent[] | null;
}

const event = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb();

  if (req.method === 'GET') {
    const events = await Event.find({});
    return res.status(200).json({ error: null, data: events });
  } else if (req.method === 'POST') {
    const body = req.body;
    const event = new Event<IEvent>({ ...body });
    const newEvent = await event.save();
    return res.status(200).json({ error: null, data: newEvent });
  } else if (req.method === 'PUT') {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedEvent = await Event.findByIdAndUpdate(_id, { ...updates });
    return res.status(200).json({ error: null, data: updatedEvent });
  } else if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });
    const deletedEvent = await Event.findByIdAndDelete(_id);
    return res.status(200).json({ error: null, data: deletedEvent });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default event;
