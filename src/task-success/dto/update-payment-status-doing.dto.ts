export class UpdatePaymentStatusDoing {
  array_id: string[];
  project_id: string;
  update_by: string;

  constructor(payload: UpdatePaymentStatusDoing) {
    Object.assign(this, payload);
  }
}
