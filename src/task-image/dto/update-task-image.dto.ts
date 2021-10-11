export class UpdateTaskImageDto {
  task_id: string;

  constructor(payload: UpdateTaskImageDto) {
    Object.assign(this, payload);
  }
}
