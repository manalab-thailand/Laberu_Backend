export class FindProjectByCustomerDto {
  user_id: string;

  constructor(payload: FindProjectByCustomerDto) {
    Object.assign(this, payload);
  }
}
