import {
  Attribute,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClHttpMethod, ClButtonType } from '@sadad/component-lib/src/enums';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';
import { ClLoadingComponent } from '@sadad/component-lib/src/lib/loading';
import {
  ClSharedService,
  ClLoadingService,
  ClMessageService,
  ClGenerateFileService
} from '@sadad/component-lib/src/services';
import { ClFileDownloaderComponent } from '@sadad/component-lib/src/lib/file-downloader';
import { ClAction, ClConfirmation, ClFile, ClMessage } from '@sadad/component-lib/src/models';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpContext, HttpParams } from '@angular/common/http';
import { ClDividerComponent } from "@sadad/component-lib/src/lib/divider";

const INITIAL_VALUE: { [key: string]: any } = {
  method: ClHttpMethod.POST,
  auto: true,
  invalidFileSizeMessageDetail: ' حجم فایل بیشتر از حد مجاز است . ',
  invalidFileTypeMessageDetail: ' نوع فایل نامعتبر است . ',
  fileBtnType: 'info',
  chooseLabel: 'انتخاب فایل',
  uploadLabel: 'بارگذاری',
};

@Component({
  selector: 'cl-file-uploader',
  standalone: true,
  imports: [
    CommonModule,
    ClButtonComponent,
    ClAlertMessagesComponent,
    ClLoadingComponent,
    ClFileDownloaderComponent,
    ClDividerComponent,
  ],
  templateUrl: './file-uploader.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClFileUploadComponent,
      multi: true,
    },
  ],
})
export class ClFileUploadComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() url?: string = '';
  @Input() method?: ClHttpMethod = ClHttpMethod.POST;
  @Input() accept?: string;
  @Input() disabled?: boolean = false;
  @Input() auto?: boolean = true;
  @Input() customUpload?: boolean
  @Input() maxFileSize?: number;
  @Input() invalidFileSizeMessageDetail?: string = ' حجم فایل بیشتر از حد مجاز است . ';
  @Input() invalidFileTypeMessageDetail?: string = ' نوع فایل نامعتبر است . ';
  @Input() fileBtnType?: ClButtonType = 'info';
  @Input() fileDownloadUrl?: string = '';
  @Input() fileDeleteUrl?: string = '';
  @Input() downloadParams?: any;
  @Input() deleteParams?: any;
  @Input() deleteConfirmDialogConfig?: ClConfirmation;
  @Input() chooseLabel?: string = 'انتخاب فایل';
  @Input() uploadLabel?: string = 'بارگذاری';
  @Input() httpParams?: HttpParams;
  @Input() httpContext?: HttpContext;
  @Input() body?: any;
  @Input() fileLimit?: number;
  @Input() files: ClFile[] = [];
  @Output() onSelect = new EventEmitter<File & { messages?: ClMessage[]}>();
  @Output() onUpload = new EventEmitter<ClFile[]>();
  @Output() onError = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<ClFile[]>();
  @Output() onDownload = new EventEmitter<ClFile>();
  @Output() onFileActionMenuOpen = new EventEmitter<{action: ClAction, row: ClFile}>();
  @Output() customUploadHandler = new EventEmitter<(File & {messages?: ClMessage[]})[]>();

  formData?: FormData;
  selectedFile: (File & {messages?: ClMessage[]})[] = [];
  selectedFileImage: SafeUrl[] = [];
  fileInputId = 'cl-file-input';

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(
    private _elRef: ElementRef,
    private _loadingService: ClLoadingService,
    private _sharedService: ClSharedService,
    private _generateFileService: ClGenerateFileService,
    private _sanitizer: DomSanitizer,
    private _messageService: ClMessageService,
    @Attribute('styleClasses') public styleClasses: string = '',
  ) {}

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disabled']) {
      this.setDisabledState(changes['disabled'].currentValue);
    }
  }

  formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 بایت';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      'بایت',
      'کیلوبایت',
      'مگابایت',
      'گیگابایت',
      'ترابایت',
      'پتابایت',
      'اگزابایت',
      'زتابایت',
      'یوتابایت',
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  onFileSelect(): void {
    const files = this._elRef.nativeElement.querySelector(
      `#${this.fileInputId}`,
    )?.files;
    const file = files?.length ? files[files?.length - 1] : null;

    this.onSelect.emit(file);
    if (file) {
      this.selectedFile.push(file);
      this.selectedFileImage.push(
        file.type.includes('image/')
          ? this._sanitizer.bypassSecurityTrustUrl(
              window.URL.createObjectURL(file),
            )
          : {},
      );

      if (this.checkFileLimit() && this.validate(file)) {
        if (this.auto) {
          this.upload();

        } else if (this.customUpload) {
          this._generateFileService.blobToBase64(this.selectedFile).then(res => {
            const tmp: ClFile[] = res?.map((e, index) => {
              return {
                base64File: e,
                name: this.selectedFile[index]?.name,
                size: this.selectedFile[index]?.size,
                extension: this._generateFileService.detectMimeType(e)
              }
            })
            this.onChange(tmp);
            this.customUploadHandler.emit(this.selectedFile);
          })
        }
      }
    }
  }

  validate(file: File): boolean {
    return this.checkFileMaxSize(file) && this.checkFileFormat(file);
  }

  upload(): void {
    this.formData = new FormData();
    this._loadingService.show('determinate');
    this.selectedFile.forEach((file, index) => {
      this.formData?.append(index ? `file_${index}` : 'file', file);
    });
    if (this.body) {
      Object.keys(this.body).forEach((key) =>
        this.formData?.append(key, this.body[key]),
      );
    }
    if (this.url && this.method && !this.customUpload) {
      this._sharedService
        .createHttpRequest<ClFile>(
          this.url,
          this.method,
          this.formData,
          this.httpParams,
          this.httpContext,
        )
        .subscribe({
          next: (res: ClFile | ClFile[]) => {
            this.selectedFile = [];
            this.selectedFileImage = [];
            if (res && (Array.isArray(res) ? res?.length : res)) {
              this.files = (this.files?.length ? this.files : []).concat(res);
            }
            this._loadingService.hide('determinate');
            this.onChange(this.files);
            this.onUpload.emit(this.files);
            this.clearInputElement();
          },
          error: (err) => {
            this.onError.emit(err);
            this._messageService.add({
              type: 'error',
              detail: 'خطا در آپلود فایل',
              closeable: true
            });
            this._loadingService.hide('determinate');
          },
        });
    } else {
      this.customUploadHandler.emit(this.selectedFile);
    }
  }

  clear(index: number): void {
    this.selectedFile?.splice(index, 1);
    this.selectedFileImage?.splice(index, 1);
    this.onChange(this.selectedFile);
    this.onClear.emit();
  }

  clearInputElement(): void {
    this._elRef.nativeElement.querySelector(`#${this.fileInputId}`).value = [];
    this.selectedFile = [];
    this.selectedFileImage = [];
  }

  remove(index: number): void {
    this.files?.splice(index, 1);
    this.onRemove.emit(this.files);
    this.onChange(this.files);
  }

  checkFileLimit(): boolean {
    return this.fileLimit && this.files?.length
      ? this.files?.length < this.fileLimit
      : true;
  }

  checkFileMaxSize(file: File & { messages?: ClMessage[]}): boolean {
    const flag = this.maxFileSize ? file.size <= this.maxFileSize : true;
    if (!flag && this.invalidFileSizeMessageDetail) {
      file.messages = (file.messages || []).concat({
        type: 'error',
        detail: this.invalidFileSizeMessageDetail,
        closeable: true,
      });
    }
    return flag;
  }

  checkFileFormat(file: File & { messages?: ClMessage[]}): boolean {
    const flag = this.accept?.length ? this.accept.includes(file.type) : true;
    if (!flag && this.invalidFileTypeMessageDetail) {
      file.messages = (file.messages || []).concat({
        type: 'error',
        detail: this.invalidFileTypeMessageDetail,
        closeable: true,
      });
    }
    return flag;
  }

  // This will write the value to the view if  the value changes occur on the model programmatically
  writeValue(value: ClFile[]) {
    this.files = value;
  }

  // When the value in the UI is changed, this method will invoke a callback function
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // When the element is touched, this method will get called
  // tslint:disable-next-line:ban-types
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
