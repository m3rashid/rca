import connectDb from 'rca/models';
import { Gallery, IGallery } from 'rca/models/gallery';
import { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  error: string | null;
  data: IGallery | IGallery[] | null;
}

const gallery = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connectDb();

  if (req.method === 'GET') {
    const gallery = await Gallery.find({});
    return res.status(200).json({ error: null, data: gallery });
  } else if (req.method === 'POST') {
    const { name, image, description } = req.body;
    if (!name || !image) {
      return res.status(400).json({ error: 'Missing name/image', data: null });
    }

    const gallery = new Gallery<IGallery>({ name, image, description });
    const newGallery = await gallery.save();
    return res.status(200).json({ error: null, data: newGallery });
  } else if (req.method === 'PUT') {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedGallery = await Gallery.findByIdAndUpdate(_id, { ...updates });
    return res.status(200).json({ error: null, data: updatedGallery });
  } else if (req.method === 'DELETE') {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });
    const deletedGallery = await Gallery.findByIdAndDelete(_id);
    return res.status(200).json({ error: null, data: deletedGallery });
  } else {
    res.status(405).json({ error: 'Method not allowed', data: null });
  }
};

export default gallery;
