import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClPickListComponent } from './pick-list.component';

describe('PickListComponent', () => {
  let component: ClPickListComponent;
  let fixture: ComponentFixture<ClPickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClPickListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClPickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
