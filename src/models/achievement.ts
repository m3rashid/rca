import mongoose from 'mongoose';
import { BaseModel } from 'rca/models';

export interface IAchievement extends BaseModel {
  title: string;
  subtitle?: string;
  description: string;
  photo?: string;
}

const achievementSchema = new mongoose.Schema<IAchievement>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true }
);

export const Achievement =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>('Achievement', achievementSchema);
