import { Router } from 'express';
import { CandyGiverRoute } from '../modules/Candy/candy.route';
import { UserRoute } from '../modules/user/user.route';
import { AdminRoute } from '../modules/Admin/Admin.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { ParentRoute } from '../modules/Parent/Parent.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/candy',
    route: CandyGiverRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/parent',
    route: ParentRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
