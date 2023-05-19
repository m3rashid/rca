import { ITestCenter, TestCenter } from "rca/models/testCenter";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "rca/models";

interface Data {
    error: string | null;
    data: ITestCenter | ITestCenter[] | null;
}

const testCenter = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDb();

    if (req.method === 'GET') {
        const testCenters = await TestCenter.find({});
        return res.status(200).json({ error: null, data: testCenters });
    } else if (req.method === 'POST') {
        const body = req.body;
        const testCenter = new TestCenter<ITestCenter>({ ...body });
        const newTestCenter = await testCenter.save();
        return res.status(200).json({ error: null, data: newTestCenter });
    } else if (req.method === 'PUT') {
        const { _id, ...updates } = req.body;
        if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
        const updatedTestCenter = await TestCenter.findByIdAndUpdate(_id, { ...updates });
        return res.status(200).json({ error: null, data: updatedTestCenter });
    } else if (req.method === 'DELETE') {
        const { _id } = req.body;
        if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });
        const deletedTestCenter = await TestCenter.findByIdAndDelete(_id);
        return res.status(200).json({ error: null, data: deletedTestCenter });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default testCenter;