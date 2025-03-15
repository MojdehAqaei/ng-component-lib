import { ClMessageType } from '@sadad/component-lib/src/enums';

export interface ClTreeNode<T> {
  data: T;
  label?: string;
  icon?: string;
  badgeLabel?: string;
  badgeType?: ClMessageType;
  children?: ClTreeNode<T>[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: ClTreeNode<T>;
  partialSelected?: boolean;
  allChildrenSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  key?: string;
}
