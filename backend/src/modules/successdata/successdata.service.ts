// successdata.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { ISuccessdata } from "./successdata.interface";
import { Successdata } from "./successdata.model";

// Create New successdata service

export const createSuccessdataService = async (payload: ISuccessdata) => {
  const result = await Successdata.create(payload);
  return result;
};

// getAll successdata service

export const getAllSuccessdataService = async (query: Record<string, unknown>) => {
  // For paginated data (default sort by latest)
  const successdataQueries = new QueryBuilder(
    Successdata.find().sort({ dateSubmitted: -1 }), // Default: latest first
    query
  )
    .sort() // if user gives sort query, it'll override
    .filter()
    .search(['title', 'description'])
    .fields()
    .paginate();
  
  const data = await successdataQueries.modelQuery;

  // For total count (no pagination)
  const countQuery = new QueryBuilder(Successdata.find(), query)
    .sort()
    .filter()
    .search([
      'name',
      'category',
      'description',
    ]);

  const total = await countQuery.modelQuery.countDocuments();

  return { data, total };
};

// get successdata by Id or single  service

export const getSuccessdataByIdService = async (id: string) => {
  const result = await Successdata.findById(id);
  return result;
};

// delete successdata by Id or single  service

export const deleteSuccessdataByIdService = async (id: string) => {
  const result = await Successdata.findByIdAndDelete(id);
  return result;
};
// update successdata by Id or single  service

export const updateSuccessdataByIdService = async (id: string, payload: Partial<ISuccessdata>) => {
  const result = await Successdata.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


