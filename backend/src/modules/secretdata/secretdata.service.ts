// secretdata.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { SecretData } from "./secretdata.interface";
import { Secretdata } from "./secretdata.model";

// Create New secretdata service

export const createSecretdataService = async (payload: SecretData) => {
  const result = await Secretdata.create(payload);
  return result;
};

// getAll secretdata service


export const getAllSecretdataService = async (query: Record<string, unknown>) => {
  // Main query for paginated data
  const secretdataQueries = new QueryBuilder(
    Secretdata.find().sort({ dateSubmitted: -1 }), // latest first
    query
  )
    .sort()
    .filter()
    .search([
      'subject',
      'location',
      'description',
    ])
    .fields()
    .paginate();

  const data = await secretdataQueries.modelQuery;

  // Count total documents (without pagination)
  const totalCountQuery = new QueryBuilder(Secretdata.find(), query)
    .sort() // যদি প্রয়োজন হয়
    .filter()
    .search([
      // উপরের fields এর সাথে মিলিয়ে রাখো
    ]);

  const total = await totalCountQuery.modelQuery.countDocuments();

  return { data, total };
};
// get secretdata by Id or single  service

export const getSecretdataByIdService = async (id: string) => {
  const result = await Secretdata.findById(id);
  return result;
};

// delete secretdata by Id or single  service

export const deleteSecretdataByIdService = async (id: string) => {
  const result = await Secretdata.findByIdAndDelete(id);
  return result;
};
// update secretdata by Id or single  service

export const updateSecretdataByIdService = async (id: string, payload: Partial<SecretData>) => {
  const result = await Secretdata.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


