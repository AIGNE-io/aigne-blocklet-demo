import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import { onTestAigneHub } from './aigne';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  const result = await onTestAigneHub(message);
  res.json({
    result,
  });
});

export default router;
