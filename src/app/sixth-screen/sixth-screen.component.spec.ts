import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthScreenComponent } from './sixth-screen.component';

describe('SixthScreenComponent', () => {
  let component: SixthScreenComponent;
  let fixture: ComponentFixture<SixthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SixthScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
