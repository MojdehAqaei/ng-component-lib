import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ChangeDetectorRef,
  OnInit,
  ElementRef, Renderer2, HostListener, Inject, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ClTemplateDirective } from "@sadad/component-lib/src/lib/template";
import { ClSelectComponent } from "@sadad/component-lib/src/lib/select";
import { ClButtonComponent } from "@sadad/component-lib/src/lib/button";
import { ColorPickerComponent } from "@sadad/component-lib/src/lib/color-picker";
import { ClDividerComponent } from "@sadad/component-lib/src/lib/divider";
import { ClSelectItem } from "@sadad/component-lib/src/models";
import { ClDialogComponent } from "@sadad/component-lib/src/lib/dialog";
import { ClInputTextComponent } from "@sadad/component-lib/src/lib/input-text";
import { ClEditorToolbarStatus } from "@sadad/component-lib/src/models";
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'cl-rich-text-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ClSelectComponent, ClButtonComponent, ColorPickerComponent, ClDividerComponent,
    ScrollingModule,ClDialogComponent, ClInputTextComponent],
  templateUrl: './rich-text-editor.component.html',
  providers: [Document]
})
export class ClRichTextEditorComponent implements OnInit{
  @Input() styleClasses?: string;
  @Input() disabled?: boolean = false;

  @ContentChildren(ClTemplateDirective) templates!: QueryList<ClTemplateDirective>;
  @ViewChild('cl_editor_content') cl_editor_content: ElementRef<any> | undefined;
  @ViewChild('cl_editor') cl_editor: ElementRef<any> | undefined;
  headerTemplate?: TemplateRef<any>;

  headingList: ClSelectItem[] = [];
  fontSizeList: ClSelectItem[] = [];
  fontTypeList: ClSelectItem[] = [];
  heading: string = 'p';
  fontType: string = 'sans-serif';
  containerHeight: number = 318;
  selection?: Range;
  showDialog: boolean = false;
  linkText: string = '';
  toolbarStatus: ClEditorToolbarStatus = {};

  constructor(private _cdRef: ChangeDetectorRef,
              private _document: Document,
              public _elRef: ElementRef,
              private _render: Renderer2){}

  ngOnInit() {
    this.headingList = [{label: 'paragraph', value: 'p'},{label: 'Heading1', value: 'h1'},{label: 'Heading2', value: 'h2'},{label: 'Heading3', value: 'h3'}, {label: 'Heading4', value: 'h4'}, {label: 'Heading5', value: 'h5'}, {label: 'Heading6', value: 'h6'}];
    this.fontTypeList = [{label: 'Sans Serif', value: 'sans-serif'},{label: 'Serif', value: 'serif'},{label: 'Monospace', value: 'monospace'}];
    this.resetToolbar();
  }

  ngAfterViewInit() {
    if (this.templates?.length) {
      this.templates.forEach(templateDir => {
        if (templateDir.template) {
          if (templateDir.name == 'header') {
            this.headerTemplate = templateDir.template;
          }
        }
      })
    }
    this._cdRef.detectChanges();
    this.cl_editor?.nativeElement.firstChild.focus();
  }

  @HostListener('document:click', ['$event'])
  onClick(event:any) {
     this.resetToolbar();

    //check whether clicked position is in editor content
    //if clicked position is in editor content part and selection is happened
    if(this._elRef.nativeElement.contains(this.cl_editor_content?.nativeElement) && this.selection ){

      //get element that selected
      let selectedElement  =  this.selection.commonAncestorContainer as HTMLElement;

       //check if element that selected is a text get its parent as element that selected
      if(selectedElement.nodeType !== Node.ELEMENT_NODE){
        selectedElement = selectedElement.parentElement as HTMLElement;
      }

      this.checkStatus(selectedElement);
    }
  }

  checkStatus(node: HTMLElement){
     if(node){
      this.checkNode(node);
      const editor = document.getElementsByClassName('cl-editor');
      const parent = node.parentElement as HTMLElement;

      if(editor[0] !== parent){
        this.checkStatus(parent);
      }
    }

  }

  checkNode(node: HTMLElement){
    const tag = node?.localName;
    const classes = node.getAttribute('class');
    const styles = node.getAttribute('style');
    switch (tag){
      case  'strong':{
        this.toolbarStatus.bold = true;
        break;
      }
      case  'em':{
        this.toolbarStatus.italic = true;
        break;
      }
      case  'u':{
        this.toolbarStatus.underline = true;
        break;
      }
      case  'li':{
        const parent = node.parentNode as HTMLElement;
        this.toolbarStatus.unOrderList = parent.localName === 'ul';
        this.toolbarStatus.orderList = parent.localName === 'ol';
        break;
      }
      case 'a':{
        this.toolbarStatus.link = true;
        break;
      }
      case 'img':{
        this.toolbarStatus.image = true;
        break;
      }
      case 'p':{
        this.heading = tag;
        break;
      }
      case 'h1':case 'h2':case 'h3':case 'h4':case 'h5':case 'h6':{
        this.heading = tag;
        this.toolbarStatus.heading = true;
        break;
      }
    }

    if(classes){
      switch (classes){
        case  'cl-align-center':{
          this.toolbarStatus.alignCenter = true;
          break;
        }
        case  'cl-align-left':{
          this.toolbarStatus.alignLeft = true;
          break;
        }
        case  'cl-align-right':{
          this.toolbarStatus.alignRight = true;
          break;
        }
        case  'cl-align-justify':{
          this.toolbarStatus.alignJustify = true;
          break;
        }
        case 'cl-font-monospace':{
          this.fontType = 'monospace';
          this.toolbarStatus.fontType = true;
          break;
        }
        case 'cl-font-serif':{
          this.fontType = 'serif';
          this.toolbarStatus.fontType = true;
          break;
        }
        default:{
          this.fontType = 'sans-serif';
          break;
        }
      }
    }

    if(styles){
      switch (true){
        case  (styles.includes('color')):{
          this.toolbarStatus.fontColor = true;
          break;
        }
        case  (styles.includes('background')):{
          this.toolbarStatus.fontBackgroundColor = true;
          break;
        }
      }
    }
  }

  headingSelected(heading: any){
    if(this.selection){
      const element = this.selection.commonAncestorContainer;
      const newElement = document.createElement(heading);
      newElement.textContent = element.textContent;
      const parent = element?.parentElement;

      if(element.nodeType !== Node.ELEMENT_NODE){
        parent?.insertAdjacentElement("afterend", newElement);
        parent?.remove();
      }else{
        newElement.appendChild(document.createElement('br'));
        parent?.replaceChild(newElement , element);
      }
    }
  }

  fontTypeSelected(type: any){
    if(this.selection){
     const range  = this.selection.cloneRange();
     const element = this.selection.commonAncestorContainer;
     const newElement = document.createElement('span');
     newElement.classList.add(`cl-font-${type}`);

     if (element.nodeType !== Node.ELEMENT_NODE){
         range.surroundContents(newElement);
     }else{
       newElement.appendChild(range.extractContents());
       if(element.textContent == ""){
         newElement.appendChild(document.createElement('br'));
         element.removeChild(element.firstChild as Node);
       }
       range.insertNode(newElement);
     }
    }
  }

  btnClicked(tag: string){
    if(tag === 'strong'){
      this.toolbarStatus.bold = !this.toolbarStatus?.bold;
    }else if(tag === 'em'){
      this.toolbarStatus.italic = !this.toolbarStatus?.italic;
    }else if(tag === 'u'){
      this.toolbarStatus.underline = !this.toolbarStatus?.underline;
    }

    if(this.selection) {
      const range  = this.selection.cloneRange();
      const element  = this.selection.commonAncestorContainer;

      if ((tag === 'strong' && this.toolbarStatus?.bold) ||
        (tag === 'em' && this.toolbarStatus?.italic) ||
        (tag === 'u' && this.toolbarStatus?.underline)) {

        const newElement = document.createElement(tag);

        if (element.nodeType !== Node.ELEMENT_NODE){
          range.surroundContents(newElement);
        }else{
          newElement.appendChild(range.extractContents());
          if(element.textContent == ""){
            newElement.appendChild(document.createElement('br'));
          }
          range.insertNode(newElement);
        }
      }else if((tag === 'strong' && !this.toolbarStatus?.bold) ||
        (tag === 'em' && !this.toolbarStatus?.italic) ||
        (tag === 'u' && !this.toolbarStatus?.underline)){

         const str = range.toString();
         const childNodes = element?.textContent?.split(str);
         console.log(childNodes);

        }
    }
  }

   colorSelected(color: string){
    this.toolbarStatus.fontColor = true;

    if(this.selection){
      if(this.toolbarStatus.fontColor){
        const style = `
          color: ${color};`;
        const range  = this.selection.cloneRange();
        const element  = this.selection.commonAncestorContainer;
        const newElement = document.createElement('span');
        newElement.setAttribute('style', style);

        if (element.nodeType !== Node.ELEMENT_NODE){
          range.surroundContents(newElement);
         }else{
          newElement.appendChild(range.extractContents());
          if(element.textContent == ""){
            newElement.appendChild(document.createElement('br'));
          }
          range.insertNode(newElement);
        }
      }
    }
  }

  backColorSelected(color: string){
    this.toolbarStatus.fontBackgroundColor = true;

    if(this.selection){
      if(this.toolbarStatus.fontBackgroundColor){
        const style = `
        background: ${color};`;

        const range  = this.selection.cloneRange();
        const element  = this.selection.commonAncestorContainer;

        const newElement = document.createElement('span');
        newElement.setAttribute('style', style);

        if (element.nodeType !== Node.ELEMENT_NODE){
          range.surroundContents(newElement);
        }else {
          newElement.appendChild(range.extractContents());
          if(element.textContent == ""){
            newElement.appendChild(document.createElement('br'));
          }
          range.insertNode(newElement);
        }
      }
    }
  }

  ulClicked(){
    this.toolbarStatus.unOrderList = true;
    this.toolbarStatus.orderList = false;
    if(this.selection){
      const element  = this.selection.commonAncestorContainer;

      let parent = element.parentElement;

      const  list = document.createElement('li');
      list.innerHTML = parent!.innerHTML;

      const newElm = document.createElement('ul');
      newElm.appendChild(list);
      if (element.nodeType !== Node.ELEMENT_NODE){
        const next = parent?.nextSibling;
        const pre = parent?.previousSibling;
        if(next?.nodeName !== 'UL' && pre?.nodeName !== 'UL'){
          parent?.insertAdjacentElement("afterend", newElm);
        }else if(next?.nodeName === 'UL'){
          next.insertBefore(list, next.firstChild);
        }else if(pre?.nodeName === 'UL'){
          pre?.appendChild(list);
        }
        parent?.remove();
      }else {
        const next = element?.nextSibling;
        const pre = element?.previousSibling;
        if(next?.nodeName !== 'UL' && pre?.nodeName !== 'UL'){
          parent?.replaceChild(newElm, element);
        }else if(next?.nodeName === 'UL'){
          next.insertBefore(list, next.firstChild);
          parent?.removeChild(element);
        }else if(pre?.nodeName === 'UL'){
          pre?.appendChild(list);
          parent?.removeChild(element);
        }
      }
    }
  }

  olClicked(){
    this.toolbarStatus.orderList = true;
    this.toolbarStatus.unOrderList = false;
    if(this.selection){
      const element  = this.selection.commonAncestorContainer;

      let parent = element.parentElement;

      const  list = document.createElement('li');
      list.innerHTML = parent!.innerHTML;

      const newElm = document.createElement('ol');
      newElm.appendChild(list);

      if (element.nodeType !== Node.ELEMENT_NODE){
        const next = parent?.nextSibling;
        const pre = parent?.previousSibling;
        if(next?.nodeName !== 'OL' && pre?.nodeName !== 'OL'){
          parent?.insertAdjacentElement("afterend", newElm);
        }else if(next?.nodeName === 'OL'){
          next.insertBefore(list, next.firstChild);
        }else if(pre?.nodeName === 'OL'){
          pre?.appendChild(list);
        }
        parent?.remove();
      }else {
        const next = element?.nextSibling;
        const pre = element?.previousSibling;
        if(next?.nodeName !== 'OL' && pre?.nodeName !== 'OL'){
          parent?.replaceChild(newElm, element);
        }else if(next?.nodeName === 'OL'){
          next.insertBefore(list, next.firstChild);
          parent?.removeChild(element);
        }else if(pre?.nodeName === 'OL'){
          pre?.appendChild(list);
          parent?.removeChild(element);
        }
      }
    }
  }

  alignClicked(alignment: string) {
    this.toolbarStatus = {
      alignCenter: false,
      alignRight: false,
      alignLeft: false,
      alignJustify: false,
    }

    if (this.selection) {
      const element = this.selection.commonAncestorContainer;

      if (element.nodeType !== Node.ELEMENT_NODE) {
        const parent = element?.parentElement;
        parent?.classList.remove('cl-align-left','cl-align-right','cl-align-center','cl-align-justify');
        parent?.classList.add(`cl-align-${alignment}`);
      } else {
        let htmlElem = element as HTMLElement;
        htmlElem?.classList.remove('cl-align-left','cl-align-right','cl-align-center','cl-align-justify');
        htmlElem.classList.add(`cl-align-${alignment}`);
      }

      switch (alignment){
        case  'center':{
          this.toolbarStatus.alignCenter = true;
          break;
        }
        case  'left':{
          this.toolbarStatus.alignLeft = true;
          break;
        }
        case  'right':{
          this.toolbarStatus.alignRight = true;
          break;
        }
        case  'justify':{
          this.toolbarStatus.alignJustify = true;
          break;
        }

      }
    }
  }

  addLink(){
    this.toolbarStatus.link = true;
    this.showDialog = false;
    if(this.selection){
      const range = this.selection.cloneRange();
      const element = this.selection.commonAncestorContainer;
      const newElement = document.createElement('a');
      newElement.setAttribute('contenteditable', 'false');
      newElement.setAttribute('target', '_blank');

      if (element.nodeType !== Node.ELEMENT_NODE){
        if(this.selection.toString() !== ''){
          newElement.setAttribute('href', this.selection.toString());
          range.surroundContents(newElement);
        }else{
          newElement.setAttribute('href', this.linkText);
          range.surroundContents(newElement);
          newElement.textContent = this.linkText;
        }
      }else{
        newElement.setAttribute('href', this.linkText);
        newElement.textContent = this.linkText;
        element?.appendChild(newElement);
      }

    }

    this.linkText = '';

  }

  addImage(event: any): void {
    this.toolbarStatus.image = true;
    if(this.selection){
      this.readImageUrl(event).then((url: any) => {

        if(url){
          const range = this.selection?.cloneRange();
          const newElement = document.createElement('img');
          const style = `
          z-index: 1000;
          position: relative;`;

          newElement.setAttribute('style', style);
          newElement.setAttribute('src', url);
          range?.surroundContents(newElement);
        }
      });
    }

  }

  async readImageUrl(event: any){

    let result= await new Promise((resolve) =>{
      if (event?.target?.files && event?.target.files[0]) {
        const file = event.target?.files[0];
        const reader = new FileReader();
        reader.onload = (e) => resolve(reader.result) ;
        reader.readAsDataURL(file);
      }
    });

    return result;
  }

  getSelectedText(){
    this.selection =  window.getSelection()?.getRangeAt(0);
  }

  resetToolbar(){
    this.toolbarStatus = {
      heading: false,
      fontType: false,
      bold: false,
      italic: false,
      underline: false,
      fontColor: false,
      fontBackgroundColor: false,
      unOrderList: false,
      orderList: false,
      alignLeft: false,
      alignRight: false,
      alignCenter: false,
      alignJustify: false,
      link: false,
      image: false,
    }
  }

 }
