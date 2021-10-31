import { ApiProperty } from '@nestjs/swagger';
import { UserStatus, UserRole } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export class CreateCustomerDto {
  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: String })
  phone_number: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ type: String })
  uid: string;

  constructor(payload: CreateCustomerDto) {
    Object.assign(this, payload);
  }
}
