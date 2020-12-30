import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { genSalt, hash } from 'bcrypt';


import { CreateUserDto } from './create-user.dto';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const {email, firstName, lastName, password, role} = createUserDto;
    const found = await this.findByEmail(email);

    if (found) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;

    user.salt = await genSalt(12);

    user.password = await this.hashPw(password, user.salt);

    const user_saved = await user.save();

    user_saved.salt = undefined;
    user_saved.password = undefined;

    return user_saved;
  }

  async list(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async hashPw(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

}
