import express from 'express';

import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.use('/', (_req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Endpoint, Token');
    res.sendStatus(200);
});

router.post('/signin', signin);
router.post('/signup', signup);

export default router;