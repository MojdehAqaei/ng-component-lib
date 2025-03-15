import {Directive, Input, TemplateRef} from "@angular/core";

@Directive({
  selector: '[clTemplate]',
  standalone: true
})
export class ClTemplateDirective {

  constructor(public readonly template: TemplateRef<any>) { }

  @Input('clTemplate') name!: string;
}
