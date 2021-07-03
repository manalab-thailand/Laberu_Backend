import { CreateTaskImageManyAnnotation } from '@laberu/task-image-annotation/dto/create-task-many-annotation.dto';
import { TaskImageObjectService } from '@laberu/task-image-object';
import { CreateTaskImageObject } from '@laberu/task-image-object/dto/create-task-image-object.dto';
import { CreateTaskImageManyObject } from '@laberu/task-image-object/dto/create-task-many-object.dto';
import { QueryImageObject } from '@laberu/task-image-object/dto/query-image.dto';
import { UpdateProcessImageOjbect } from '@laberu/task-image-object/dto/update-process.dto';
import { UpdateStatusImageOjbect } from '@laberu/task-image-object/dto/update-status.dto';
import { Injectable } from '@nestjs/common';
import { TaskImageAnnotationService } from 'libs/task-image-annotation/src';
import { CreateTaskImageAnnotation } from 'libs/task-image-annotation/src/dto/create-task-image-object.dto';
import { QueryImageAnnotation } from 'libs/task-image-annotation/src/dto/query-image.dto';
import { UpdateProcessImageAnnotation } from 'libs/task-image-annotation/src/dto/update-process.dto';
import { UpdateStatusImageAnnotation } from 'libs/task-image-annotation/src/dto/update-status.dto';
import { CreateTaskImageManyHandler } from './dto/create-many.dto';
import { CreateTaskImageHandler } from './dto/create-task-image.dto';
import { FindCountTaskImage } from './dto/find-count.dto';
import { QueryImage } from './dto/query-image.dto';
import { ResetTaskImage } from './dto/reset-task-image.dto';
import { TaskImageResponse } from './dto/task-image-response.dto';
import { UpdateProcessTaskImage, UpdateStatusTaskImage } from './dto/update-task-image.dto';
import { ITaskimageService } from './interface/taskimage-interface.service';

@Injectable()
export class TaskimageService implements ITaskimageService {

  constructor(
    private readonly taskImageObjectService: TaskImageObjectService,
    private readonly taskImageAnnotationService: TaskImageAnnotationService,
  ) { }

  static ANNOTATION = 'annotation'
  static LABELLING = 'labelling'

  async createTaskImageHandler(payload: CreateTaskImageHandler): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.createTaskImageObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.createTaskImageAnnotation(data);
      }
    }
  }

  async createTaskImageManyHandler(payload: CreateTaskImageManyHandler): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.createTaskImageManyObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.createTaskImageManyAnnotation(data);
      }
    }
  }

  async findCountImageHandler(payload: FindCountTaskImage): Promise<any> {
    const { type } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.findCountTaskImageObject(payload);
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.findCountTaskImageAnnotation(payload);
      }
    }
  }

  async QueryTaskImageHandler(payload: QueryImage): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.queryImageObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.queryImageAnnotation(data);
      }
    }
  }

  async UpdateStatusHandler(payload: UpdateStatusTaskImage): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.updateStatusObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.updateStatusAnnotation(data);
      }
    }
  }

  async UpdateProcessHandler(payload: UpdateProcessTaskImage): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.updateProcessObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.updateProcessAnnotation(data);
      }
    }
  }

  async ResetTaskImageHandler(payload: ResetTaskImage): Promise<any> {
    const { type } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.taskImageObjectService.findTaskImageObjectResidualWork();
      }
      case TaskimageService.ANNOTATION: {
        return await this.taskImageAnnotationService.findTaskImageAnnotationResidualWork();
      }
    }
  }

}
