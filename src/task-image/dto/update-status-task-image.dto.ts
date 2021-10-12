import { TaskImageStatus } from '../interface/task-image.enum';

export class UpdateStatusTaskImageDto {
  task_id: string;
  status: TaskImageStatus;

  constructor(payload: UpdateStatusTaskImageDto) {
    Object.assign(this, payload);
  }
}
