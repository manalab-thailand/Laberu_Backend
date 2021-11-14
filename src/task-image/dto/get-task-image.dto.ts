export class GetTaskImageDto {
  user_id: string;
  project_id: string;

  constructor(payload: GetTaskImageDto) {
    Object.assign(this, payload);
  }
}
