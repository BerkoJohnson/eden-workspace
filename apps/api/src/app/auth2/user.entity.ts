import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../shared/role.enum';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Entity('users')
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

  @Column('text')
  salt: string;

  @Column('time without time zone')
  lastLogin: Date;

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
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );
  }
}
