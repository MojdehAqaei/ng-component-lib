import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDatePickerComponent } from './date-picker.component';

describe('NewDatePickerComponent', () => {
  let component: NewDatePickerComponent;
  let fixture: ComponentFixture<NewDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
