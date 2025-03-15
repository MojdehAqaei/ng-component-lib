import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClAlertMessagesComponent } from './alert-message.component';

describe('AlertMessagesComponent', () => {
  let component: ClAlertMessagesComponent;
  let fixture: ComponentFixture<ClAlertMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClAlertMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClAlertMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
