import { TaskSuccessObjectService } from '@laberu/task-success-object';
import { CreateTaskSuccessObject } from '@laberu/task-success-object/dto/create.dto';
import { FindCountTaskSuccessObjectByProject } from '@laberu/task-success-object/dto/find-count-by-project.dto';
import { FindCountSuccessByShortcode } from '@laberu/task-success-object/dto/find-count-by-shortcode.dto';
import { Injectable } from '@nestjs/common';
import { TaskSuccessAnnotationService } from 'libs/task-success-annotation/src';
import { CreateTaskSuccessAnnotation } from 'libs/task-success-annotation/src/dto/create.dto';
import { FindCountTaskSuccessAnnotationByProject } from 'libs/task-success-annotation/src/dto/find-count-by-project.dto';
import { CreateTaskSuccess } from './dto/create-task-success.dto';
import { FindCountTaskSuccessByUser, FindCountTaskSuccessByUserResponse } from './dto/find-count-by-user.dto';
import { FindCountSuccessByProjectId } from './dto/find-count-success-by-project.dto';
import { FindCountTaskSuccessByShortcode } from './dto/find-count-success-by-shortcode.dto';

@Injectable()
export class TasksuccessService {

  constructor(
    private readonly taskSuccessObjectService: TaskSuccessObjectService,
    private readonly taskSuccessAnnotationService: TaskSuccessAnnotationService,
  ) { }

  static ANNOTATION = 'annotation'
  static LABELLING = 'labelling'

  async createTaskSuccessHandler(payload: CreateTaskSuccess): Promise<any> {
    const { type, ...data } = payload;
    switch (type) {
      case TasksuccessService.LABELLING: {
        return await this.createTaskSuccessObject(data);
      }
      case TasksuccessService.ANNOTATION: {
        return await this.createTaskSuccessAnnotation(data);
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

  async findCountTaskSuccessByProjectHandler(payload: FindCountSuccessByProjectId): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TasksuccessService.LABELLING: {
        return await this.findCountTaskSuccessObjectByProjectId(data);
      }
      case TasksuccessService.ANNOTATION: {
        return await this.findCountTaskSuccessAnnotationByProjectId(data);
      }
    }
  }

  async findCountTaskSuccessByShortcodeHandler(payload: FindCountTaskSuccessByShortcode): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TasksuccessService.LABELLING: {
        return await this.findCountTaskSuccessObjectByShortcode(data);
      }
      case TasksuccessService.LABELLING: {
        return await this.findCountTaskSuccessAnnotationByShortcode(data);
      }
    }
  }

  //Object Labelling
  async createTaskSuccessObject(payload: CreateTaskSuccessObject): Promise<any> {
    return await this.taskSuccessObjectService.createTaskSuccessObject(payload);
  }

  async findCountTaskSuccessObjectByProjectId(payload: FindCountTaskSuccessObjectByProject): Promise<any> {
    return await this.taskSuccessObjectService.findCountTaskSuccessObjectByProjectId(payload);
  }

  async findCountTaskSuccessObjectByShortcode(payload: FindCountSuccessByShortcode): Promise<any> {
    return await this.taskSuccessObjectService.findCountSuccessByShortcode(payload);
  }

  //Annotation
  async createTaskSuccessAnnotation(payload: CreateTaskSuccessAnnotation): Promise<any> {
    return await this.taskSuccessAnnotationService.createTaskSuccessAnnotation(payload);
  }

  async findCountTaskSuccessAnnotationByProjectId(payload: FindCountTaskSuccessAnnotationByProject): Promise<any> {
    return await this.taskSuccessAnnotationService.findCountTaskSuccessAnnotationByProjectId(payload);
  }

  async findCountTaskSuccessAnnotationByShortcode(payload: FindCountSuccessByShortcode): Promise<any> {
    return await this.taskSuccessAnnotationService.findCountSuccessByShortcode(payload);
  }

}
