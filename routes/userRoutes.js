import { Router } from 'express';
import { getAllUsers, getUserById, createUser, loginUser } from '../controllers/userControllers.js';


const router = Router();

router.post('/login', loginUser);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

export default router;
