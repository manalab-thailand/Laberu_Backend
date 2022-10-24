import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  IApproveRequest,
  ICreateRequest,
  IGetAllRequest,
  IRejectRequest,
  IUpdateRequest,
} from './interface/task-image-reject';
import { TaskImageRejectService } from './task-image-reject.service';

@Controller('task-image-reject')
export class TaskImageRejectController {
  constructor(
    private readonly taskImageRejectService: TaskImageRejectService,
  ) {}

  @Get()
  async getListReject(@Query() payload: IGetAllRequest) {
    return await this.taskImageRejectService.getListReject(payload);
  }

  @Post()
  async create(@Body() payload: ICreateRequest) {
    return await this.taskImageRejectService.create(payload);
  }

  @Post('reject')
  async rejectTask(@Body() payload: IRejectRequest) {
    return await this.taskImageRejectService.reject(payload);
  }

  @Post('approve')
  async approveTask(@Body() payload: IApproveRequest) {
    return await this.taskImageRejectService.approve(payload);
  }

  @Put()
  async updateTask(@Body() payload: IUpdateRequest) {
    return await this.taskImageRejectService.update(payload);
  }
}
