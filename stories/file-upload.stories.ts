import { StoryObj, Meta, applicationConfig } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ClFileUploadComponent } from '@sadad/component-lib/src/lib/file-uploader';
import { ClFileDownloaderComponent } from '@sadad/component-lib/src/lib/file-downloader';
import { ClSplitButtonComponent } from '@sadad/component-lib/src/lib/split-button';
import {
  HttpClientModule,
  HttpContext,
  HttpParams,
} from '@angular/common/http';
import { ClAlertMessagesComponent } from '@sadad/component-lib/src/lib/alert-message';
import { ClLoadingComponent } from '@sadad/component-lib/src/lib/loading';
import { ClLoadingService } from '@sadad/component-lib/src/services';
import { ClHttpMethod } from '@sadad/component-lib/src/enums';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { SKIP_LOADING, LOAD_MODE } from '@sadad/component-lib/src/interceptors';
import {action} from "@storybook/addon-actions";

export default {
  title: 'Components/File/FileUpload',
  component: ClFileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClSplitButtonComponent,
        ClAlertMessagesComponent,
        ClFileDownloaderComponent,
        ClLoadingComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [ClLoadingService],
    }),
    applicationConfig({
      providers: [importProvidersFrom(HttpClientModule)],
    }),
  ],
  args: {
    method: ClHttpMethod.GET,
    body: { id: 121, code: 154 },
    url: 'data/file-upload.json',
    httpParams: new HttpParams(),
    httpContext: new HttpContext()
      .set(SKIP_LOADING, true)
      .set(LOAD_MODE, 'indeterminate'),
    fileDeleteUrl: 'https://jsonplaceholder.ir/users/1',
    fileDownloadUrl: 'data/file-download.json/',
  },
} as Meta;

export const Default: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      url: args.url,
      method: args.method,
      body: args.body,
      httpParams: args.httpParams,
      httpContext: args.httpContext,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
    },
    template: `<cl-file-uploader
                     [url]="url"
                     [method]="method"
                     [httpParams]="httpParams"
                     [httpContext]="httpContext"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"
   ></cl-file-uploader>`,
  }),
};

export const SetDefaultValue: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      url: args.url,
      method: args.method,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
      files: args.files,
    },
    template: `<cl-file-uploader
                     [files]="files"
                     [url]="url"
                     [method]="method"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"
   ></cl-file-uploader>`,
  }),

  args: {
    files: [
      { id: '1', name: 'فایل مصوبه' },
      { id: '2', name: 'فایل کروکی ' },
    ],
  },
};

export const AutoUploadFalse: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      url: args.url,
      method: args.method,
      auto: args.auto,
      chooseLabel: args.chooseLabel,
      uploadLabel: args.uploadLabel,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
      accept: args.accept,
      maxFileSize: args.maxFileSize,
      fileLimit: args.fileLimit,
    },
    template: `<cl-file-uploader
                     [url]="url"
                     [method]="method"
                     [auto]="auto"
                     [accept]="accept"
                     [maxFileSize]="maxFileSize"
                     [fileLimit]="fileLimit"
                     [chooseLabel]="chooseLabel"
                     [uploadLabel]="uploadLabel"
                     [fileDownloadUrl]="fileDownloadUrl"
   ></cl-file-uploader>`,
  }),

  args: {
    auto: false,
    chooseLabel: 'انتخاب فایل',
    uploadLabel: 'بارگذاری فایل',
    accept: '.pdf,.doc,.docx,.xlsx, image/jpeg,image/jpg, image/png',
    maxFileSize: 5000000,
    fileLimit: 2,
  },
};

const upload = (value: any) => {
  action("custom upload")();
};

export const customUpload: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      auto: args.auto,
      customUpload: args.customUpload,
      upload
    },
    template: `<cl-file-uploader [auto]="auto"
                                 [customUpload]="customUpload"
                                 (customUploadHandler)="upload()"/>`,
  }),

  args: {
    auto: false,
    customUpload: true
  },
};

export const AcceptFormat: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      url: args.url,
      method: args.method,
      accept: args.accept,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
    },
    template: `<cl-file-uploader
                     [url]="url"
                     [method]="method"
                     [accept]="accept"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"
   ></cl-file-uploader>`,
  }),

  args: {
    accept: 'image/png,image/jpeg,image/jpg,image/tiff',
  },
};

export const MaxFileSize: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      url: args.url,
      method: args.method,
      maxFileSize: args.maxFileSize,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
    },
    template: `<cl-file-uploader
                     [url]="url"
                     [method]="method"
                     [maxFileSize]="maxFileSize"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"
   ></cl-file-uploader>`,
  }),

  args: {
    maxFileSize: 1000,
  },
};

export const FileLimit: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      url: args.url,
      method: args.method,
      fileLimit: args.fileLimit,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
    },
    template: `<cl-file-uploader
                     [url]="url"
                     [method]="method"
                     [fileLimit]="fileLimit"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"
   ></cl-file-uploader>`,
  }),

  args: {
    fileLimit: 1,
  },
};

export const WithNgModel: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      temp: null,
      url: args.url,
      method: args.method,
      fileDownloadUrl: args.fileDownloadUrl,
      fileDeleteUrl: args.fileDeleteUrl,
    },
    template: `
        <cl-file-uploader   [(ngModel)]="temp"
                     [url]="url"
                     [method]="method"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"/>
       <div style="margin-top: 20px">
            <p>مقدار برگشتی  :</p>
            <p style="white-space: pre; direction: ltr;background-color: #1b1b24;color: white;">{{temp |  json}}</p>
      </div>`,
  }),
};

export const Disabled: StoryObj<ClFileUploadComponent> = {
  render: (args) => ({
    props: {
      fileDownloadUrl: args.fileDownloadUrl,
      disabled: true,
      files: [
        { id: '1', name: 'فایل مصوبه' },
        { id: '2', name: 'فایل کروکی ' },
      ],
    },
    template: `
        <cl-file-uploader
                     [files]="files"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [disabled]="disabled"
       ></cl-file-uploader>
       <div style="margin-top: 20px">
            <p>مقدار برگشتی  :</p>
            <p style="white-space: pre; direction: ltr;background-color: #1b1b24;color: white;">{{temp |  json}}</p>
      </div>`,
  }),
};

export const WithFormControl: StoryObj<ClFileUploadComponent> = {
  render: (args) => {
    let formGroup = new FormBuilder().group({
      files: new FormControl(null),
    });

    const getDateString = (date: any) => {
      return JSON.stringify(date);
    };

    return {
      component: ClFileUploadComponent,
      props: {
        url: args.url,
        method: args.method,
        fileDownloadUrl: args.fileDownloadUrl,
        fileDeleteUrl: args.fileDeleteUrl,
        group: formGroup,
        controlName: 'files',
        getDateString,
      },
      template: `
        <form [formGroup]="group">
        <cl-file-uploader
                     [url]="url"
                     [method]="method"
                     [fileDownloadUrl]="fileDownloadUrl"
                     [fileDeleteUrl]="fileDeleteUrl"
                     [formControlName]="controlName"
        ></cl-file-uploader>

        </form>

        <div style="margin-top: 20px">
          <p>مقدار برگشتی  :</p>
          <p style="white-space: pre; direction:ltr">
           {{getDateString(group.value)}}</p>
        </div>
      `,
    };
  },
};
