import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClStepsComponent } from './steps.component';

describe('StepsComponent', () => {
  let component: ClStepsComponent;
  let fixture: ComponentFixture<ClStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
