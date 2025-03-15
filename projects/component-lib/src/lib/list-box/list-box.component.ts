import {
  Attribute,
  Component,
  ContentChild, EventEmitter,
  Input, OnInit, Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClTemplateDirective} from "@sadad/component-lib/src/lib/template";
import {ClObjectToStringPipe} from "@sadad/component-lib/src/pipes";
import {ClCheckboxComponent} from "@sadad/component-lib/src/lib/checkbox";
import {ClRadioButtonComponent} from "@sadad/component-lib/src/lib/radio-button";
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClImageComponent} from "@sadad/component-lib/src/lib/image";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

const INITIAL_VALUE: { [key: string]: any } = {
  noDefaultStyle: true,
};

@Component({
  selector: 'cl-list-box',
  standalone: true,
  imports: [CommonModule, ClObjectToStringPipe, ClTemplateDirective, ClCheckboxComponent, ClRadioButtonComponent, ClImageComponent, FormsModule, CdkDropList, CdkDrag],
  templateUrl: './list-box.component.html',
  providers: [
    ClObjectToStringPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClListBoxComponent,
      multi: true
    }]
})
export class ClListBoxComponent implements OnInit, ControlValueAccessor {
  @Input() data: any[] = [];
  @Input() emptyDataMessage: string = 'اطلاعاتی برای نمایش وجود ندارد .';
  @Input() selectable?: boolean = false;
  @Input() multiple?: boolean = false;
  @Input() optionLabel?: string;
  @Input() optionValue?: string;
  @Input() isOrdered: boolean = false;
  @Input() noDefaultStyle: boolean = true;
  @Input() icon?: string;
  @Input() image?: string;
  @Input() draggable?: boolean;
  @Output() onSelect = new EventEmitter<any>();

  selectedOptions: any[] | any = [];
  disabled!: boolean;

  @ContentChild(ClTemplateDirective) templateRef?: ClTemplateDirective;

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  onChange: any = () => {}

  onTouch: any = () => {}

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  select(items: any | any[]) {
    this.onChange(items);
    this.onSelect.emit(items);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: any | any[]): void {
    this.selectedOptions = val;
  }

}
