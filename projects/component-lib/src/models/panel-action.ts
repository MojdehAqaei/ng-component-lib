import { ClButtonType } from '@sadad/component-lib/src/enums';

export interface ClPanelAction {
  loading?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  icon?: string;
  label?: string;
  styleClass?: string;
  type?: ClButtonType;
  size?: 'sm' | 'lg';
  iconPosition: 'left' | 'right'
  command?:(event?: any)=> void;
}
