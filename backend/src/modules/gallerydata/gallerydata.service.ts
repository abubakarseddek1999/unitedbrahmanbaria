// gallerydata.service.ts
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IGallerydata } from "./gallerydata.interface";
import { Gallerydata } from "./gallerydata.model";

// Create New gallerydata service

export const createGallerydataService = async (payload: IGallerydata) => {
  const result = await Gallerydata.create(payload);
  return result;
};

// getAll gallerydata service

export const getAllGallerydataService = async (query: Record<string, unknown>) => {
  const baseQuery = Gallerydata.find().sort({ dateSubmitted: -1 }); // latest first

  // Initialize query builder for pagination and data fetching
  const gallerydataQueries = new QueryBuilder(baseQuery, query)
    .sort()
    .filter()
    .search([
      'title',
      'description',
    ])
    .fields()
    .paginate();

  const data = await gallerydataQueries.modelQuery;

  // For total count (before pagination)
  const countQuery = new QueryBuilder(Gallerydata.find(), query)
    .filter()
    .search([
      'title',
      'description',
    ]);

  const total = await countQuery.modelQuery.countDocuments();

  return { data, total };
};


// get gallerydata by Id or single  service

export const getGallerydataByIdService = async (id: string) => {
  const result = await Gallerydata.findById(id);
  return result;
};

// delete gallerydata by Id or single  service

export const deleteGallerydataByIdService = async (id: string) => {
  const result = await Gallerydata.findByIdAndDelete(id);
  return result;
};
// update gallerydata by Id or single  service

export const updateGallerydataByIdService = async (id: string, payload: Partial<IGallerydata>) => {
  const result = await Gallerydata.findByIdAndUpdate(id, payload, {

    new: true,
    runValidators: true,

  });
  return result;
};


