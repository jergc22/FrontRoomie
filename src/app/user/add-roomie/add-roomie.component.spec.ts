import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomieComponent } from './add-roomie.component';

describe('AddRoomieComponent', () => {
  let component: AddRoomieComponent;
  let fixture: ComponentFixture<AddRoomieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoomieComponent]
    });
    fixture = TestBed.createComponent(AddRoomieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
