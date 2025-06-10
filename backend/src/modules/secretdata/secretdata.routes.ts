// secretdata.routes.ts

import { Router } from 'express';
import uploader from '../../utils/uploader/uploader';
import { formValidator } from '../../middlewares/formVaidator';
import { createSecretdataController, deleteSecretdataByIdController, getAllSecretdataController, getSecretdataByIdController, updateSecretdataByIdController } from './secretdata.controller';

export const secretdataRoutes: Router = Router();

secretdataRoutes.post('/create',
    uploader({ images: 'multiple' }),
    formValidator,
    createSecretdataController);

secretdataRoutes.get('/', getAllSecretdataController);
secretdataRoutes.get('/:id', getSecretdataByIdController);
secretdataRoutes.put('/:id', updateSecretdataByIdController);
secretdataRoutes.delete('/:id', deleteSecretdataByIdController);