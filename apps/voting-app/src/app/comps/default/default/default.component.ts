import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
@Component({
  selector: 'vt-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
  deviceXs: boolean;
  sub: Subscription;
  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private mediaObserver: MediaObserver
  ) {}

  ngOnInit(): void {
    this.sub = this.mediaObserver
      .asObservable()
      .subscribe((result: MediaChange[]) => {
        this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
      });
  }
  logout() {
    this.authService.logout().subscribe((bol) => {
      if (bol) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
