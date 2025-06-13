
// Gallerydata.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createGallerydataService,
  getAllGallerydataService,
  getGallerydataByIdService,
  updateGallerydataByIdService,
  deleteGallerydataByIdService
} from './gallerydata.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

export const createGallerydataController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    console.log("Image Info:", imageInfo); // Debug line

    formattedData = {
      ...req.body,
      photo: imageInfo?.photo, // ✅ Only URL is stored
    };
  }


  const result = await createGallerydataService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created gallerydata',
    data: result,
  });
});

// Get All Gallerydata 

export const getAllGallerydataController: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await getAllGallerydataService(req.query);

  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallerydata retrieved successfully',
    data,
    total,
  });
});


// Get single Gallerydata 

export const getGallerydataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getGallerydataByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallerydata retrived successfully',
    data: result,
  });
});


// update Gallerydata 

export const updateGallerydataByIdController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;
    if (req.files) {
      const imageInfo: any = await handleMulterUpload(req.files);
      console.log("Image Info:", imageInfo); // Debug line
      
      formattedData = {
        ...req.body,
        photo: imageInfo?.photo, // ✅ Only URL is stored
      };
    }
  
  
  const result = await updateGallerydataByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallerydata updated successfully',
    data: result,
  });
});

// delete Gallerydata 

export const deleteGallerydataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteGallerydataByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'gallerydata deleted successfully',
    data: result,
  });
});


