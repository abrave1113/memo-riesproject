import express from 'express';

import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.use('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Endpoint, Token");
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
    next();
});

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost );

export default router;