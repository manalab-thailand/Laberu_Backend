export class UpdatePaymentStatusDoing {
  project_id: string;
  update_by: string;

  constructor(payload: UpdatePaymentStatusDoing) {
    Object.assign(this, payload);
  }
}
