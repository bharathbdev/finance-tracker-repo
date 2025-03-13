import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggrementScreenComponent } from './aggrement-screen.component';

describe('AggrementScreenComponent', () => {
  let component: AggrementScreenComponent;
  let fixture: ComponentFixture<AggrementScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggrementScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggrementScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
