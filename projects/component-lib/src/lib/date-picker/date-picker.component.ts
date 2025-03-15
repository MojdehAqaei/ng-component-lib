import dayjs, { Dayjs } from 'dayjs';
import { NgClass, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ClAction, WeekDays} from '@sadad/component-lib/src/models';

import getDays, {
  formatDate,
  selectMonth,
  isToday,
  weekdays,
  months,
  selectYear,
  getYear,
} from './utils/date';
import {ClInputTextComponent} from "@sadad/component-lib/src/lib/input-text";
import {ClickOutsideDirective} from '@sadad/component-lib/src/lib/click-outside';
import {ClInputGroupComponent} from "@sadad/component-lib/src/lib/input-group";

type Year = { date: Dayjs; title: string };

@Component({
  selector: 'cl-date-picker',
  standalone: true,
  imports: [NgClass, ClInputTextComponent, ReactiveFormsModule, ClickOutsideDirective, NgStyle, ClInputGroupComponent],
  templateUrl: './date-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClDatePickerComponent,
      multi: true
    }
  ]
})
export class ClDatePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges {
  protected readonly formatDate = formatDate;
  protected readonly isToday = isToday;
  protected readonly weekdays = weekdays;
  protected readonly months = months;

  @Input() clear = false;
  @Input() disabled = false;
  @Input() isOpen = false;
  @Input() format = 'YYYY/MM/DD';
  @Input() range!: {
    min: string;
    max: string;
  };
  @Input() position!: 'top' | 'bottom'

  // @Input() onChange!: (date: string) => void;
  @Input() placeholder: string = '...';

  @Output() select = new EventEmitter<any>();

  @ViewChild('wrapperRef') wrapperRef!: ElementRef;
  @ViewChild('modalRef') modalRef!: ElementRef;

  date!: Date;

  constructor() {
    this.date = new Date();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clear']) {
      this.clearButton = {
        icon: 'close',
        position: 'end',
        type: 'icon',
        styleClasses: 'cl-date-picker-clear-button cl-hover',
        command: () => this.clearDate()
      };
    }
  }


  formattedDate = new FormControl;
  days = getDays(dayjs().toDate(), this.range);
  state: 'days' | 'months' | 'decade' = 'days';
  years: Year[] = [];
  selectedYear: Year = {
    title: formatDate(dayjs().toDate(), 'YYYY'),
    date: dayjs(),
  };
  clearButton: ClAction = {};

  ngOnInit() {
    // this.formattedDate.setValue(this.formatDate(this.date, this.format));
    this.days = getDays(dayjs(this.date).toDate(), this.range);
  }

  @HostListener('document:scroll', ['$event'])
  onBodyScroll(event: Event) {
    this.getElementPosition();
  }

  ngAfterViewInit() {
    this.getElementPosition();
  }

  getElementPosition() {
    const elementBounds = this.wrapperRef.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const remainingSpace = viewportHeight - (elementBounds.top + elementBounds.height);

    const modalHeight = this.modalRef.nativeElement.getBoundingClientRect().height;

    if (remainingSpace < modalHeight) {
      this.position = 'top'
    } else {
      this.position = 'bottom'
    }

  }

  onChange: any = () => {
  }
  onTouch: any = () => {
  }

  handleNext(offset: 1 | -1) {
    if (this.state === 'decade') {
      this.years = this.years.map((item) => {
        const newDate = item.date.add(offset * 12, 'year');
        return {
          date: newDate,
          title: this.formatDate(newDate.toDate(), 'YYYY'),
        };
      });
    } else {
      const currentMonth = this.days.middleOfMonth;
      const offsetType = this.state === 'days' ? 'month' : 'year';
      const nextMonth = dayjs(currentMonth).add(offset, offsetType);
      this.selectedYear = {
        date: nextMonth,
        title: this.formatDate(nextMonth.toDate(), 'YYYY'),
      };
      this.days = getDays(nextMonth.toDate(), this.range);
    }
  }

  handleClickOnTitle() {
    if (this.state === 'days') {
      this.state = 'months';
    } else if (this.state === 'months') {
      this.years = Array.from({ length: 12 }, (_, i) => {
        const date = dayjs().add(i, 'year');
        return {
          date: date,
          title: formatDate(date.toDate(), 'YYYY'),
        };
      });
      this.state = 'decade';
    }
  }

  handleClickOnDay(day: WeekDays) {
    this.formattedDate.setValue(this.formatDate(day.date, this.format));
    this.date = day.date;
    if (this.onChange) {
      this.onChange(day.date.toISOString());
    }
    this.handleClose();
    this.select.emit(day.date.toISOString());
  }

  onKeyPress(event: KeyboardEvent): void {
    event.preventDefault();
  }

  handleClickOnMonth(month: number) {
    const date = selectMonth(this.days.middleOfMonth, month);
    this.days = getDays(date, this.range);
    this.state = 'days';
  }

  handleClickOnYear(year: Year) {
    this.selectedYear = year;
    this.days = getDays(
      selectYear(new Date(), parseInt(getYear(year.date.toDate(), 'latn'))),
      this.range
    );
    this.state = 'months';
  }

  handleShow(event: any) {
    if (event?.target?.nodeName == 'INPUT') {
      if (!this.disabled) {
        this.isOpen = !this.isOpen;
        this.days = getDays(dayjs(this.date).toDate(), this.range);
      }
    }
  }

  handleClose() {
    this.isOpen = false;
    this.days = getDays(dayjs(this.date).toDate(), this.range);
  }

  renderTitleText = () => {
    switch (this.state) {
      case 'days':
        return this.days.monthName;
      case 'months':
        return this.selectedYear.title;
      case 'decade':
        return `${this.years[0].title} - ${this.years[this.years.length - 1].title}`;
      default:
        return '';
    }
  };

  writeValue(value: Date | unknown) {
    if (value instanceof Date) {
      this.formattedDate.setValue(this.formatDate(value, this.format));
      this.date = value;
    } else {
      this.formattedDate.reset();
      this.date = new Date();
    }
  }

  clearDate() {
    this.formattedDate.reset();
    this.onChange(null);
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formattedDate.disable() : this.formattedDate.enable();
  }
}
