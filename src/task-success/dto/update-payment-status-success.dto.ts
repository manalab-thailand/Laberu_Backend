export class UpdatePaymentStatusSuccess {
  project_id: string;
  update_by: string;

  constructor(payload: UpdatePaymentStatusSuccess) {
    Object.assign(this, payload);
  }
}
