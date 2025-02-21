import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenScreenComponent } from './ten-screen.component';

describe('TenScreenComponent', () => {
  let component: TenScreenComponent;
  let fixture: ComponentFixture<TenScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
