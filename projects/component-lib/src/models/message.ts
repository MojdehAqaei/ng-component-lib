import {ClMessageType} from "@sadad/component-lib/src/enums";
import {SafeHtml} from "@angular/platform-browser";

export interface ClMessage {
  id?: number;
  type?: ClMessageType;
  icon?: string;
  detail?: string | SafeHtml;
  summary?: string | SafeHtml;
  closeable?: boolean;
  lifeTime?: number;
  styleClasses?: string;
}
