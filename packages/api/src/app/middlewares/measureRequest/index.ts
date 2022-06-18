import log from '../../helpers/logger';

export const measureRequest = (req, res, next) => {
  const start = Date.now();
  res.once('finish', () => {
    const duration = Date.now() - start;
    log.info('Req ' + req.originalUrl + ' processed in: ' + duration + 'ms');
  });
  next();
};
