import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAdmin } from './maintenance-admin';

describe('MaintenanceAdmin', () => {
  let component: MaintenanceAdmin;
  let fixture: ComponentFixture<MaintenanceAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
