import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CheckUserActive } from './dto/check-user.dto';
import { CreateUser } from './dto/create.dto';
import { FindOneUserByUID } from './dto/find-one.dto';
import { User } from './entity/user-entity';
import { IUserController } from './user-interface.controller';
import { UserService } from './user.service';

@Controller('user-laberu')
export class UserController implements IUserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('create')
    async createUser(@Body() payload: CreateUser): Promise<any> {
        return await this.userService.createUser(payload);
    }

    @Get('checkuserActive')
    async checkUser(@Query() payload: CheckUserActive): Promise<User> {
        return await this.userService.checkUserActive(payload);
    }

}
