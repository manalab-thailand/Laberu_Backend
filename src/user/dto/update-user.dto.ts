import { UserStatus, UserRole } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export class UpdateUserDto {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  career: string;
  province: string;
  status: UserStatus;
  role: UserRole;
  payment: IUserPayment;
  update_by: string;

  constructor(payload: UpdateUserDto) {
    Object.assign(this, payload);
  }
}
