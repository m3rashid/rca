import mongoose from 'mongoose';
import { BaseModel } from '.';

export interface IEvent extends BaseModel {
  _id?: string;
  name: string;
  location: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  contact?: string;
}

const eventSchema = new mongoose.Schema<IEvent>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    contact: { type: String },
  },
  { timestamps: true }
);

export const Event =
  mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);
