export interface ClTableData {
  selected?: boolean;
  index?: number,
  data?: any,
  children?: ClTableData[],
  expanded?: boolean
}
