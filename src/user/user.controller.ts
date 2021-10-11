import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() payload: CreateUserDto): Promise<User> {
    return await this.userService.createUser(payload);
  }

  @Post('create-customer')
  async createCustomer(@Body() payload: CreateCustomerDto): Promise<User> {
    return await this.userService.createCustomer(payload);
  }

  @Get('find-one')
  async findOneUser(@Query() payload: FindOneUserDto): Promise<User> {
    return await this.userService.findOneUser(payload);
  }

  @Get('find-all')
  async findAllUser(): Promise<User[]> {
    return await this.userService.findAllUser();
  }

  @Put('update')
  async update(payload: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(payload);
  }
}
