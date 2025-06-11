import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { complaintRoutes } from '../modules/complaint/complaint.routes';
import { secretdataRoutes } from '../modules/secretdata/secretdata.routes';
import { successdataRoutes } from '../modules/successdata/successdata.routes';
import { gallerydataRoutes } from '../modules/gallerydata/gallerydata.routes';

type IModulerRoutes = { path: string; route: Router }[];

export const modulerRoutes: IModulerRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/complaint',
    route: complaintRoutes,
  }
  ,{
    path: '/secretdata',
    route: secretdataRoutes,
  },
  {
    path: '/successdata',
    route: successdataRoutes,
  },
  {
    path: '/gallerydata',
    route: gallerydataRoutes,
  }
];
