import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  SimpleChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ClSharedService} from "@sadad/component-lib/src/services";
import {ClSelectItem} from "@sadad/component-lib/src/models";
import {ClInputTextComponent} from "@sadad/component-lib/src/lib/input-text";
import {ClHttpMethod} from "@sadad/component-lib/src/enums";
import {ClCheckboxComponent} from "@sadad/component-lib/src/lib/checkbox";
import {ClObjectToStringPipe} from "@sadad/component-lib/src/pipes";
import {HttpContext, HttpParams} from "@angular/common/http";
import {ClAutofocusDirective} from '@sadad/component-lib/src/lib/auto-focus';

const INITIAL_VALUE: { [key: string]: any } = {
  filterPlaceholder: 'جستجو کنید ...',
  method: ClHttpMethod.GET,
  showClearIcon: true,
};

@Component({
  selector: 'cl-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ClCheckboxComponent,
    ClInputTextComponent,
    ClAutofocusDirective

  ],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClSelectComponent,
      multi: true
    },
    ClObjectToStringPipe]

})
export class ClSelectComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {

  @Input() method?: ClHttpMethod;
  @Input() multiple?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() showClearIcon?: boolean = true;
  @Input() filterable?: boolean = false;
  @Input() placeholder: string = 'انتخاب کنید';
  @Input() filterPlaceholder?: string = 'جستجو کنید ...';
  @Input() options?: ClSelectItem[] = [];
  @Input() lazyFilter?: boolean = false;
  @Input() optionLabel?: string[];
  @Input() optionValue?: string;
  @Input() styleClasses?: string = '';
  @Input() httpParams: HttpParams = new HttpParams();
  @Input() httpContext?: HttpContext;
  @Input() url?: string = '';
  @Output() onSelect = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() optionsChange = new EventEmitter<ClSelectItem[]>();


  selectedOptions?: any[];
  selectedLabel?: string;
  search$: Subject<any> = new Subject();
  subscription: Subscription = new Subscription();
  containerHeight: string = 'auto';
  filterOptions?: ClSelectItem[] = [];
  filterValue: string = '';
  allSelected: boolean = false;
  loading: boolean = false;
  showDialog: boolean = false;


  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  constructor(private _sharedService: ClSharedService,
              private _elRef: ElementRef,
              private _objectToStringPipe: ClObjectToStringPipe) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterOptions = this.options;

    if (this.lazyFilter) {
      this.search();
    }
  }

  get classes() {
    return `${this.showDialog ? 'cl-focus' : ''} ${this.styleClasses}`;
  }

  mapToSelectItems(options: any[]) {
    this.options = [];
    options?.forEach(item => {
      this.options?.push({
        label: this.optionLabel?.length ? this.createLabel(item) : item.label,
        value: item
      });
    });
    this.optionsChange.emit(this.options);
    this.filterOptions = [...this.options];
  }

  createLabel(data: any) {
    return this.optionLabel?.map(label => this._objectToStringPipe.nestedObjectValue(data, label)).join(' ');
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: any) {
    if (event.key === 'Escape' && this.showDialog)
      this.showDialog = false;
  }

  displayDialog() {
    if (!this.disabled) {
      this.showDialog = !this.showDialog;
      if (this.showDialog) {
        this.getDialogHeight();
        if (this.url && !this.lazyFilter && !this.options?.length) {
          this.retrieveOptions();
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    // click outside of component
    this.showDialog = !this._elRef.nativeElement.contains(event.target) ? false : this.showDialog;
  }

  retrieveOptions() {
    this.loading = true;
    if (this.url) {
      this._sharedService.createHttpRequest<any[]>(this.url, this.method || ClHttpMethod.GET, null, this.httpParams, this.httpContext).subscribe({
        next: (res: any[]) => {
          this.mapToSelectItems(res);
          this.getDialogHeight();
          this.loading = false;
        }, error: (error) => {
          this.loading = false;
        }
      });
    }

  }

  getDialogHeight() {
    this.containerHeight = this.filterOptions?.length ? this.filterOptions?.length > 4 ? '10rem' : `${this.filterOptions?.length * 3.4}rem` : '0';
  }

  onFilter(filter: any) {
    if (filter?.trim()) {
      this.lazyFilter
        ? this.search$.next(filter)
        : (this.filterOptions = this.options?.filter((item) =>
            item.label?.includes(filter),
          ));
    } else {
      this.filterOptions = this.options;
    }
    this.onSearch.emit(filter);
    this.getDialogHeight();
  }

  search() {
    this.subscription = this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchText) => {
          this.loading = true;
          this.options = [];

        const params = this.httpParams?.append('filter', searchText);
        return this._sharedService.createHttpRequest<any[]>(this.url!, this.method || ClHttpMethod.GET, null, params, this.httpContext);
      }),
    ).subscribe({
      next: (res: any[]) => {
        this.mapToSelectItems(res);
        this.getDialogHeight();
        this.loading = false;
      }, error: () => {
        this.loading = false;
      }
    });
  }

  clear() {
    this.filterOptions = this.options;
    this.showDialog = false;
    this.filterValue = '';
    this.selectedOptions = this.selectedLabel = undefined;
    this.onChange(this.multiple ? [] : null);
    this.onSelect.emit(this.multiple ? [] : null);
  }

  selectAll(check: boolean) {
    this.selectedOptions = check ? this.filterOptions?.map(x => x.value) : [];
    const checkedOptions = this.filterOptions?.map(item => {
      return this.optionValue ? item.value[this.optionValue] : item.value
    });
    this.onChange(checkedOptions);
    this.onSelect.emit(checkedOptions);
  }

  selectSingleOption(option: ClSelectItem) {
    this.selectedLabel = option.label;
    this.showDialog = false;
    this.onChange(this.optionValue ? option.value[this.optionValue] : option.value);
    this.onSelect.emit(option.value);
  }

  selectMultipleOption(values: any[]) {
    const selectedOptions = this.filterOptions?.filter(item => values.find(value => this.optionValue ? item.value[this.optionValue] == value : item.value == value))?.map(item => item.value);
    this.onChange(selectedOptions);
    this.onSelect.emit(selectedOptions);
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(values: any[] | ClSelectItem | any) {
    if (!values) {
      this.allSelected = false;
      this.selectedOptions = [];
      this.selectedLabel = undefined;
    } else if (values && this.multiple && Array.isArray(values) && values?.length) {
      this.allSelected = values.length == this.filterOptions?.length
      this.selectedOptions = this.optionValue ? values.map((value: any) => value[this.optionValue!]) : values;
    } else if (values && !this.multiple && !Array.isArray(values)) {
      this.selectedLabel =
        this.optionLabel?.length && typeof values == 'object'
          ? this.createLabel(values)
          : values.label
            ? values.label
            : this.options?.length
              ? this.options.find((item: ClSelectItem) =>
                  this.optionValue
                    ? item.value
                      ? item.value[this.optionValue] == values
                      : // @ts-ignore
                        item[this.optionValue] == values
                    : item.value == values,
                )?.label
              : undefined;
    }
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any) {
    this.onChange = fn
  }

  // When the element is touched, this method will get called
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    if (!this.disabled) {
      this.subscription?.unsubscribe();
    }
  }
}
