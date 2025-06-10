// complaint.routes.ts

import { Router } from 'express';
import { createComplaintController, deleteComplaintByIdController, getAllComplaintController, getComplaintByIdController, updateComplaintByIdController } from './complaint.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';


export const complaintRoutes: Router = Router();

complaintRoutes.post('/create',
    uploader({ images: 'multiple' }),
    formValidator,
    createComplaintController);

complaintRoutes.get('/', getAllComplaintController);
complaintRoutes.get('/:id', getComplaintByIdController);
complaintRoutes.put('/:id',updateComplaintByIdController);
complaintRoutes.delete('/:id', deleteComplaintByIdController);

