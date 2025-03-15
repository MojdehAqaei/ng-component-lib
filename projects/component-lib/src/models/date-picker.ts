export type DatePickerValue = number | Date | string
export interface WeekDays {
  date: Date
  disabled: boolean
}

export interface DaysInMonth {
  id: number
  monthName: string
  middleOfMonth: Date
  weeks: WeekDays[][]
}

export enum Formats {
  M = 'M',
  MM = 'MM',
  MMMM = 'MMMM',
  YY = 'YY',
  YYYY = 'YYYY',
  DD = 'DD',
  D = 'D'
}

export type formatFunctions = (date: Date, numberingSystem?: string) => string

export interface Range {
  min?: string;
  max?: string;
}