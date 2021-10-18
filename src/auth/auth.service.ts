import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateJwt(uid: string) {
    return this.jwtService.signAsync({ uid: uid });
  }

  async login(uid: string) {
    const user = await this.userService.checkUserActive(uid);

    if (!user) {
      return {
        status: 404,
        message: 'user not found',
      };
    }

    const jwt = await this.generateJwt(uid);

    const authentication = {
      access_token: jwt,
      token_type: 'Bearer',
      expiresIn: '1d',
    };

    return {
      status: 200,
      message: 'success',
      data: {
        user,
        authentication,
      },
    };
  }
}
