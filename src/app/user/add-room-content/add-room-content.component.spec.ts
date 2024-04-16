import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomContentComponent } from './add-room-content.component';

describe('AddRoomContentComponent', () => {
  let component: AddRoomContentComponent;
  let fixture: ComponentFixture<AddRoomContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoomContentComponent]
    });
    fixture = TestBed.createComponent(AddRoomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
