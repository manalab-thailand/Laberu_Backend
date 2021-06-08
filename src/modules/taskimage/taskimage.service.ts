import { TaskImageObjectService } from '@laberu/task-image-object';
import { CreateTaskImageObject } from '@laberu/task-image-object/dto/create-task-image-object.dto';
import { QueryImageObject } from '@laberu/task-image-object/dto/query-image.dto';
import { UpdateProcessImageOjbect } from '@laberu/task-image-object/dto/update-process.dto';
import { UpdateStatusImageOjbect } from '@laberu/task-image-object/dto/update-status.dto';
import { Injectable } from '@nestjs/common';
import { TaskImageAnnotationService } from 'libs/task-image-annotation/src';
import { CreateTaskImageAnnotation } from 'libs/task-image-annotation/src/dto/create-task-image-object.dto';
import { QueryImageAnnotation } from 'libs/task-image-annotation/src/dto/query-image.dto';
import { UpdateProcessImageAnnotation } from 'libs/task-image-annotation/src/dto/update-process.dto';
import { UpdateStatusImageAnnotation } from 'libs/task-image-annotation/src/dto/update-status.dto';
import { CreateTaskImageHandler } from './dto/create-task-image.dto';
import { FindCountTaskImage } from './dto/find-count.dto';
import { QueryImage } from './dto/query-image.dto';
import { ResetTaskImage } from './dto/reset-task-image.dto';
import { TaskImageResponse } from './dto/task-image-response.dto';
import { UpdateProcessTaskImage, UpdateStatusTaskImage } from './dto/update-task-image.dto';
import { ITaskimageService } from './taskimage-interface.service';

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
        return await this.createTaskImageObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.createTaskImageAnnotation(data);
      }
    }
  }

  async findCountImageHandler(payload: FindCountTaskImage): Promise<any> {
    const { type } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.findCountTaskImageObject();
      }
      case TaskimageService.ANNOTATION: {
        return await this.findCountTaskImageAnnotation();
      }
    }
  }

  async QueryTaskImageHandler(payload: QueryImage): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.queryImageObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.queryImageAnnotation(data);
      }
    }
  }

  async UpdateStatusHandler(payload: UpdateStatusTaskImage): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.updateStatusTaskObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.updateStatusTaskAnnotation(data);
      }
    }
  }

  async UpdateProcessHandler(payload: UpdateProcessTaskImage): Promise<any> {
    const { type, ...data } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return await this.updateProcessTaskObject(data);
      }
      case TaskimageService.ANNOTATION: {
        return await this.updateProcessTaskAnnotation(data);
      }
    }
  }

  async ResetTaskImageHandler(payload: ResetTaskImage): Promise<any> {
    const { type } = payload
    switch (type) {
      case TaskimageService.LABELLING: {
        return this.resetTaskImageObject();
      }
      case TaskimageService.ANNOTATION: {
        return this.resetTaskImageAnnotation();
      }
    }
  }

  //Object Labelling
  async createTaskImageObject(payload: CreateTaskImageObject): Promise<any> {
    return await this.taskImageObjectService.createTaskImageObject(payload);
  }

  async queryImageObject(payload: QueryImageObject): Promise<TaskImageResponse> {
    return await this.taskImageObjectService.queryImageObject(payload);
  }

  async updateStatusTaskObject(payload: UpdateStatusImageOjbect): Promise<any> {
    return await this.taskImageObjectService.updateStatusObject(payload);
  }

  async updateProcessTaskObject(payload: UpdateProcessImageOjbect): Promise<any> {
    return await this.taskImageObjectService.updateProcessObject(payload);
  }

  async resetTaskImageObject(): Promise<any> {
    return await this.taskImageObjectService.findTaskImageObjectResidualWork();
  }

  async findCountTaskImageObject(): Promise<any> {
    return await this.taskImageObjectService.findCountTaskImageObject();
  }

  //Annotation
  async createTaskImageAnnotation(payload: CreateTaskImageAnnotation): Promise<any> {
    return await this.taskImageAnnotationService.createTaskImageAnnotation(payload);
  }

  async queryImageAnnotation(payload: QueryImageAnnotation): Promise<TaskImageResponse> {
    return await this.taskImageAnnotationService.queryImageAnnotation(payload);
  }

  async updateStatusTaskAnnotation(payload: UpdateStatusImageAnnotation): Promise<any> {
    return await this.taskImageAnnotationService.updateStatusAnnotation(payload);
  }

  async updateProcessTaskAnnotation(payload: UpdateProcessImageAnnotation): Promise<any> {
    return await this.taskImageAnnotationService.updateProcessAnnotation(payload);
  }

  async resetTaskImageAnnotation(): Promise<any> {
    return await this.taskImageAnnotationService.findTaskImageAnnotationResidualWork();
  }

  async findCountTaskImageAnnotation(): Promise<any> {
    return await this.taskImageAnnotationService.findCountTaskImageAnnotation();
  }
}
