export interface ClMenuItem {
  label?: string;
  value?: string;
  icon?: string;
  items?: ClMenuItem[];
  routerLink?: any;
  command?: (event?: any) => void;
  iconClass?: string;
  expanded?: boolean;
}
