// member.model.ts
export interface IMember {
  name: string;
  fatherName?: string;
  motherName?: string;
  fatherProfession?: string;
  motherProfession?: string;
  mobileNumber?: string;
  email?: string;
  photo?: string;
  signature?: string;
  designation?: string;
  birthDate?: string; // You can use Date if you plan to store it as a Date object
  gender: string;
  age?: number;
  bloodGroup?: string;
  nationality?: string;
  presentVillage?: string;
  presentPost?: string;
  presentThana?: string;
  presentDistrict?: string;
  permanentVillage?: string;
  permanentPost?: string;
  permanentThana?: string;
  permanentDistrict?: string;
  birthCertificateNo?: string;
  nidCertificateNo?: string;
  passportNo?: string;
  isProbashi?: boolean;
  currentProfession?: string;
  organizationName?: string;
  workAddress?: string;
  educationQualification?: string;
  interestReason?: string;
  joinedDate?: string;
  status?: string;
  termsAccepted?: boolean;

  // update your content here 
}

