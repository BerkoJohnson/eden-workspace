import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedGridsComponent } from './advanced-grids.component';

describe('AdvancedGridsComponent', () => {
  let component: AdvancedGridsComponent;
  let fixture: ComponentFixture<AdvancedGridsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedGridsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedGridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
