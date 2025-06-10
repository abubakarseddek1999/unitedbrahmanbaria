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
      const successdataQueries = new QueryBuilder(Successdata.find(), query)
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

      const result = await successdataQueries.modelQuery;
      return result ;
};

// get successdata by Id or single  service

export const getSuccessdataByIdService = async (id:string) => {
  const result = await Successdata.findById(id);
  return result;
};

// delete successdata by Id or single  service

export const deleteSuccessdataByIdService = async (id:string) => {
  const result = await Successdata.findByIdAndDelete(id);
  return result;
};
// update successdata by Id or single  service

export const updateSuccessdataByIdService = async (id:string,payload:Partial<ISuccessdata>) => {
  const result = await Successdata.findByIdAndUpdate(id,payload,{
      
      new: true,
      runValidators: true,
    
  });
  return result;
};

    
      