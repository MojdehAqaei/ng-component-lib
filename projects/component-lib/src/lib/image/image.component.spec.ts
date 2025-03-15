import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ClImageComponent;
  let fixture: ComponentFixture<ClImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
