export interface ClConfirmation {
  message?: string;
  icon?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptStyleClasses?: string;
  rejectStyleClasses?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  closable?: boolean;
  baseZIndex?: number;

}
