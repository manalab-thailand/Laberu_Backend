import { TaskSuccessObjectService } from '@laberu/task-success-object';
import { Injectable } from '@nestjs/common';
import { TaskSuccessAnnotationService } from 'libs/task-success-annotation/src';
import { CreateTaskSuccess } from './dto/create-task-success.dto';
import { FindCountTaskSuccessByUser, FindCountTaskSuccessByUserResponse } from './dto/find-count-by-user.dto';
import { FindCountSuccessByProjectId } from './dto/find-count-success-by-project.dto';
import { FindCountTaskSuccessByShortcode } from './dto/find-count-success-by-shortcode.dto';
import { ITasksuccessService } from './interface/tasksuccess-interface.service';

@Injectable()
export class TasksuccessService implements ITasksuccessService {

  constructor(
    private readonly taskSuccessObjectService: TaskSuccessObjectService,
    private readonly taskSuccessAnnotationService: TaskSuccessAnnotationService,
  ) { }

  static ANNOTATION = 'annotation'
  static LABELLING = 'labelling'

  async createTaskSuccessHandler(payload: CreateTaskSuccess): Promise<any> {
    const { type, ...data } = payload;
    const createTaskSuccess = {
      ...data,
      payment: null,
      paymentAt: null,
    }
    switch (type) {
      case TasksuccessService.LABELLING: {
        return await this.taskSuccessObjectService.createTaskSuccessObject(createTaskSuccess);
      }
      case TasksuccessService.ANNOTATION: {
        return await this.taskSuccessAnnotationService.createTaskSuccessAnnotation(createTaskSuccess);
      }
    }
  }

  async findCountTaskSuccessByProjectHandler(payload: FindCountSuccessByProjectId): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TasksuccessService.LABELLING: {
        return await this.taskSuccessObjectService.findCountTaskSuccessObjectByProjectId(data);
      }
      case TasksuccessService.ANNOTATION: {
        return await this.taskSuccessAnnotationService.findCountTaskSuccessAnnotationByProjectId(data);
      }
    }
  }

  async findCountTaskSuccessByShortcodeHandler(payload: FindCountTaskSuccessByShortcode): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TasksuccessService.LABELLING: {
        return await this.taskSuccessObjectService.findCountSuccessByShortcode(data);
      }
      case TasksuccessService.ANNOTATION: {
        return await this.taskSuccessAnnotationService.findCountSuccessByShortcode(data);
      }
    }
  }

  async findCountTaskSuccessHandler(payload: FindCountTaskSuccessByUser): Promise<FindCountTaskSuccessByUserResponse> {
    const countObject = await this.taskSuccessObjectService.findCountTaskSuccessByUserId(payload);
    const countAnnotation = await this.taskSuccessAnnotationService.findCountTaskSuccessByUserId(payload);
    const countClassification = 0;
    return new FindCountTaskSuccessByUserResponse({
      countAnnotation,
      countObject,
      countClassification,
    })
  }
}
