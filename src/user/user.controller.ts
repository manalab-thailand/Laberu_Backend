import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/check_login/:uid')
  async checkUserLogin(@Param('uid') uid: String) {
    return await this.userService.checkUserLogin(uid)
  }

  @Delete('delete/:_id')
  async remove(@Param('_id') _id: string) {
    return await this.userService.remove(_id);
  }
}
