import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: ClSelectComponent;
  let fixture: ComponentFixture<ClSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
