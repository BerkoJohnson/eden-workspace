import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto, LoginDto } from '../dtos';
import { UserEntity } from '../entities';

@Injectable()
export class AuthService {
  async createUser(data: AuthDto) {
    try {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return user.toResponseObj(true);
    } catch (e) {
      console.error(e);
    }
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users.map(u => u.toResponseObj());
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user.toResponseObj();
  }

  async login(authDto: LoginDto) {
    const { email, password } = authDto;
    const user = await this.findByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      throw new BadRequestException('Invalid email/password');
    }

    return user.toResponseObj(true);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
}
