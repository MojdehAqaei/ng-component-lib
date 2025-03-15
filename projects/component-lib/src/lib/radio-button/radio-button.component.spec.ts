import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClRadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let component: ClRadioButtonComponent;
  let fixture: ComponentFixture<ClRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClRadioButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
