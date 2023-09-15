import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPostComponent } from './i-post.component';

describe('IPostComponent', () => {
  let component: IPostComponent;
  let fixture: ComponentFixture<IPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IPostComponent]
    });
    fixture = TestBed.createComponent(IPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
