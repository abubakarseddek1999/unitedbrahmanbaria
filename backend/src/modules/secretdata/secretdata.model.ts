import { Schema, model } from 'mongoose';
import { SecretData } from './secretdata.interface';

const secretdataSchema = new Schema<SecretData>({
  images: {
    type: [String],
    default: [],
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  submitterType: {
    type: String,
    required: true,
  },
  hideIdentity: {
    type: Boolean,
    required: true,
  },
  dateSubmitted: {
    type: Date,
    default: () => new Date(),
  },
  status: {
    type: String,
    required: true,
  },
});

// ✅ Add descending index for latest-first sort
secretdataSchema.index({ dateSubmitted: -1 });

export const Secretdata = model<SecretData>('Secretdata', secretdataSchema);
