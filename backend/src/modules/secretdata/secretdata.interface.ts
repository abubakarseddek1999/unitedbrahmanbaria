export interface SecretData {
  _id: string;
  subject: string;
  images?: string[]; 
  description: string;
  submitterType: string;
  hideIdentity: boolean;
  dateSubmitted: Date;
  status: string;
  location: string; // Added location property
}