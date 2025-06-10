
// Successdata.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createSuccessdataService,
  getAllSuccessdataService,
  getSuccessdataByIdService,
  updateSuccessdataByIdService,
  deleteSuccessdataByIdService
} from './successdata.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

export const createSuccessdataController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;


  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    console.log("Image Info:", imageInfo); // Debug line

    formattedData = {
      ...req.body,
      images: imageInfo?.images || [], // ✅ Store as array of image URLs
    };
  }

  const result = await createSuccessdataService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created successdata',
    data: result,
  });
});

// Get All Successdata 

export const getAllSuccessdataController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getAllSuccessdataService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'successdata retrived successfully',
    data: result,
  });
});


// Get single Successdata 

export const getSuccessdataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getSuccessdataByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'successdata retrived successfully',
    data: result,
  });
});


// update Successdata 

export const updateSuccessdataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await updateSuccessdataByIdService(req.params.id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'successdata updated successfully',
    data: result,
  });
});

// delete Successdata 

export const deleteSuccessdataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteSuccessdataByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'successdata deleted successfully',
    data: result,
  });
});


