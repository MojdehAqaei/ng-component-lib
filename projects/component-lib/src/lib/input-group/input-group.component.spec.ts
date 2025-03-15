import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClInputGroupComponent } from './input-group.component';

describe('InputGroupComponent', () => {
  let component: ClInputGroupComponent;
  let fixture: ComponentFixture<ClInputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClInputGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
