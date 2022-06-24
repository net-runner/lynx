import { Router } from 'hyper-express';
import { handleReviewAdd } from '../../controllers/review';
import requireUser from '../../middlewares/auth/requireUser';

const reviewRouter = new Router();

reviewRouter.post('/add', requireUser, handleReviewAdd);

export default reviewRouter;
