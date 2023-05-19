import mongoose from 'mongoose';
import { BaseModel } from 'rca/models';

export interface IConfig extends BaseModel {
  name: string;
  value: string;
}

const configSchema = new mongoose.Schema<IConfig>(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export const Config =
  mongoose.models.Config || mongoose.model<IConfig>('Config', configSchema);
