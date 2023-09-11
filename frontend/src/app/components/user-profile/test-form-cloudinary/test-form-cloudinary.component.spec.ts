import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormCloudinaryComponent } from './test-form-cloudinary.component';

describe('TestFormCloudinaryComponent', () => {
  let component: TestFormCloudinaryComponent;
  let fixture: ComponentFixture<TestFormCloudinaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormCloudinaryComponent]
    });
    fixture = TestBed.createComponent(TestFormCloudinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
