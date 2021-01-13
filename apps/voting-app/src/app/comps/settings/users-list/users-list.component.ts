import { Component, OnInit } from '@angular/core';
import { UserList } from '../../../models/user.interface';
import { TableHeader } from '../../../shared/shared';
import { UsersService } from '../users.service';

@Component({
  selector: 'eden-workspace-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  headers: TableHeader[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
  ];

  data:UserList = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((d) => this.data = d);
  }
}
