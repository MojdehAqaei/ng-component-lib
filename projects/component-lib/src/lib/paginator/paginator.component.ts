import {Attribute, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClSelectItem} from "@sadad/component-lib/src/models";
import {ClSelectComponent} from "@sadad/component-lib/src/lib/select";
import {FormsModule} from "@angular/forms";
import {ClSharedService} from "@sadad/component-lib/src/services";

const INITIAL_VALUE: { [key: string]: any } = {
  totalRecords: 0,
  rows: 10,
  first: 0,
  pageLinkSize: 5,
  rowsPerPageOptions: [10, 30, 50],
};

@Component({
  selector: 'cl-paginator',
  standalone: true,
  imports: [CommonModule, ClSelectComponent, FormsModule],
  templateUrl: './paginator.component.html',
})
export class ClPaginatorComponent implements OnInit, OnChanges {


  @Input() totalRecords: number = 0;
  @Input() rows: number = 10;
  @Input() first: number = 0;
  @Input() pageLinkSize: number = 5;
  @Input() rowsPerPageOptions: number[] = [10, 30, 50];
  @Input() alwaysShow: boolean = false;
  @Input() showRowSelection: boolean = false;
  @Output() onPageChange = new EventEmitter<{ rows: number, first: number, page: number }>();
  mappedRowPerPageOptions: ClSelectItem[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  pageLinks: number[] = [];

  constructor(@Attribute('styleClasses') public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.showRowSelection && this.rowsPerPageOptions?.length) {
      this.mappedRowPerPageOptions = this.mapToSelectItem();
    }
    this.showPages();
  }

  mapToSelectItem(): ClSelectItem[] {
    return this.rowsPerPageOptions.map(x => {
      return {label: x.toString(), value: x}
    })
  }


  showPages() {
    if (this.totalRecords && this.rows && this.pageLinkSize) {
      this.totalPages = Math.floor(this.totalRecords / this.rows) + (this.totalRecords % this.rows ? 1 : 0);
      const pageLinkSizeTemp = this.totalPages > this.pageLinkSize ? this.pageLinkSize : this.totalPages;
      this.currentPage = this.first < this.rows ? 1 : Math.floor(this.first / this.rows) + 1;
      this.pageLinks = this.setPageLinks(pageLinkSizeTemp >= this.currentPage ? 1 : this.currentPage + pageLinkSizeTemp - 1 <= this.totalPages ? this.currentPage : this.totalPages - pageLinkSizeTemp + 1);
      this.first = (this.currentPage - 1) * this.rows;
    }
  }

  setPageLinks(firstPage: number = 1) {
    const temp = [];
    for (let i = 0; i < (this.totalPages > this.pageLinkSize ? this.pageLinkSize : this.totalPages); i++) {
      temp.push(firstPage++);
    }
    return temp;
  }

  changeRows(event: number) {
    this.rows = event || 10;
    this.showPages();
    this.onPageChange.emit({rows: this.rows, first: this.first, page: this.currentPage});

  }


  changePage(action: 'first' | 'prev' | 'next' | 'last' | 'page', value: number = 1) {
    if (action == 'prev') {
      this.pageLinks = this.pageLinks.map(x => x - 1);
      this.currentPage--;
    } else if (action == 'next') {
      this.pageLinks = this.pageLinks.map(x => x + 1);
      this.currentPage++;
    } else if (action == 'first') {
      this.pageLinks = this.setPageLinks();
      this.currentPage = 1;
    } else if (action == 'last') {
      this.pageLinks = this.setPageLinks(this.totalPages - this.pageLinks.length + 1);
      this.currentPage = this.totalPages;
    } else if (action == 'page') {
      this.currentPage = value;
    }
    this.first = (this.currentPage - 1) * this.rows;
    this.onPageChange.emit({rows: this.rows, first: this.first, page: this.currentPage});
  }
}
