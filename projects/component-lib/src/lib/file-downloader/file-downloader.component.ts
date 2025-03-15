import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {tap} from "rxjs";
import {ClSplitButtonComponent} from "@sadad/component-lib/src/lib/split-button";
import {HttpClientModule} from "@angular/common/http";
import {ClAlertMessagesComponent} from '@sadad/component-lib/src/lib/alert-message';
import {ClHttpMethod} from "@sadad/component-lib/src/enums";
import {ClAction, ClConfirmation, ClFile} from "@sadad/component-lib/src/models";
import {
  ClSharedService,
  ClConfirmationService,
  ClMessageService,
  ClGenerateFileService
} from "@sadad/component-lib/src/services";
import {ClButtonType} from '@sadad/component-lib/src/enums';

const INITIAL_VALUE: { [key: string]: any } = {
  downloadMethod: ClHttpMethod.GET,
  deleteSuccessMessage: ' حذف با موفقیت انجام شد .',
  deleteErrorMessage: 'خطا در حذف فایل',
  deleteMethod: ClHttpMethod.DELETE,
  downloadErrorMessage: 'خطا در دانلود فایل',
  deleteAble: true,
  messageLifeTime:1000,
};

@Component({
  selector: 'cl-file-downloader',
  standalone: true,
  imports: [CommonModule, ClSplitButtonComponent, HttpClientModule, ClAlertMessagesComponent],
  templateUrl: './file-downloader.component.html',
})
export class ClFileDownloaderComponent implements OnInit, OnChanges {

  @Input() icon?: string;
  @Input() label: string = '';
  @Input() type?: ClButtonType;
  @Input() size?: 'sm' | 'lg';
  @Input() outlined: boolean = true;
  @Input() deleteConfirmDialogConfig?: ClConfirmation;
  @Input() downloadMethod: ClHttpMethod = INITIAL_VALUE['downloadMethod'];
  @Input() deleteSuccessMessage: string = INITIAL_VALUE['deleteSuccessMessage'];
  @Input() deleteErrorMessage: string = INITIAL_VALUE['deleteErrorMessage'];
  @Input() downloadEndpoint: string = '';
  @Input() downloadParams: any;
  @Input() deleteMethod: ClHttpMethod = INITIAL_VALUE['deleteMethod'];
  @Input() downloadErrorMessage: string = INITIAL_VALUE['downloadErrorMessage'];
  @Input() deleteEndpoint: string = '';
  @Input() deleteAble: boolean = INITIAL_VALUE['deleteAble'];
  @Input() deleteParams: any;
  @Input() messageLifeTime: number = INITIAL_VALUE['messageLifeTime'];
  items: ClAction[];


  @Output() onDelete = new EventEmitter<ClFile>();
  @Output() onDownload = new EventEmitter<ClFile>();
  @Output() onOpen = new EventEmitter<any>();

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  constructor(private _sharedService: ClSharedService,
              private _confirmationService: ClConfirmationService,
              private _generateFileService: ClGenerateFileService,
              private _messageService: ClMessageService,
              private _viewRef: ViewContainerRef,
              @Attribute('styleClasses') public styleClasses: string = '',
  ) {
    this.items = [
      {
        label: 'دانلود',
        icon: 'file_download',
        command: (event: ClAction) => this.downloadFile(event),
        iconClass: 'blue-text darken-2',
        key: 'download',
        loading: false
      },
      {
        label: 'حذف',
        icon: 'delete',
        command: (event: ClAction) => this.deleteFile(event),
        iconClass: 'red-text darken-2',
        key: 'delete',
        loading: false
      },
    ]
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['deleteAble']) {
      this.items[1].disabled = !this.deleteAble;
    }
  }

  deleteFile(event: ClAction) {
    this.onOpen.emit(event);
    this._confirmationService.confirm(this._viewRef, {
      ...this.deleteConfirmDialogConfig,
      message: 'آیا از حذف این فایل اطمینان دارید ؟',
      accept: () => {
        event.loading = true;
        this._sharedService.createHttpRequest<ClFile>(this.deleteEndpoint, this.deleteMethod, null, {
          ...this.deleteParams,
        }).subscribe({
          next: (res) => {
            this._messageService.add({
              type: 'success',
              detail: this.deleteSuccessMessage,
              lifeTime: this.messageLifeTime
            })
            this.onDelete.emit(res);
            event.loading = false;
          }, error: () => {
            this._messageService.add({type: 'error', detail: this.deleteErrorMessage, lifeTime: this.messageLifeTime})
            event.loading = false;
          }

        });
      }
    })

  }

  downloadFile(event: ClAction) {
    this.onOpen.emit(event);
    if (this.downloadEndpoint) {
      event.loading = true;
      this._sharedService.createHttpRequest<ClFile>(this.downloadEndpoint, this.downloadMethod, null, {
        ...this.downloadParams,
      }).pipe(tap((res: ClFile) => {
        if (!res || !res?.extension || !res?.base64File) {
          // throw  throwError(() => `Invalid Data Type`);
          throw new Error('Invalid Data Type');
        }
      })).subscribe({
        next: (res: ClFile) => {
          this._generateFileService.generateDownloadableFile(res);
          this.onDownload.emit(res);
          event.loading = false;
        }, error: () => {
          this._messageService.add({type: 'error', detail: this.downloadErrorMessage, lifeTime: this.messageLifeTime})
          event.loading = false;

        }

      });
    }
  }

}
