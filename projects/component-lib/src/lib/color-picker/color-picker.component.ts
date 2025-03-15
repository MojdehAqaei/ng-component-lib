import {Component, Input, Output, OnInit, EventEmitter, HostListener, ElementRef, Attribute} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClButtonComponent} from "@sadad/component-lib/src/lib/button";

@Component({
  selector: 'cl-color-picker',
  standalone: true,
  imports: [CommonModule, ClButtonComponent],
  templateUrl: './color-picker.component.html',
})
export class ColorPickerComponent implements OnInit{
  @Input() icon?: string;
  @Input() label?: string;
  @Input() styleClasses: string = '';
  @Output() onSelect = new EventEmitter<any>();

  showColorList: boolean = false;
  colorList: string[] = [];

  constructor(private _elRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this.colorList = ['#000000', '#444444', '#888888', '#bbbbbb', '#ffffff',
      '#5c0000', '#a10000', '#e60000', '#f06666','#facccc',
      '#663d00', '#b26b00', '#ff9900', '#ffc266', '#ffebcc',
      '#666600', '#b2b200', '#ffff00', '#ffff66', '#ffffcc',
      '#003700', '#006100', '#008a00', '#66b966', '#cce8cc',
      '#002966', '#0047b2', '#0066cc', '#66a3e0', '#cce0f5',
      '#3d1466', '#6b24b2', '#9933ff', '#c285ff', '#ebd6ff', ];
  }

  colorClicked(){
    this.showColorList = !this.showColorList;
  }

  @HostListener('document:click', ['$event'])
  onClick(event:any) {
    if(!this._elRef.nativeElement.contains(event.target) ){
      this.showColorList = false;
    }
  }

}
