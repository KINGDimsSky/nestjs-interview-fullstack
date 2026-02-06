import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    private prisma : PrismaService, 
    private jwtService : JwtService
  ) {}

  async login(username: string, pass: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });
    
    console.log (`getting data for ${username} and ${pass}`)

    if (!admin || !(await bcrypt.compare(pass, admin.password))) {
      throw new UnauthorizedException('Wrong Credentials!');
    }

    const payload = { sub: admin.id, username: admin.username };
    return this.jwtService.sign(payload);
  }

  async create(username : string, pass : string) {
    const existingAdmin = await this.prisma.admin.findUnique({ where: { username } });
    if (existingAdmin) {
        throw new Error('Username sudah digunakan, cari yang lebih kuat!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    return this.prisma.admin.create({
        data: {
            username,
            password: hashedPassword,
        },
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
