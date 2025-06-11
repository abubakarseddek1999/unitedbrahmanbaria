// gallerydata.model.ts

import { Schema, model } from 'mongoose';
import { IGallerydata } from './gallerydata.interface';

const gallerydataSchema = new Schema<IGallerydata>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: false,
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


export const Gallerydata = model<IGallerydata>('Gallerydata', gallerydataSchema);

