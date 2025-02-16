import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EighthScreenComponent } from './eighth-screen.component';

describe('EighthScreenComponent', () => {
  let component: EighthScreenComponent;
  let fixture: ComponentFixture<EighthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EighthScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EighthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
