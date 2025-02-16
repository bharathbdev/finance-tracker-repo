import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthScreenComponent } from './ninth-screen.component';

describe('NinthScreenComponent', () => {
  let component: NinthScreenComponent;
  let fixture: ComponentFixture<NinthScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NinthScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
