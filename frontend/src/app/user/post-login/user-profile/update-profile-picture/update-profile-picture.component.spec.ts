import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePictureComponent } from './update-profile-picture.component';

describe('UpdateProfilePictureComponent', () => {
  let component: UpdateProfilePictureComponent;
  let fixture: ComponentFixture<UpdateProfilePictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfilePictureComponent]
    });
    fixture = TestBed.createComponent(UpdateProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
