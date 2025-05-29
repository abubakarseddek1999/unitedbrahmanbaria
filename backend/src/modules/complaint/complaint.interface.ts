// complaint.model.ts
export interface IComplaint {
  title: string;
  description: string;
  name: string;
  email?: string;
  phone?: string;
  images?: [];
  status?: string;
  dateSubmitted?: string;
  hidePhone?: boolean;
  hideName?: boolean;
}




  