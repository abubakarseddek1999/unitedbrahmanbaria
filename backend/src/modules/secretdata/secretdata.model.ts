// secretdata.model.ts

  import { Schema, model } from 'mongoose';
import { ISecretdata } from './secretdata.interface';

const secretdataSchema = new Schema<ISecretdata>({
  images: {
    type: [String],  // <-- এটা array of strings হবে, না যে শুধু string
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
// update your content here
});


  export const Secretdata = model<ISecretdata>('Secretdata', secretdataSchema);

  