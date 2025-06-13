
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
  const {data, total} = await getAllSuccessdataService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'successdata retrived successfully',
    data: data,
    total: total,
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
  let formattedData = req.body;
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    console.log("Image Info:", imageInfo); // Debug line

    formattedData = {
      ...req.body,
      images: imageInfo?.images // ✅ Store as array of image URLs
    };
  }



  const result = await updateSuccessdataByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'successdata updated successfully',
    data: result,
  });
});

// update Successdata 

// export const updateSuccessdataByIdController: RequestHandler = catchAsync(async (req, res) => {
//   let formattedData = req.body;

//   // ✅ Safely parse existingImages if it exists
//   let existingImages: string[] = [];

//   if (req.body.existingImages) {
//     try {
//       existingImages = Array.isArray(req.body.existingImages)
//         ? req.body.existingImages
//         : JSON.parse(req.body.existingImages);
//     } catch (err) {
//       console.warn("⚠️ existingImages parsing failed:", err);
//       existingImages = [];
//     }
//   }

//   // ✅ Handle new uploaded files (if any)
//   if (req.files) {
//     const imageInfo: any = await handleMulterUpload(req.files);
//     console.log("Updated Image Info:", imageInfo);

//     formattedData = {
//       ...req.body,
//       images: [...existingImages, ...(imageInfo?.images || [])],
//     };
//   } else {
//     // Even if no new images, ensure existing ones are kept
//     formattedData = {
//       ...req.body,
//       images: existingImages,
//     };
//   }

//   const result = await updateSuccessdataByIdService(req.params.id, formattedData);

//   sendResponse(res, {
//     status: 200,
//     success: true,
//     message: '✅ successdata updated successfully',
//     data: result,
//   });
// });



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


