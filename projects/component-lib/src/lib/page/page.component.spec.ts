import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClPageComponent } from './page.component';

describe('PageComponent', () => {
  let component: ClPageComponent;
  let fixture: ComponentFixture<ClPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
