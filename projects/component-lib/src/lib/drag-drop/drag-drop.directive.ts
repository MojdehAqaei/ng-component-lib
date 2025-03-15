import { Directive, EventEmitter, Input,  Output, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[clDragDrop]',
  standalone: true
})
export class ClDragDropDirective implements AfterViewInit {
  @Input() draggable: boolean = false;
  @Input() droppable: boolean = false;
  @Output() onDragStart = new EventEmitter<any>();
  @Output() onDragEnd = new EventEmitter<any>();
  @Output() onDrop = new EventEmitter<any>();

  dragElement: any;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(){
    if(this.draggable){
      this.el.nativeElement.setAttribute(`draggable`, true);
      this.el.nativeElement.style.cursor = "move";
      this.el.nativeElement.addEventListener('dragstart' , this.onDragStarted );
      this.el.nativeElement.addEventListener('dragend' , this.onDragEnded );
    }else if(this.droppable){
      this.el.nativeElement.addEventListener('dragover' , this.onDragOver );
      this.el.nativeElement.addEventListener('drop' , this.onDropDo );
    }
  }

  onDragStarted = (event:any) => {
    if (!event?.target?.id){
      console.error('The dragged element id is null');
      return
    }
    event.dataTransfer.setData('text', event.target.id);
    this.dragElement= event.target.id;
    this.onDragStart.emit();
  }

  onDragOver = (event:any) => {
    //check for draggable element
    event.preventDefault();
  }

  onDragEnded = (event:any) => {
    this.onDragEnd.emit();
  }

  onDropDo = (event:any) => {
    let data = event.dataTransfer.getData("text");

    if(document.getElementById(data) != null){
      event.preventDefault();
      event.target.appendChild(document.getElementById(data));
      event.dataTransfer.clearData();
      this.onDrop.emit();
    }
  }

}
