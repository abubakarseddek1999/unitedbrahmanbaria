
// Member.controller.ts
import { RequestHandler } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import {
  createMemberService,
  getAllMemberService,
  getMemberByIdService,
  updateMemberByIdService,
  deleteMemberByIdService
} from './member.service'; // Update with your service path
import { handleMulterUpload } from '../../utils/uploader/multerHandler';

export const createMemberController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;
  console.log(req.files); // Debug line
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    console.log("Image Info:", imageInfo); // Debug line

    formattedData = {
      ...req.body,
      photo: imageInfo?.photo, // ✅ Only URL is stored
      signature: imageInfo?.signature, // ✅ Only URL is stored
    };
  }

  const result = await createMemberService(formattedData);
  sendResponse(res, {
    status: 201,
    success: true,
    message: 'Successfully created member',
    data: result,
  });
});

// Get All Member 

export const getAllMemberController: RequestHandler = catchAsync(async (req, res) => {
  const {result, meta} = await getAllMemberService(req.query);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'member retrived successfully',
    data: result,
    meta,

  });
});


// Get single Member 

export const getMemberByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await getMemberByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'member retrived successfully',
    data: result,
  });
});


// update Member 

export const updateMemberByIdController: RequestHandler = catchAsync(async (req, res) => {
  let formattedData = req.body;
  if (req.files) {
    const imageInfo: any = await handleMulterUpload(req.files);
    console.log("Image Info:", imageInfo); // Debug line
    
    formattedData = {
      ...req.body,
      photo: imageInfo?.photo, // ✅ Only URL is stored
      signature: imageInfo?.signature, // ✅ Only URL is stored
    };
  }

  const result = await updateMemberByIdService(req.params.id, formattedData);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'member updated successfully',
    data: result,
  });
});

// delete Member 

export const deleteMemberByIdController: RequestHandler = catchAsync(async (req, res) => {
  const result = await deleteMemberByIdService(req.params.id);
  sendResponse(res, {
    status: 200,
    success: true,
    message: 'member deleted successfully',
    data: result,
  });
});


