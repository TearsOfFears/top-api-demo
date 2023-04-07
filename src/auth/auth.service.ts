import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModule: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async create(dtoIn: AuthDto) {
    const salt = genSaltSync(10);
    dtoIn.passwordHash = hashSync(dtoIn.password, salt);
    delete dtoIn.password;
    return this.UserModule.create(dtoIn);
  }

  async getByEmail(email: string) {
    return this.UserModule.findOne({ email }).exec();
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const user = await this.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('user with this cred not found');
    }
    const isEqualPassword = compareSync(password, user.passwordHash);
    if (!isEqualPassword) {
      throw new UnauthorizedException(
        'something wrong with credential tha you pass',
      );
    }
    return {
      email: user.email,
    };
  }
  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
