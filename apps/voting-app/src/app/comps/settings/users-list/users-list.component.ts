import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser, UserList } from '../../../models/user.interface';
import { TableHeader } from '../../../shared/shared';
import { UsersService } from '../users.service';

@Component({
  selector: 'vt-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  headers: TableHeader[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'createdAt', label: 'Created' },
    { key: 'updatedAt', label: 'Last Updated' },
  ];

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.displayedColumns = this.headers.map((h) => h.key);

    this.usersService.getUsers().subscribe((d) => {
      this.dataSource.sort = this.sort;
      this.dataSource.data = d;
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
