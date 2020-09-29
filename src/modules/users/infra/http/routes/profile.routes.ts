import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuth);
profileRouter.get('/', profileController.show);

export default profileRouter;
