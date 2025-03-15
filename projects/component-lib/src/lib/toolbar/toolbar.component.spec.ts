import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ClToolbarComponent;
  let fixture: ComponentFixture<ClToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
