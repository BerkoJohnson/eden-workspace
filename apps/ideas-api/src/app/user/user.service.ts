import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserRO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(data: UserDto): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new BadRequestException('Invalid Username/Password');
    }

    return user.toResponseObject(false);
  }

  async register(data: UserDto): Promise<UserRO> {
    const { username } = data;

    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    user = this.userRepository.create(data);

    await this.userRepository.save(user);

    return user.toResponseObject();
  }

  async showAllUsers(): Promise<UserRO[]> {
    const users = await this.userRepository.find();
    return users.map(user => user.toResponseObject(false));
  }
}
