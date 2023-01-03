import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ProjectService } from 'src/project/project.service';
import { TaskImageRejectService } from 'src/task-image-reject/task-image-reject.service';
import { TaskImageStatus } from 'src/task-image/interface/task-image.enum';
import { TaskImageService } from 'src/task-image/task-image.service';
import { CreateTaskSuccessDto } from './dto/create-task-success.dto';
import { ExportTaskSuccessByProject } from './dto/export-task-success-by-project.dto';
import { FindByProjectId } from './dto/find-by-project.dto';
import { FindByUserId } from './dto/find-by-user.dto';
import { GetReportUser } from './dto/get-report-user';
import { UpdateAcceptStatusProject } from './dto/update-accept-status-project.dto';
import { UpdateAcceptStatus } from './dto/update-accept-status.dto';
import { UpdatePaymentStatusDoing } from './dto/update-payment-status-doing.dto';
import { UpdatePaymentStatusSuccess } from './dto/update-payment-status-success.dto';
import {
  TaskSuccess,
  TaskSuccessDocument,
} from './entities/task-success.schema';
import { IUpdateResult } from './interface/task-success.interface';
import { TaskSuccessService } from './task-success.service';

// @UseGuards(JwtAuthGuard)
@Controller('task-success')
export class TaskSuccessController {
  constructor(
    private readonly taskSuccessService: TaskSuccessService,
    private readonly projectService: ProjectService,
    private readonly taskImageService: TaskImageService,
    private readonly taskImageRejectSrv: TaskImageRejectService,
  ) {}

  @HttpCode(200)
  @Post('create')
  async createTaskSuccess(
    @Body() payload: CreateTaskSuccessDto,
  ): Promise<TaskSuccess> {
    return await this.taskSuccessService.createTaskSuccess(payload);
  }

  @HttpCode(200)
  @Get('')
  async findTaskSuccess(@Query() payload: FindByProjectId) {
    return await this.taskSuccessService.findTaskSuccessByProject(payload);
  }

  @HttpCode(200)
  @Get('find-by-project')
  async findTaskSuccessByProject(@Query() payload: FindByProjectId) {
    return await this.taskSuccessService.findTaskSuccessByProject(payload);
  }

  @HttpCode(200)
  @Get('find-by-project/count')
  async findCounnTaskSuccessByProject(@Query() payload: FindByProjectId) {
    return await this.taskSuccessService.findCountTaskSuccessByProject(payload);
  }

  @HttpCode(200)
  @Post('find-by-user')
  async findTaskSuccessByUser(@Body() payload: FindByUserId) {
    return await this.taskSuccessService.findTaskSuccessByUser(payload);
  }

  @HttpCode(200)
  @Get('history')
  async findHistory(@Query() payload: FilterQuery<TaskSuccessDocument>) {
    return await this.taskSuccessService.findHistory(payload);
  }

  @HttpCode(200)
  @Patch('update-result')
  async updateResult(@Body() payload: IUpdateResult) {
    return await this.taskSuccessService.updateResult(payload);
  }

  @HttpCode(200)
  @Put('update-accept')
  async updateAcceptStatus(
    @Body() payload: UpdateAcceptStatus,
  ): Promise<TaskSuccess> {
    const response = await this.taskSuccessService.updateAcceptStatus(payload);

    await this.taskImageRejectSrv.create({
      task_success_id: payload.task_success_id,
      user_id: payload.update_by,
    });

    return response;
  }

  @HttpCode(200)
  @Put('update-accept-project')
  async updateAcceptStatusProject(@Body() payload: UpdateAcceptStatusProject) {
    return await this.taskSuccessService.updateAcceptStatusProject(payload);
  }

  @HttpCode(200)
  @Put('update-payment-status/doing')
  async updatePaymentStatusDoing(@Body() payload: UpdatePaymentStatusDoing) {
    return await this.taskSuccessService.updatePaymentStatusDoing(payload);
  }

  @HttpCode(200)
  @Put('update-payment-status/success')
  async updatePaymentStatusSuccess(
    @Body() payload: UpdatePaymentStatusSuccess,
  ) {
    return await this.taskSuccessService.updatePaymentStatusSuccess(payload);
  }

  @HttpCode(200)
  @Post('export-task-success')
  async exportTaskSuccess(@Body() payload: ExportTaskSuccessByProject) {
    return await this.taskSuccessService.exportTaskSuccessByProject(payload);
  }

  @HttpCode(200)
  @Get('get-report-user/count')
  async getCountReportUser(@Query() payload: GetReportUser) {
    return await this.taskSuccessService.getCountReportUser(payload);
  }

  @HttpCode(200)
  @Get('get-report-user')
  async getReportUser(@Query() payload: GetReportUser) {
    return await this.taskSuccessService.getReportUser(payload);
  }

  @HttpCode(200)
  @Get('get-count-report-price')
  async getCountReportPrice(@Query() payload: GetReportUser) {
    return await this.taskSuccessService.getCountReportPrice(payload);
  }
}
