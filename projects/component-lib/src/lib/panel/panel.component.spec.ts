import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClPanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: ClPanelComponent;
  let fixture: ComponentFixture<ClPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
