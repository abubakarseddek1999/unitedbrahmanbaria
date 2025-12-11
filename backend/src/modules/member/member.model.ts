// member.model.ts
import { Schema, model } from 'mongoose';
import { IMember } from './member.interface';

const memberSchema = new Schema<IMember>(
  {

    // update your content here 
    name: { type: String, required: true },
    fatherName: { type: String, required: false },
    motherName: { type: String, required: false },
    fatherProfession: { type: String, required: false },
    motherProfession: { type: String, required: false },
    mobileNumber: { type: String, required: false },
    email: { type: String, required: false },
    photo: { type: String, required: false },
    signature: { type: String, required: false },
    designation: {
      type: String,
      default: 'নতুন-আবেদনকারী',
    },
    birthDate: { type: String, required: false },
    gender: { type: String, required: true },
    age: { type: Number, required: false },
    bloodGroup: { type: String, required: false },
    nationality: { type: String, required: false },
    presentVillage: { type: String, required: false },
    presentPost: { type: String, required: false },
    presentThana: { type: String, required: false },
    presentDistrict: { type: String, required: false },
    permanentVillage: { type: String, required: false },
    permanentPost: { type: String, required: false },
    permanentThana: { type: String, required: false },
    permanentDistrict: { type: String, required: false },
    birthCertificateNo: { type: String, required: false },
    nidCertificateNo: { type: String, required: false },
    passportNo: { type: String, required: false },
    isProbashi: { type: Boolean, required: false },
    currentProfession: { type: String, required: false },
    organizationName: { type: String, required: false },
    workAddress: { type: String, required: false },
    educationQualification: { type: String, required: false },
    interestReason: { type: String, required: false },
    status: { type: String, required: false },
    termsAccepted: { type: Boolean, required: false },
    joinedDate: { type: String, default: new Date().toISOString() },
  },
  { timestamps: true } // optional: adds createdAt and updatedAt
);

export const Member = model<IMember>('Member', memberSchema);
