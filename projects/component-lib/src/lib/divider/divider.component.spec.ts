import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClDividerComponent } from './divider.component';

describe('DividerComponent', () => {
  let component: ClDividerComponent;
  let fixture: ComponentFixture<ClDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClDividerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
