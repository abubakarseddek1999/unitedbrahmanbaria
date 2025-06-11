// gallerydata.routes.ts

import { Router } from 'express';
import { createGallerydataController, deleteGallerydataByIdController, getAllGallerydataController, getGallerydataByIdController, updateGallerydataByIdController } from './gallerydata.controller';
import { formValidator } from '../../middlewares/formVaidator';
import uploader from '../../utils/uploader/uploader';

export const gallerydataRoutes: Router = Router();

gallerydataRoutes.post('/create',
    uploader({ photo: 'single' }),
    formValidator,
    createGallerydataController);
gallerydataRoutes.get('/', getAllGallerydataController);
gallerydataRoutes.get('/:id', getGallerydataByIdController);
gallerydataRoutes.put('/:id',
    uploader({ photo: 'single' }),
    formValidator,
    updateGallerydataByIdController);
gallerydataRoutes.delete('/:id', deleteGallerydataByIdController);

