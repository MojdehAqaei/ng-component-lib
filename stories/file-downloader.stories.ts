import {applicationConfig, Meta, StoryFn} from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { ClFileDownloaderComponent } from "@sadad/component-lib/src/lib/file-downloader";
import { ClSplitButtonComponent } from "@sadad/component-lib/src/lib/split-button";
import { HttpClientModule } from "@angular/common/http";
import { ClAlertMessagesComponent } from "@sadad/component-lib/src/lib/alert-message";
import {importProvidersFrom} from "@angular/core";

export default {
  title: "Components/File/FileDownloader",
  component: ClFileDownloaderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ClSplitButtonComponent,
        ClAlertMessagesComponent,
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(HttpClientModule)
      ]
    })
  ],
  args: {
    label: "فایل تست",
  },
} as Meta;

const Template: StoryFn<ClFileDownloaderComponent> = (
  args,
) => ({
  props: {
    icon: args.icon,
    label: args.label,
    type: args.type,
    outlined: args.outlined,
    downloadMethod: args.downloadMethod,
    deleteSuccessMessage: args.deleteSuccessMessage,
    deleteErrorMessage: args.deleteErrorMessage,
    downloadEndpoint: args.downloadEndpoint,
    downloadParams: args.downloadParams,
    deleteMethod: args.deleteMethod,
    //downloadSuccessMessage: args.downloadSuccessMessage,
    downloadErrorMessage: args.downloadErrorMessage,
    deleteEndpoint: args.deleteEndpoint,
    deleteParams: args.deleteParams,
    deleteAble: args.deleteAble,
    messageHideDelay: args.messageLifeTime,
  },
  template: `<cl-file-downloader
                   [icon]="icon"
                   [label]="label"
                   [type]="type"
                   [deleteSuccessMessage]="deleteSuccessMessage"
                   [deleteErrorMessage]="deleteErrorMessage"
                   [downloadEndpoint]="downloadEndpoint"
                   [downloadParams]="downloadParams"
                   [downloadErrorMessage]="downloadErrorMessage"
                   [deleteEndpoint]="deleteEndpoint"
                   [deleteParams]="deleteParams"
                   [deleteAble]="deleteAble"
                   [messageLifeTime]="messageHideDelay"
 ></cl-file-downloader>`,
});

export const Default = {
  render: Template,
};

export const ByIcon = {
  render: Template,

  args: {
    icon: "content_paste",
  },
};

export const SetType = {
  render: Template,

  args: {
    type: "help",
  },
};

export const OutLined = {
  render: Template,

  args: {
    outlined: true,
  },
};

export const DeleteAble = {
  render: Template,

  args: {
    deleteAble: false,
  },
};

export const MessageHideDelay = {
  render: Template,

  args: {
    messageLifeTime: 4000,
  },
};

export const CustomDeleteRequest = {
  render: Template,

  args: {
    deleteSuccessMessage: "حذف شد",
    deleteErrorMessage: " خطا در حذف ",
    deleteParams: { id: "125" },
    deleteEndpoint: "https://jsonplaceholder.typicode.com/todos/1",
  },
};

export const UnFormattedFileResource = {
  render: Template,

  args: {
    deleteSuccessMessage: "حذف شد",
    deleteErrorMessage: " خطا در حذف ",
    deleteParams: { id: "125" },
    downloadEndpoint: "https://jsonplaceholder.typicode.com/todos/1",
  },
};

export const CustomDownloadRequest = {
  render: Template,

  args: {
    //downloadSuccessMessage: 'دانلود شد',
    downloadErrorMessage: " خطا در  دانلود",
    downloadParams: { fileId: "0x0x0x125" },
    downloadEndpoint: "data/file-download.json",
  },
};
