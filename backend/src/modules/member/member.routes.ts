// member.routes.ts

import { Router } from 'express';
import { createMemberController, deleteMemberByIdController, getAllMemberController, updateMemberByIdController } from './member.controller';
import { formValidator } from '../../middlewares/formVaidator';
import uploader from '../../utils/uploader/uploader';

export const memberRoutes: Router = Router();

memberRoutes.get('/',getAllMemberController);
memberRoutes.post('/create', uploader({photo: 'single' }), formValidator,createMemberController);
memberRoutes.patch('/:id',uploader({photo: 'single' }), formValidator, updateMemberByIdController);
memberRoutes.delete('/:id', deleteMemberByIdController);

