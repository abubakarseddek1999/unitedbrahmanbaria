// complaint.model.ts

  import { Schema, model } from 'mongoose';
import { IComplaint } from './complaint.interface';

const complaintSchema = new Schema<IComplaint>({
  email: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
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
    // required: true,
  },
  images: {
    type: [String],  // <-- এটা array of strings হবে, না যে শুধু string
    default: [],
  },
  status: {
    type: String,
    // required: true,
  },
  dateSubmitted: {
    type: String,
    // required: true,
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


  export const Complaint = model<IComplaint>('Complaint', complaintSchema);

  