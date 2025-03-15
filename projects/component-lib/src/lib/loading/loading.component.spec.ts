import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClLoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: ClLoadingComponent;
  let fixture: ComponentFixture<ClLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
