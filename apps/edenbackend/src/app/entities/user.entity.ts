import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity, Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLES } from '../shared/roles.enum';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
// import { config } from 'dotenv';
// config();

@Entity('users')
@Index(['email'], {unique:true})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    enum: [ROLES.ADMIN, ROLES.USER, ROLES.SUPERADMIN],
    default: ROLES.USER,
  })
  role: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, firstName, lastName, email, role } = this;
    return jwt.sign(
      {
        id,
        firstName,
        lastName,
        email,
        role,
      },
      process.env.APP_SECRET,
      { expiresIn: '1d' },
    );
  }

  toResponseObj(showToken = false) {
    const { password, ...others } = this;

    const res: any = { ...others };
    if (showToken) {
      res.token = this.token;
    }
    return res;
  }
}
