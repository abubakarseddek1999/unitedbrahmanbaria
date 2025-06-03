// secretdata.service.ts
    import { QueryBuilder } from "../../builder/QueryBuilder";
    import { ISecretdata } from "./secretdata.interface";
    import { Secretdata } from "./secretdata.model";

    // Create New secretdata service
 
    export const createSecretdataService = async (payload: ISecretdata) => {
  const result = await Secretdata.create(payload);
  return result;
};

// getAll secretdata service

    export const getAllSecretdataService = async (query: Record<string, unknown>) => {
      const secretdataQueries = new QueryBuilder(Secretdata.find(), query)
      .sort()
      .filter()
      .search([
            // 'name',
            // 'category',
            // 'description',
            // replace  with proper fields
            ])
      .fields()
      .paginate()

      const result = await secretdataQueries.modelQuery;
      return result ;
};

// get secretdata by Id or single  service

export const getSecretdataByIdService = async (id:string) => {
  const result = await Secretdata.findById(id);
  return result;
};

// delete secretdata by Id or single  service

export const deleteSecretdataByIdService = async (id:string) => {
  const result = await Secretdata.findByIdAndDelete(id);
  return result;
};
// update secretdata by Id or single  service

export const updateSecretdataByIdService = async (id:string,payload:Partial<ISecretdata>) => {
  const result = await Secretdata.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      