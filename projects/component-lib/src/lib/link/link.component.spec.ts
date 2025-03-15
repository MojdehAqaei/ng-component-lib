import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClLinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: ClLinkComponent;
  let fixture: ComponentFixture<ClLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
