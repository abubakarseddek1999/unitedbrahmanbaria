import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { complaintRoutes } from '../modules/complaint/complaint.routes';
import { secretdataRoutes } from '../modules/secretdata/secretdata.routes';
import { successdataRoutes } from '../modules/successdata/successdata.routes';
import { gallerydataRoutes } from '../modules/gallerydata/gallerydata.routes';
import { memberRoutes } from '../modules/member/member.routes';
import { donationProjectRoutes } from '../modules/donationProject/donationProject.routes';
import { paymentRoutes } from '../modules/payment/payment.routes';
import { blogRoutes } from '../modules/blog/blog.routes';
import { newsletterRoutes } from '../modules/newsletter/newsletter.routes';

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
  },
  {
    path: '/member',
    route: memberRoutes,
  },
  {
    path: '/donation',
    route: donationProjectRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes
  },
  {
    path: '/blog',
    route: blogRoutes
  },
  {
    path: '/newsletter',
    route: newsletterRoutes
  },
];
