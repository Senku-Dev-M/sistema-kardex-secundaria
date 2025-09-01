import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = this.usersRepo.create({
      email: dto.email,
      password: await bcrypt.hash(dto.password, 10),
      role: dto.role,
      teacher: dto.teacherId ? ({ id: dto.teacherId } as any) : undefined,
    });
    return this.usersRepo.save(user);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    const payload = {
      sub: user.id,
      role: user.role,
      teacherId: user.teacher ? user.teacher.id : undefined,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
