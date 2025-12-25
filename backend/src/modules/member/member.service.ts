// member.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IMember } from "./member.interface";
import { Member } from "./member.model";

// Create New member service

export const createMemberService = async (payload: IMember) => {
  const result = await Member.create(payload);
  return result;
};

// getAll member service

export const getAllMemberService = async (query: Record<string, unknown>) => {
  const memberQueries = new QueryBuilder(Member.find(), query)
    .sort()
    .filter()
    .search([
      'name',
      'category',
      'description',
      // replace  with proper fields
    ])
    .fields()
    .paginate()
  const countQuery = new QueryBuilder(Member.find(), query)
    .filter()
    .search([
      'name',
      'category',
      'description',
    ]);
  const meta = await memberQueries.countTotal();
  const result = await memberQueries.modelQuery;
  return { result, meta };
};

// get member by Id or single  service

export const getMemberByIdService = async (id: string) => {
  const result = await Member.findById(id);
  return result;
};

// delete member by Id or single  service

export const deleteMemberByIdService = async (id: string) => {
  const result = await Member.findByIdAndDelete(id);
  return result;
};
// update member by Id or single  service

export const updateMemberByIdService = async (id: string, payload: Partial<IMember>) => {
  const result = await Member.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


