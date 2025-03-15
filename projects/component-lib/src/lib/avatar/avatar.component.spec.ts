import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClAvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: ClAvatarComponent;
  let fixture: ComponentFixture<ClAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
