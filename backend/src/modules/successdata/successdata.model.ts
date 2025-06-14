import { Schema, model } from 'mongoose';
import { ISuccessdata } from './successdata.interface';

const successdataSchema = new Schema<ISuccessdata>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    dateSubmitted: {
      type: Date,
      default: () => Date.now(),
    },
    images: {
      type: [String],
      default: [],
    },
  }
);

// ✅ Add descending index on dateSubmitted for latest-first sorting
successdataSchema.index({ dateSubmitted: -1 });

export const Successdata = model<ISuccessdata>('Successdata', successdataSchema);
