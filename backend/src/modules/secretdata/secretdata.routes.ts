// secretdata.routes.ts

import { Router } from 'express';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import { getComplaintByIdController } from '../complaint/complaint.controller';
import { createSecretdataController, deleteSecretdataByIdController, getAllSecretdataController, updateSecretdataByIdController } from './secretdata.controller';

export const secretdataRoutes: Router = Router();

secretdataRoutes.post('/create',
    uploader({ images: 'multiple' }),
    formValidator,
    createSecretdataController);

secretdataRoutes.get('/', getAllSecretdataController);
secretdataRoutes.get('/:id', getComplaintByIdController);
secretdataRoutes.put('/:id',
    uploader({ image: 'single' }),
    formValidator,
    updateSecretdataByIdController);
secretdataRoutes.delete('/:id', deleteSecretdataByIdController);