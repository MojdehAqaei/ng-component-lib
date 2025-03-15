import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClFormGeneratorComponent } from './form-generator.component';

describe('FormGeneratorComponent', () => {
  let component: ClFormGeneratorComponent;
  let fixture: ComponentFixture<ClFormGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClFormGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClFormGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
