
// Complaint.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createComplaintService,
  getAllComplaintService,
  getComplaintByIdService,
  updateComplaintByIdService,
  deleteComplaintByIdService
} from './complaint.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

// export const createComplaintController: RequestHandler = catchAsync(async (req, res) => {
//   let formattedData = req.body;
//   if (req.files) {
//     const imageInfo: any = await handleMulterUpload(req.files);
//     console.log("Image Info:", imageInfo); // Debug line

//     formattedData = {
//       ...req.body,
//       image: imageInfo?.image, // ✅ Only URL is stored
//     };
//   }

//   // Optional: Add user if available
//   if ((req as any)?.user?.userId) {
//     formattedData.user = (req as any).user.userId;
//   }


//   const result = await createComplaintService(formattedData);
//   sendResponse(res, {
//     status: 201,
//     success: true,
//     message: 'Successfully created complaint',
//     data: result,
//   });
// });

export const createComplaintController: RequestHandler = catchAsync(async (req, res) => {
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

  const result = await createComplaintService(formattedData);

  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created complaint',
    data: result,
  });
});

// Get All Complaint 

export const getAllComplaintController: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await getAllComplaintService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'Complaints retrieved successfully',
    data: data,
    total: total,
  });

});


// Get single Complaint 

export const getComplaintByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getComplaintByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'complaint retrived successfully',
    data: result,
  });
});


// update Complaint 

export const updateComplaintByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await updateComplaintByIdService(req.params.id, req.body);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'complaint updated successfully',
    data: result,
  });
});

// delete Complaint 

export const deleteComplaintByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteComplaintByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'complaint deleted successfully',
    data: result,
  });
});


