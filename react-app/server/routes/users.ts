import express from 'express';
import { UserController } from '../controllers/user.js';

export const usersRoute = express.Router();

const userController = new UserController();

usersRoute.get('/', userController.getAll);

usersRoute.patch('/:id/follow', userController.updateFollowStatus);