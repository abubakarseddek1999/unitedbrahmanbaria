import { Schema, model } from 'mongoose';
import { IComplaint } from './complaint.interface';

const complaintSchema = new Schema<IComplaint>({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    default: 'নতুন', // Default status is 'pending'
  },
  dateSubmitted: {
    type: Date, // ✅ CHANGED from String to Date
    default: () => Date.now(),
  },
  hidePhone: {
    type: Boolean,
    default: false,
  },
  hideName: {
    type: Boolean,
    default: false,
  },
});

// ✅ Index to get latest complaints first
complaintSchema.index({ dateSubmitted: -1 });

export const Complaint = model<IComplaint>('Complaint', complaintSchema);
