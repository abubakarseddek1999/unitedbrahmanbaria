// member.model.ts
import { Schema, model } from 'mongoose';
import { IMember } from './member.interface';

const memberSchema = new Schema<IMember>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
  },
  profession: {
    type: String,
    // required: true,

  },
  designation: {
    type: String,
    default: 'সদস্য',
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  dob: {
    type: String,
  },
  about: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  dateJoined: {
    type: String,
  }
});


export const Member = model<IMember>('Member', memberSchema);

