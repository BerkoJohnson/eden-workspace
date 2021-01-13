import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'eden-workspace-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  constructor(private readonly authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout().subscribe(bol => {
      if(bol) {
        this.router.navigate(['/login']);
      }
    })
  }
}
