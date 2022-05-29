import { defaultRouteHandler } from '../../../interfaces';
import { getAllStats } from '../../services/stats';

const handleStats: defaultRouteHandler = async (req, res) => {
  const stats = await getAllStats();
  return res.status(200).json(stats);
};

export default handleStats;
