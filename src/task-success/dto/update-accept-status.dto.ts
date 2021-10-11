export class UpdateAcceptStatus {
  task_success_id: string;
  accept: boolean;
  update_by: string;

  constructor(payload: UpdateAcceptStatus) {
    Object.assign(this, payload);
  }
}
