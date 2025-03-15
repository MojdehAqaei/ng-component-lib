import {AfterViewInit, Directive, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[clIsInViewport]',
  standalone: true
})
export class ClIsInViewportDirective implements AfterViewInit {

  @Output('onView') onView = new EventEmitter<boolean>();

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const observedElement = this.el.nativeElement;

    const observer = new IntersectionObserver(([entry]) => {
      this.renderContents(entry.isIntersecting);
    })
    observer.observe(observedElement)
  }

  renderContents(isIntersecting: boolean) {
    this.onView.emit(isIntersecting);
  }

}
