import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClHeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: ClHeaderComponent;
  let fixture: ComponentFixture<ClHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
