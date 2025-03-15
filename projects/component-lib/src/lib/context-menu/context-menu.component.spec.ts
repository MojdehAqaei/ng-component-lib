import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClContextMenuComponent } from './context-menu.component';

describe('ContextMenuComponent', () => {
  let component: ClContextMenuComponent;
  let fixture: ComponentFixture<ClContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClContextMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
