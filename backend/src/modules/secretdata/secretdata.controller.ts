
// Secretdata.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createSecretdataService,
  getAllSecretdataService,
  getSecretdataByIdService,
  updateSecretdataByIdService,
  deleteSecretdataByIdService
} from './secretdata.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

// export const createSecretdataController: RequestHandler = catchAsync(async (req, res) => {
//   const result = await createSecretdataService(req.body);
//   sendResponse(res, {
//     status: 201,
//     success: true,
//     message: 'Successfully created secretdata',
//     data: result,
//   });
// });

export const createSecretdataController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;

  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    console.log("Image Info:", imageInfo); // Debug line

    formattedData = {
      ...req.body,
      images: imageInfo?.images || [], // ✅ Store as array of image URLs
    };
  }

  // Optional: Add user if available
  if ((req as any)?.user?.userId) {
    formattedData.user = (req as any).user.userId;
  }

  const result = await createSecretdataService(formattedData);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created secretdata',
    data: result,
  });
});


// Get All Secretdata 

export const getAllSecretdataController: RequestHandler = catchAsync(async (req, res) => {
  const {data , total} = await getAllSecretdataService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'secretdata retrived successfully',
    data: data,
    total: total,
  });
});


// Get single Secretdata 

export const getSecretdataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getSecretdataByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'secretdata retrived successfully',
    data: result,
  });
});


// update Secretdata 

export const updateSecretdataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await updateSecretdataByIdService(req.params.id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'secretdata updated successfully',
    data: result,
  });
});

// delete Secretdata 

export const deleteSecretdataByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteSecretdataByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'secretdata deleted successfully',
    data: result,
  });
});


