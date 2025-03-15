import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopBottomComponent } from './scroll-top-bottom.component';

describe('ScrollTopBottomComponent', () => {
  let component: ScrollTopBottomComponent;
  let fixture: ComponentFixture<ScrollTopBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ScrollTopBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollTopBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
