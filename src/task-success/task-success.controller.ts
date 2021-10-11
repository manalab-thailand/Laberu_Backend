import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { ExportTaskSuccessByProject } from './dto/export-task-success-by-project.dto';
import { FindByProjectId } from './dto/find-by-project.dto';
import { FindByUserId } from './dto/find-by-user.dto';
import { UpdateAcceptStatusProject } from './dto/update-accept-status-project.dto';
import { UpdateAcceptStatus } from './dto/update-accept-status.dto';
import { UpdatePaymentStatusDoing } from './dto/update-payment-status-doing.dto';
import { UpdatePaymentStatusSuccess } from './dto/update-payment-status-success.dto';
import { TaskSuccess } from './entities/task-success.schema';
import { TaskSuccessService } from './task-success.service';

@Controller('task-success')
export class TaskSuccessController {
  constructor(private readonly taskSuccessService: TaskSuccessService) {}

  @Post('create')
  async createTaskSuccess(
    @Body() payload: CreateTaskSuccessDto,
  ): Promise<TaskSuccess> {
    return await this.taskSuccessService.createTaskSuccess(payload);
  }

  @Post('find-by-project')
  async findTaskSuccessByProject(
    @Body() payload: FindByProjectId,
  ): Promise<TaskSuccess[]> {
    return await this.taskSuccessService.findTaskSuccessByProject(payload);
  }

  @Post('find-by-user')
  async findTaskSuccessByUser(
    @Body() payload: FindByUserId,
  ): Promise<TaskSuccess[]> {
    return await this.taskSuccessService.findTaskSuccessByUser(payload);
  }

  @Put('update-accept')
  async updateAcceptStatus(
    @Body() payload: UpdateAcceptStatus,
  ): Promise<TaskSuccess> {
    return await this.taskSuccessService.updateAcceptStatus(payload);
  }

  @Put('update-accept-project')
  async updateAcceptStatusProject(
    @Body() payload: UpdateAcceptStatusProject,
  ): Promise<TaskSuccess[]> {
    return await this.taskSuccessService.updateAcceptStatusProject(payload);
  }

  @Put('update-payment-status/doing')
  async updatePaymentStatusDoing(
    @Body() payload: UpdatePaymentStatusDoing,
  ): Promise<TaskSuccess[]> {
    return await this.taskSuccessService.updatePaymentStatusDoing(payload);
  }

  @Put('update-payment-status/success')
  async updatePaymentStatusSuccess(
    @Body() payload: UpdatePaymentStatusSuccess,
  ): Promise<TaskSuccess[]> {
    return await this.taskSuccessService.updatePaymentStatusSuccess(payload);
  }

  @Post('export-task-success')
  async exportTaskSuccess(
    @Body() payload: ExportTaskSuccessByProject,
  ): Promise<TaskSuccess[]> {
    return await this.taskSuccessService.exportTaskSuccessByProject(payload);
  }
}
