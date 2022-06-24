import { Router } from 'hyper-express';
import { handleReviewAdd, handleReviewDelete } from '../../controllers/review';
import requireUser from '../../middlewares/auth/requireUser';

const reviewRouter = new Router();

reviewRouter.post('/add', requireUser, handleReviewAdd);
reviewRouter.delete(':id', requireUser, handleReviewDelete);

export default reviewRouter;
