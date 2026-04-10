import { Users } from '../models/user.js';
import { Request, Response } from 'express';

const usersModel = new Users();

export class UserController {
    async getAll(req: Request, res: Response) {
        const users = await usersModel.getAll();
        res.json(users);
    }

    async updateFollowStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        const user = await usersModel.updateFollowStatus(id as string, status);
        res.json(user);
    }
}