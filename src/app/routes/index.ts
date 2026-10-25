import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
// import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

/* router.use('/users', UserRoutes);
router.use('/students', StudentRoutes); */

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.route),
);

export default router;
