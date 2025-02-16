import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdScreenAComponent } from './third-screen-a.component';

describe('ThirdScreenAComponent', () => {
  let component: ThirdScreenAComponent;
  let fixture: ComponentFixture<ThirdScreenAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThirdScreenAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdScreenAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
