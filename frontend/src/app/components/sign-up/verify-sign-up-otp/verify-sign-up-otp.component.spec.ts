import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySignUpOtpComponent } from './verify-sign-up-otp.component';

describe('VerifySignUpOtpComponent', () => {
  let component: VerifySignUpOtpComponent;
  let fixture: ComponentFixture<VerifySignUpOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifySignUpOtpComponent]
    });
    fixture = TestBed.createComponent(VerifySignUpOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
