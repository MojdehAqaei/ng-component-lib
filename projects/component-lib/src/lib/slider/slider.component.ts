import {
  Attribute, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input, NgZone,
  Output, PLATFORM_ID, Renderer2,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule, DOCUMENT, isPlatformBrowser} from "@angular/common";
// import {SliderChangeEvent, SliderSlideEndEvent} from "@sadad/component-lib/src/models"; //todo

interface SliderChangeEvent { //todo
  event: Event;
  values?: number[];
  value?: number;
}
interface SliderSlideEndEvent { //todo
  originalEvent: Event;
  value?: number;
  values?: number[];
}

@Component({
  selector: 'cl-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClSliderComponent),
      multi: true
    }
  ]
})
export class ClSliderComponent implements ControlValueAccessor {

  value: number = 0;
  values: number[] = [0,0];
  disabled?: boolean;
  handleValue: number = 0;
  handleValues: number[] = [0, 100];
  diff?: number;
  offset?: number;
  bottom?: number;
  dragging?: boolean;
  dragListener: VoidFunction | null | undefined;
  mouseupListener: VoidFunction | null | undefined;
  initX?: number;
  initY?: number;
  barWidth?: number;
  barHeight?: number;
  sliderHandleClick?: boolean;
  handleIndex: number = 0;
  startHandleValue?: any;
  startx?: number;
  starty?: number;

  @Input() range: boolean = false;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step?: number;
  @Input() tabindex: number = 0;

  @Output() onChange: EventEmitter<SliderChangeEvent> = new EventEmitter<SliderChangeEvent>();
  @Output() onSlideEnd: EventEmitter<SliderSlideEndEvent> = new EventEmitter<SliderSlideEndEvent>();

  @ViewChild('sliderHandle') sliderHandle?: ElementRef<any>;
  @ViewChild('sliderHandleStart') sliderHandleStart?: ElementRef<any>;
  @ViewChild('sliderHandleEnd') sliderHandleEnd?: ElementRef<any>;

  private onTouchedCallback: Function = () => {};
  private onChangeCallback: Function = () => {};

  constructor(@Attribute('styleClasses') public styleClasses: string,
              @Inject(DOCUMENT) private document: Document,
              @Inject(PLATFORM_ID) private platformId: Object,
              public el: ElementRef,
              public renderer: Renderer2,
              private ngZone: NgZone,
              public cd: ChangeDetectorRef) {}

  writeValue(value: any): void {
    if (this.range) this.values = value || [0, 0];
    else this.value = value || 0;

    this.updateHandleValue();
    this.updateDiffAndOffset();
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
    this.cd.markForCheck();
  }

  onMouseDown(event: Event, index?: number) {
    if (this.disabled) {
      return;
    }

    this.dragging = true;
    this.updateDomData();
    this.sliderHandleClick = true;
    if (this.range && this.handleValues && this.handleValues[0] === this.max) {
      this.handleIndex = 0;
    } else {
      (this.handleIndex as any) = index;
    }

    this.bindDragListeners();
    (event.target as HTMLInputElement).focus();
    event.preventDefault();
  }

  onDragStart(event: TouchEvent, index?: number) {
    if (this.disabled) {
      return;
    }

    const touchObj = event.changedTouches[0];
    this.startHandleValue = this.range ? this.handleValues[index as number] : this.handleValue;
    this.dragging = true;
    if (this.range && this.handleValues && this.handleValues[0] === this.max) {
      this.handleIndex = 0;
    } else {
      this.handleIndex = index as number;
    }

    this.startx = parseInt((touchObj as any).clientX, 10);
    this.barWidth = this.el.nativeElement.children[0].offsetWidth;


    event.preventDefault();
  }

  onDrag(event: TouchEvent) {
    if (this.disabled) {
      return;
    }

    let touchObj = event.changedTouches[0],

    handleValue = Math.floor(((parseInt((touchObj as any).clientX, 10) - (this.startx as number)) * 100) / (this.barWidth as number)) + this.startHandleValue;

    this.setValueFromHandle(event, handleValue);

    event.preventDefault();
  }

  onDragEnd(event: TouchEvent) {
    if (this.disabled) {
      return;
    }

    this.dragging = false;

    if (this.range) this.onSlideEnd.emit({ originalEvent: event, values: this.values as number[] });
    else this.onSlideEnd.emit({ originalEvent: event, value: this.value as number });

    event.preventDefault();
  }

  onBarClick(event: Event) {
    if (this.disabled) {
      return;
    }

    if (!this.sliderHandleClick) {
      this.updateDomData();
      this.handleChange(event);

      if (this.range) this.onSlideEnd.emit({ originalEvent: event, values: this.values as number[] });
      else this.onSlideEnd.emit({ originalEvent: event, value: this.value as number });
    }

    this.sliderHandleClick = false;
  }

  onKeyDown(event: any, index: number = 0) {
    this.handleIndex = index;

    switch (event?.code) {
      case 'ArrowDown':
      case 'ArrowLeft':
        this.decrementValue(event, index);
        event.preventDefault();
        break;

      case 'ArrowUp':
      case 'ArrowRight':
        this.incrementValue(event, index);
        event.preventDefault();
        break;

      case 'PageDown':
        this.decrementValue(event, index, true);
        event.preventDefault();
        break;

      case 'PageUp':
        this.incrementValue(event, index, true);
        event.preventDefault();
        break;

      case 'Home':
        this.updateValue(this.min, event);
        event.preventDefault();
        break;

      case 'End':
        this.updateValue(this.max, event);
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  decrementValue(event: any, index: number, pageKey = false) {
    let newValue;

    if (this.range) {
      if (this.step) newValue = this.values[index] - this.step;
      else newValue = this.values[index] - 1;
    } else {
      if (this.step) newValue = this.value - this.step;
      else if (!this.step && pageKey) newValue = this.value - 10;
      else newValue = this.value - 1;
    }

    this.updateValue(newValue, event);
    event.preventDefault();
  }

  incrementValue(event: any, index: number, pageKey = false) {
    let newValue;

    if (this.range) {
      if (this.step) newValue = this.values[index] + this.step;
      else newValue = this.values[index] + 1;
    } else {
      if (this.step) newValue = this.value + this.step;
      else if (!this.step && pageKey) newValue = this.value + 10;
      else newValue = this.value + 1;
    }

    this.updateValue(newValue, event);
    event.preventDefault();
  }

  handleChange(event: Event) {
    let handleValue = this.calculateHandleValue(event);
    this.setValueFromHandle(event, handleValue);
  }

  bindDragListeners() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

        if (!this.dragListener) {
          this.dragListener = this.renderer.listen(documentTarget, 'mousemove', (event) => {
            if (this.dragging) {
              this.ngZone.run(() => {
                this.handleChange(event);
              });
            }
          });
        }

        if (!this.mouseupListener) {
          this.mouseupListener = this.renderer.listen(documentTarget, 'mouseup', (event) => {
            if (this.dragging) {
              this.dragging = false;
              this.ngZone.run(() => {
                if (this.range) this.onSlideEnd.emit({ originalEvent: event, values: this.values as number[] });
                else this.onSlideEnd.emit({ originalEvent: event, value: this.value as number });

              });
            }
          });
        }
      });
    }
  }

  unbindDragListeners() {
    if (this.dragListener) {
      this.dragListener();
      this.dragListener = null;
    }

    if (this.mouseupListener) {
      this.mouseupListener();
      this.mouseupListener = null;
    }
  }

  setValueFromHandle(event: Event, handleValue: any) {
    let newValue = this.getValueFromHandle(handleValue);

    if (this.range) {
      if (this.step) {
        this.handleStepChange(newValue, (this.values as any)[this.handleIndex]);
      } else {
        this.handleValues[this.handleIndex] = handleValue;
        this.updateValue(newValue, event);
      }
    } else {
      if (this.step) {
        this.handleStepChange(newValue, this.value as any);
      } else {
        this.handleValue = handleValue;
        this.updateValue(newValue, event);
      }
    }

    this.cd.markForCheck();
  }

  handleStepChange(newValue: number, oldValue: number) {
    let diff = newValue - oldValue;
    let val = oldValue;
    let _step = this.step as number;

    if (diff < 0) {
      val = oldValue + Math.ceil(newValue / _step - oldValue / _step) * _step;
    } else if (diff > 0) {
      val = oldValue + Math.floor(newValue / _step - oldValue / _step) * _step;
    }

    this.updateValue(val);
    this.updateHandleValue();
  }

  get rangeStartLeft() {
    return this.handleValues[0] > 100 ? 100 + '%' : this.handleValues[0] + '%';
  }

  get rangeEndLeft() {
    return this.handleValues[1] + '%';
  }

  updateDomData(): void {
    let rect = this.el.nativeElement.children[0].getBoundingClientRect();
    this.initX = rect.left + (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0)
    this.initY = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
    this.barWidth = this.el.nativeElement.children[0].offsetWidth;
    this.barHeight = this.el.nativeElement.children[0].offsetHeight;
  }

  calculateHandleValue(event: Event): number {
    return (((event as MouseEvent).pageX - (this.initX as number)) * 100) / (this.barWidth as number);
  }

  updateHandleValue(): void {
    if (this.range) {
      this.handleValues[0] = (((this.values as number[])[0] < this.min ? 0 : (this.values as number[])[0] - this.min) * 100) / (this.max - this.min);
      this.handleValues[1] = (((this.values as number[])[1] > this.max ? 100 : (this.values as number[])[1] - this.min) * 100) / (this.max - this.min);
    } else {
      if ((this.value as number) < this.min) this.handleValue = 0;
      else if ((this.value as number) > this.max) this.handleValue = 100;
      else this.handleValue = (((this.value as number) - this.min) * 100) / (this.max - this.min);
    }

    if (this.step) {
      this.updateDiffAndOffset();
    }
  }

  updateDiffAndOffset(): void {
    this.diff = this.getDiff();
    this.offset = this.getOffset();
  }

  getDiff(): number {
    return Math.abs(this.handleValues[0] - this.handleValues[1]);
  }

  getOffset(): number {
    return Math.min(this.handleValues[0], this.handleValues[1]);
  }

  updateValue(val: number, event?: Event): void {
    if (this.range) {
      let value = val;

      if (this.handleIndex == 0) {
        if (value < this.min) {
          value = this.min;
          this.handleValues[0] = 0;
        } else if (value > (this.values as number[])[1]) {
          if (value > this.max) {
            value = this.max;
            this.handleValues[0] = 100;
          }
        }
        this.sliderHandleStart?.nativeElement.focus();
      } else {
        if (value > this.max) {
          value = this.max;
          this.handleValues[1] = 100;
          this.offset = this.handleValues[1];
        } else if (value < this.min) {
          value = this.min;
          this.handleValues[1] = 0;
        } else if (value < (this.values as number[])[0]) {
          this.offset = this.handleValues[1];
        }
        this.sliderHandleEnd?.nativeElement.focus();
      }

      if (this.step) {
        this.updateHandleValue();
      } else {
        this.updateDiffAndOffset();
      }

      (this.values as number[])[this.handleIndex] = this.getNormalizedValue(value);
      let newValues = [this.minVal, this.maxVal];
      this.onChangeCallback(newValues);
      this.onChange.emit({ event: event as Event, values: this.values as number[] });
    } else {
      if (val < this.min) {
        val = this.min;
        this.handleValue = 0;
      } else if (val > this.max) {
        val = this.max;
        this.handleValue = 100;
      }

      this.value = this.getNormalizedValue(val);

      this.onChangeCallback(this.value);
      this.onChange.emit({ event: event as Event, value: this.value });
      this.sliderHandle?.nativeElement.focus();
    }
    this.updateHandleValue();
  }

  getValueFromHandle(handleValue: number): number {
    return (this.max - this.min) * (handleValue / 100) + this.min;
  }

  getDecimalsCount(value: number): number {
    if (value && Math.floor(value) !== value) return value.toString().split('.')[1].length || 0;
    return 0;
  }

  getNormalizedValue(val: number): number {
    let decimalsCount = this.getDecimalsCount(this.step as number);
    if (decimalsCount > 0) {
      return +parseFloat(val.toString()).toFixed(decimalsCount);
    } else {
      return Math.floor(val);
    }
  }

  ngOnDestroy() {
    this.unbindDragListeners();
  }

  get minVal() {
    return Math.min((this.values as number[])[1], (this.values as number[])[0]);
  }
  get maxVal() {
    return Math.max((this.values as number[])[1], (this.values as number[])[0]);
  }

}
