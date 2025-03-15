import {ClColumnStatus} from "./column-status";
import {ClButtonType} from "@sadad/component-lib/src/enums";

export interface ClAction {
  type?: 'icon' | 'text' | 'avatar' | 'button';
  label?: string;
  icon?: string;
  image?: string;
  index?: any;
  tooltip?: string;
  loading?: boolean;
  iconClass?: string;
  position?:'start' | 'end';
  status?: ClColumnStatus,
  disabled?: boolean;
  buttonType?: ClButtonType;
  styleClasses?: string;
  key?: any;
  command?: (event?: any) => void;
}
