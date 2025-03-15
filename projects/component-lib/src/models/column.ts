import {ClRequestOption} from "./request-option";
import {ClColumnFilter} from "./column-filter";
import {ClColumnDataType} from "./column-data-type";
import {ClColumnStatus} from "./column-status";
import {ClTableCellConfig} from "./table-cell-config";

export interface ClColumn {
  header: string;
  value: string[];
  type: ClColumnDataType;
  colSpan: number;
  rowSpan?: number;
  valueMapper?: any[];
  valueSeparator?: string;
  tooltip?: string;
  hidden?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: string;
  styleClasses?: string;
  requestOptions?: ClRequestOption;
  command?: (event?: any , rowIndex?:number) => void;
  sortBy?: string,
  filterSchema?: ClColumnFilter;
  sortType?: 'asc' | 'desc',
  // for when type == DataType.ACTION
  status?: ClColumnStatus;
  cellConfig?: ClTableCellConfig[];
}
