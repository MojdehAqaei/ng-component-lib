import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClInputSwitchComponent } from './input-switch.component';

describe('InputSwitchComponent', () => {
  let component: ClInputSwitchComponent;
  let fixture: ComponentFixture<ClInputSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClInputSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
