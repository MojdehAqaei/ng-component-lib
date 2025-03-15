import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'cl-image',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './image.component.html',
})
export class ClImageComponent {
  @Input() src: string= '';
  @Input() imgLink?: string;
  @Input() hasPreview: boolean = false;
  @Input() roundEdges: boolean = false;
  @Input() styleClasses: string = '';

  showPreview: boolean = false;
  zoomVal: number = 1;
  zoomInDisabled: boolean = false;
  zoomOutDisabled: boolean = false;

  previewWidth: number= 0;
  previewHeight: number= 0;

  @ViewChild('preImg') preImg: ElementRef<any> | undefined;

  onZoomIn(){
     if(this.preImg && this.zoomVal <= 2 ){
      this.zoomVal += 0.1;
      this.preImg.nativeElement.style.scale = this.zoomVal;
      this.zoomOutDisabled = false;
    }else{
      this.zoomInDisabled = true;
    }
  }

  onZoomOut(){
    if(this.preImg && this.zoomVal >= 0.5){
      this.zoomVal -= 0.1;
      this.preImg.nativeElement.style.scale = this.zoomVal;
      this.zoomInDisabled = false;
    }else{
      this.zoomOutDisabled = true;
    }
  }

  onShowPreview(image:any){
    this.zoomVal= 1;
    if(image){
      this.previewWidth = image.width;
      this.previewHeight = image.height;
    }

    this.showPreview = true;
  }

  get classes() {
    return `${this.styleClasses} ${this.hasPreview ? 'cl-image-preview-container ' : ''}`
  }

}
