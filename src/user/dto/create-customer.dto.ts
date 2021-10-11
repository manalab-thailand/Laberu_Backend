import { UserStatus, UserRole } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export class CreateCustomerDto {
  firstname: string;
  lastname: string;
  phone_number: string;
  status: UserStatus;
  role: UserRole;
  uid: string;

  constructor(payload: CreateCustomerDto) {
    Object.assign(this, payload);
  }
}
