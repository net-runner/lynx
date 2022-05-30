import { Router } from 'hyper-express';
import { LinkController } from '../../controllers';
import requireUser from '../../middlewares/auth/requireUser';
import cache from '../../middlewares/cache';

const linkRouter = new Router();
const linkController = new LinkController();
linkRouter.get('/healthcheck', (req, res) => {
  res.status(200).end();
});
linkRouter.post('/add', requireUser, linkController.add);
linkRouter.post('/edit', requireUser, linkController.edit);
linkRouter.post('/del', requireUser, linkController.delete);

//For getting links no auth required
linkRouter.get('/:id', cache, linkController.getSingle);
linkRouter.get('/:limit/:page', cache, linkController.getMany);
linkRouter.get('/:limit/:page/:skip', cache, linkController.getMany);

export default linkRouter;
