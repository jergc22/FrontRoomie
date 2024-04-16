import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRoomiesComponent } from './my-roomies.component';

describe('MyRoomiesComponent', () => {
  let component: MyRoomiesComponent;
  let fixture: ComponentFixture<MyRoomiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRoomiesComponent]
    });
    fixture = TestBed.createComponent(MyRoomiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
