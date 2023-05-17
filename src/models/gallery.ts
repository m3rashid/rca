import mongoose from 'mongoose';
import { BaseModel } from 'rca/models';

export interface IGallery extends BaseModel {
  _id?: string;
  name: string;
  image: string;
  description?: string;
}

const gallerySchema = new mongoose.Schema<IGallery>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Gallery =
  mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', gallerySchema);
