export class FindOneUserDto {
  user_id: string;

  constructor(payload: FindOneUserDto) {
    Object.assign(this, payload);
  }
}
