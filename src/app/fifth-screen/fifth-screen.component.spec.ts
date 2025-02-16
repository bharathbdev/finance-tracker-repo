import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthScreenComponent } from './fifth-screen.component';

describe('FifthScreenComponent', () => {
  let component: FifthScreenComponent;
  let fixture: ComponentFixture<FifthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FifthScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
