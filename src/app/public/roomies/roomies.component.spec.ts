import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomiesComponent } from './roomies.component';

describe('RoomiesComponent', () => {
  let component: RoomiesComponent;
  let fixture: ComponentFixture<RoomiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomiesComponent]
    });
    fixture = TestBed.createComponent(RoomiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
