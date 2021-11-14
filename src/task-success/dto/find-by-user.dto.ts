export class FindByUserId {
  user_id: string;

  constructor(payload: FindByUserId) {
    Object.assign(this, payload);
  }
}
