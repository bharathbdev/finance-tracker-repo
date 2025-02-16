import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthScreenComponent } from './fourth-screen.component';

describe('FourthScreenComponent', () => {
  let component: FourthScreenComponent;
  let fixture: ComponentFixture<FourthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FourthScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
