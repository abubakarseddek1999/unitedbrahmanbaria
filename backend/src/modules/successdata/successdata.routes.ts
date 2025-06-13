// successdata.routes.ts

import { Router } from 'express';
import { createSuccessdataController, deleteSuccessdataByIdController, getAllSuccessdataController, getSuccessdataByIdController, updateSuccessdataByIdController } from './successdata.controller';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';

export const successdataRoutes: Router = Router();

successdataRoutes.post('/create',
    uploader({ images: 'multiple' }),
    formValidator,
    createSuccessdataController);
successdataRoutes.get('/', getAllSuccessdataController)
successdataRoutes.get('/:id', getSuccessdataByIdController); // Assuming you want to get by ID as well
successdataRoutes.patch('/:id',
    uploader({ images: 'multiple' }),
    formValidator,
    updateSuccessdataByIdController); // Assuming you want to update by ID as well
successdataRoutes.delete('/:id', deleteSuccessdataByIdController); // Assuming you want to delete by ID as well

