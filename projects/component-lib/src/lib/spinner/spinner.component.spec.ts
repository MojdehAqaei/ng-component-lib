import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: ClSpinnerComponent;
  let fixture: ComponentFixture<ClSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
