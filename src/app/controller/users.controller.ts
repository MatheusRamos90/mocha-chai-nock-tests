import {Controller, Get} from '@overnightjs/core';
import {Request, Response} from 'express';
import {UsersService} from '../service/users.service';
import {UsersResponse} from '../dto/users-response';
import {StatusCodes} from 'http-status-codes';

@Controller('api/users')
export class UsersController {
    private readonly usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    @Get('')
    public async getAll(req: Request, res: Response) {
        return await this.usersService
            .getAll()
            .then((users: UsersResponse[]) => res.status(StatusCodes.OK).json(users))
            .catch(reason => {
                res.status(StatusCodes.BAD_REQUEST).json({ message: reason.message });
            });
    }

}
