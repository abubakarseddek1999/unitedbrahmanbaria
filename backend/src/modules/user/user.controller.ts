import { RequestHandler } from 'express';

// Extend the User type to include the 'id' property
declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { getUserService, updateUserService } from './user.service';

export const getUserController: RequestHandler = catchAsync(
  async (req, res) => {
    if (!req.user?.id) {
      throw new Error('User ID is missing');
    }
    const result = await getUserService(req.user.id); // Assuming 'id' exists on 'User'
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  },
);
export const updateUserController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await updateUserService(req.user?.id as string, req.body);
    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: 'User Updated successfully',
      data: result,
    });
  },
);
