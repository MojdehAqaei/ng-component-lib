import {ClFormControlType} from "@sadad/component-lib/src/enums";
import {ClSelectItem} from "./select-item";


export interface ClColumnFilter {
  controlType: ClFormControlType;
  operator: 'contain' | 'startWith' | 'endWith' | 'equal',
  placeholder?: string;
  options?: ClSelectItem[];
}
