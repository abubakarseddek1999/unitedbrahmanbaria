// successdata.model.ts

  import { Schema, model } from 'mongoose';
import { ISuccessdata } from './successdata.interface';

const successdataSchema = new Schema<ISuccessdata>({
 
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
    type: [String],  // <-- এটা array of strings হবে, না যে শুধু string
    default: [],
  },
});


  export const Successdata = model<ISuccessdata>('Successdata', successdataSchema);

  