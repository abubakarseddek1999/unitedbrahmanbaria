import { Schema, model } from 'mongoose';
import { IGallerydata } from './gallerydata.interface';

const gallerydataSchema = new Schema<IGallerydata>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dateSubmitted: {
    type: Date,
    default: Date.now,
  },
  photo: {
    type: String,
    required: true,
  },
});

// ✅ Add descending index on dateSubmitted for latest first queries
gallerydataSchema.index({ dateSubmitted: -1 });

export const Gallerydata = model<IGallerydata>('Gallerydata', gallerydataSchema);
