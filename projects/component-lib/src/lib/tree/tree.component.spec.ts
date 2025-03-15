import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClTreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: ClTreeComponent;
  let fixture: ComponentFixture<ClTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
