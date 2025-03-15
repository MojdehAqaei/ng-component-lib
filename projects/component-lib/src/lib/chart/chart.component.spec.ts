import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClAccordionComponent } from './chart.component';

describe('AccordionComponent', () => {
  let component: ClAccordionComponent;
  let fixture: ComponentFixture<ClAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
