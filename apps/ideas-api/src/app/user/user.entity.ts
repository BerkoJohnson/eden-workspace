import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRO } from './user.dto';
import { IdeaEntity } from '../idea/idea.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({
    type: 'text',
    unique: true,
  })
  username: string;

  @Column('text')
  password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken = true): UserRO {
    const { id, created, username, token, ideas } = this;

    const responseObject: UserRO = {
      id,
      created,
      username,
      ideas: ideas && ideas.map(idea => ({ ...idea, author: undefined })),
    };

    if (showToken === true) {
      responseObject.token = token;
    }

    return responseObject;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
  private get token() {
    const { id, username } = this;

    return jwt.sign(
      {
        id,
        username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
