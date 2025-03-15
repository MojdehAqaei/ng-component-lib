import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClRichTextEditorComponent } from './rich-text-editor.component';

describe('ClRichTextEditorComponent', () => {
  let component: ClRichTextEditorComponent;
  let fixture: ComponentFixture<ClRichTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClRichTextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClRichTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
