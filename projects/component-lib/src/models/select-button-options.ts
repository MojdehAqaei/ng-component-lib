import { SafeHtml } from '@angular/platform-browser';

export interface ClSelectButtonOption {
  content?: string | SafeHtml;
  value?: any;
  action?: (option: ClSelectButtonOption) => void;
  selected?: boolean;
}
