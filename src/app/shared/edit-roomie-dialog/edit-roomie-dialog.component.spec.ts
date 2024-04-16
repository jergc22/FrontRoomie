import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomieDialogComponent } from './edit-roomie-dialog.component';

describe('EditRoomieDialogComponent', () => {
  let component: EditRoomieDialogComponent;
  let fixture: ComponentFixture<EditRoomieDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRoomieDialogComponent]
    });
    fixture = TestBed.createComponent(EditRoomieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
