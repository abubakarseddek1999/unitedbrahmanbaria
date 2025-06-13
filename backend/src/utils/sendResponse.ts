import { Response } from 'express';

interface IResponse<T> {
  status: number;
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  total?: number;
}

export const sendResponse = <T>(
  res: Response,
  { data, message, status, success, token,total }: IResponse<T>,
) => {
  return res.status(status).json({
    status,
    success,
    message,
    data,
    token,
    total,
  });
};
