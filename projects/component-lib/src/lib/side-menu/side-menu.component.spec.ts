import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: ClSideMenuComponent;
  let fixture: ComponentFixture<ClSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClSideMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
