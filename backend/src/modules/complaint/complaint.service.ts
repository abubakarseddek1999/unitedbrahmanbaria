// complaint.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IComplaint } from "./complaint.interface";
import { Complaint } from "./complaint.model";

// Create New complaint service

export const createComplaintService = async (payload: IComplaint) => {
  const result = await Complaint.create(payload);
  return result;
};

// getAll complaint service

export const getAllComplaintService = async (query: Record<string, unknown>) => {
  const complaintQueries = new QueryBuilder(
    Complaint.find().sort({ dateSubmitted: -1 }), // Latest first
    query
  )
    .sort()
    .filter()
    .search(['title', 'description', 'email'])
    .fields()
    .paginate();
  
  const data = await complaintQueries.modelQuery;
  // 🔍 Total count without pagination
  const countQuery = new QueryBuilder(Complaint.find(), query)
    .sort() // optional
    .filter()
    .search([
      // 'name',
      // 'category',
      // 'description',
    ]);

  const total = await countQuery.modelQuery.countDocuments();
  return { data, total };;
};

// get complaint by Id or single  service

export const getComplaintByIdService = async (id: string) => {
  const result = await Complaint.findById(id);
  return result;
};

// delete complaint by Id or single  service

export const deleteComplaintByIdService = async (id: string) => {
  const result = await Complaint.findByIdAndDelete(id);
  return result;
};
// update complaint by Id or single  service

export const updateComplaintByIdService = async (id: string, payload: Partial<IComplaint>) => {
  const result = await Complaint.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


