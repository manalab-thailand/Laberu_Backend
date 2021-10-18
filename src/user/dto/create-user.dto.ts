import { UserStatus, UserRole } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export class CreateUserDto {
  firstname: string;
  lastname: string;
  phone_number: string;
  career: string;
  email: string;
  province: string;
  status: UserStatus;
  role: UserRole;
  uid: string;
  payment: IUserPayment;

  constructor(payload: CreateUserDto) {
    Object.assign(this, payload);
  }
}
