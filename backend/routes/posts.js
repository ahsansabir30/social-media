import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost, getPostSearch, getPost, commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'
const router = express.Router();

router.get('/search', getPostSearch);
router.get('/', getPosts);
router.get('/:id', getPost);
// by inserting auth, it will make sure the user is logged in before allowing the creation, updating, deleting and liking a post
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/likepost/:id/', auth, likePost);

router.post('/comment/:id/', auth, commentPost);

export default router;
