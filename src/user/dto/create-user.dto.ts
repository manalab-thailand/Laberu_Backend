import { ApiProperty } from '@nestjs/swagger';
import { UserStatus, UserRole } from '../interface/user.enum';
import { IUserPayment } from '../interface/user.interface';

export class CreateUserDto {
  @ApiProperty({ type: String })
  firstname: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: String })
  phone_number: string;

  @ApiProperty({ type: String })
  career: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  province: string;

  @ApiProperty({ enum: UserStatus })
  status: UserStatus;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ type: String })
  uid: string;

  @ApiProperty({
    type: Object as () => IUserPayment,
  })
  payment: IUserPayment;

  constructor(payload: CreateUserDto) {
    Object.assign(this, payload);
  }
}
