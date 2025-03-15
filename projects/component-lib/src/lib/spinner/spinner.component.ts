import {Attribute, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {animate, keyframes, style, trigger, transition} from '@angular/animations';
import {ClMessageService, ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  colorList: ['#16697A', '#489FB5', '#82C0CC', '#6372c3'],
  size: 'md',
};

@Component({
  selector: 'cl-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  animations: [
    trigger('changeColor', [
      transition('* <=> *', [
        animate('6s ease-in-out', keyframes([
          style({stroke: '{{color0}}', offset: 0}),
          style({stroke: '{{color1}}', offset: 0.4}),
          style({stroke: '{{color2}}', offset: 0.66}),
          style({stroke: '{{color3}}', offset: 0.8}),
          style({stroke: '{{color3}}', offset: 0.9}),
          style({stroke: '{{color0}}', offset: 1}),
        ]))])
    ])
  ]
})

export class ClSpinnerComponent implements OnInit, OnChanges {
  @Input() show: boolean = false;
  @Input() colorList: string[] = ['#16697A', '#489FB5', '#82C0CC', '#6372c3'];
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  iteration: boolean = false;

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService,
              private _messageService: ClMessageService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colorList']?.currentValue.length < 4) {
      this._sharedService.resetObjectValues(this, INITIAL_VALUE);
      this._messageService.add({type: 'error', detail: 'colorList باید شامل 4 کد زنگ باشد', closeable: true})
    }
  }

  get classes(): string {
    return `cl-spinner
      ${this.size ? `cl-spinner-${this.size}` : ''}
      ${this.styleClasses}`;
  }

}
