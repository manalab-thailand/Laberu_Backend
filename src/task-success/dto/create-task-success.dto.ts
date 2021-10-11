import { IResult, ICustom } from '../interface/task-success.interface';

export class CreateTaskSuccessDto {
  shortcode: string;
  accept: boolean;
  result: IResult;
  task_id: string;
  user_id: string;
  project_id: string;
  custom?: ICustom;
  startedAt: Date;

  constructor(payload: CreateTaskSuccessDto) {
    Object.assign(this, payload);
  }
}
