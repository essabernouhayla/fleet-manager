import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleStats } from './vehicle-stats';

describe('VehicleStats', () => {
  let component: VehicleStats;
  let fixture: ComponentFixture<VehicleStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleStats],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
