import { TaskImage } from '../entities/task-image.schema';

export class CreateTaskImageManyDto {
  mapTaskSuccess: TaskImage[];

  constructor(payload: CreateTaskImageManyDto) {
    Object.assign(this, payload);
  }
}
