import middlewares from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import { checkAigneConnection, onTestAigneHub } from './aigne';

const router = Router();

router.use('/user', middlewares.session(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const result = await onTestAigneHub(message);
    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get('/check', async (_, res) => {
  const isConnected = await checkAigneConnection();
  res.json({
    connected: isConnected,
  });
});

export default router;
