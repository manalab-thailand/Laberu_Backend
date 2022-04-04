import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ProjectService } from 'src/project/project.service';
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
import { TaskSuccess } from './entities/task-success.schema';
import { TaskSuccessService } from './task-success.service';

@UseGuards(JwtAuthGuard)
@Controller('task-success')
export class TaskSuccessController {
  constructor(
    private readonly taskSuccessService: TaskSuccessService,
    private readonly projectService: ProjectService,
    private readonly taskImageService: TaskImageService,
  ) {}

  @HttpCode(200)
  @Post('create')
  async createTaskSuccess(
    @Body() payload: CreateTaskSuccessDto,
  ): Promise<TaskSuccess> {
    const createdTaskSuccess = await this.taskSuccessService.createTaskSuccess(
      payload,
    );

    const { project_id, task_id } = createdTaskSuccess;

    const countTaskSuccess = await this.taskSuccessService.findCountTaskSuccessByTaskId(
      task_id,
    );

    const _project = await this.projectService.findOne(project_id);

    if (countTaskSuccess >= _project.label_count) {
      await this.taskImageService.updateProcessTaskImage(task_id);
    } else {
      await this.taskImageService.updateStatusTaskImage({
        task_id,
        status: TaskImageStatus.WAITING,
      });
    }

    return createdTaskSuccess;
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
  @Put('update-accept')
  async updateAcceptStatus(
    @Body() payload: UpdateAcceptStatus,
  ): Promise<TaskSuccess> {
    return await this.taskSuccessService.updateAcceptStatus(payload);
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
