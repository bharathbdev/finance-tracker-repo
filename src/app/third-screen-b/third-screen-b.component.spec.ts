import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdScreenBComponent } from './third-screen-b.component';

describe('ThirdScreenBComponent', () => {
  let component: ThirdScreenBComponent;
  let fixture: ComponentFixture<ThirdScreenBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdScreenBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdScreenBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
