import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserDto } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userDto: CreateUserDto ) {
    return this.http.post('/api/users', userDto);
  }
}
