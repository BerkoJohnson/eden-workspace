import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Links } from '../models/Link';
import { ROLES } from '../models/roles.enum';

@Component({
  selector: 'evc-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit{
  links: Links = [
    {href: 'users', title: 'Users'},
    {href: 'elections', title: 'Elections'},
  ];

  user: {email: string, role: ROLES}
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth.user;
  }



  logout() {
    this.auth.logout().subscribe(bol => {
      if(bol) {
        this.router.navigate(['/login']);
      }
    })
  }
}
