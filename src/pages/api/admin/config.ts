import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "rca/models";
import { Config } from "rca/models/configs";

interface Data {
    error: string | null;
    data: any | any[] | null;
}

const config = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectDb();

    if (req.method === 'GET') {
        const config = await Config.find({});
        return res.status(200).json({ error: null, data: config });
    } else if (req.method === 'PUT') {
        const { name, value } = req.body;
        const config = await Config.findOne({ name: name })
        if (!config) return res.status(400).json({ error: 'Missing config', data: [] });
        const updatedConfig = await Config.findOneAndUpdate({ name: name }, { value: value });
        return res.status(200).json({ error: null, data: updatedConfig });
    }
}

export default config;