import { Component } from '@angular/core';

@Component({
  selector: 'evc-setting-home',
  template: ` <evc-page-header>
      <div pageTitle>School Setup</div>

      <div buttonsGroup>
        <div class="btn-group me-2">
          <a
            class="btn btn-sm btn-outline-secondary"
            routerLinkActive="active"
            routerLink="./departments"
            >Deptments</a
          >
          <a
            class="btn btn-sm btn-outline-secondary"
            routerLink="./subjects"
            routerLinkActive="active"
            >Subjects</a
          >
          <a class="btn btn-sm btn-outline-secondary" href="#">Classrooms</a>
          <a class="btn btn-sm btn-outline-secondary" href="#">Teachers</a>
          <a class="btn btn-sm btn-outline-secondary" href="#"
            >Responsibilities</a
          >
          <a class="btn btn-sm btn-outline-secondary" href="#">Grades Records</a>
        </div>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <!-- <li>
              <a class="dropdown-item" routerLink="./departments">Deptments</a>
            </li>
            <li>
              <a class="dropdown-item" routerLink="./subjects">Subjects</a>
            </li>
            <li><a class="dropdown-item" href="#">Classrooms</a></li>
            <li><a class="dropdown-item" href="#">Teachers</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Responsibilities</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Grades Records</a></li> -->
          </ul>
        </div>
      </div>
    </evc-page-header>

    <div class="container-fluid">
      <div class="row g-2">
        <div class="col-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>`,
})
export class SettingsHomeComponent {}
