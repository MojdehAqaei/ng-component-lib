import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClTextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: ClTextAreaComponent;
  let fixture: ComponentFixture<ClTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClTextAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
