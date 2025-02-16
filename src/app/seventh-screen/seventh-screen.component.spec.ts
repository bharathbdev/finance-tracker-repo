import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhScreenComponent } from './seventh-screen.component';

describe('SeventhScreenComponent', () => {
  let component: SeventhScreenComponent;
  let fixture: ComponentFixture<SeventhScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeventhScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
