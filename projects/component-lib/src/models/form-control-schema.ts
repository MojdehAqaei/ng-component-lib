import { ClAction } from './action';
import {
  ClFormControlType,
  ClHttpMethod,
  ClRegexStrType,
} from '@sadad/component-lib/src/enums';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpContext } from '@angular/common/http';
import { ClSelectButtonOption } from './select-button-options';
import { ClSelectItem } from './select-item';

export interface ClFormControlSchema {
  order: number;
  value?: any;
  name: string;
  label?: string;
  required?: boolean;
  validators?: ValidatorFn[];
  validatorsError?: ValidationErrors;
  showValidatorErrors?: boolean;
  controlType: ClFormControlType;
  disabled?: boolean;
  styleClasses?: string;
  //select & multiselect
  options?: ClSelectItem[] & ClSelectButtonOption[];
  filterPlaceholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  filterable?: boolean;
  lazyFilter?: boolean;
  method?: ClHttpMethod;
  params?: any; // http params
  httpContext?: HttpContext;
  body?: any;
  url?: string;
  optionLabel?: string[];
  optionValue?: string;
  showClearIcon?: boolean;
  allowDuplicate?: boolean;
  //input text
  inputTextType?: 'text' | 'password' | 'email' | 'time';
  keyFilter?: ClRegexStrType;
  mask?: string;
  icon?: string;
  size?: 'sm' | 'lg';
  iconPosition?: 'left' | 'right';
  // select button
  renderHtml?: boolean;
  separate?: boolean;
  //input number
  numberMode?: 'num' | 'pnum' | 'int' | 'pint';
  numberGrouping?: boolean;
  suffix?: string;
  prefix?: string;
  min?: number | any;
  max?: number | any;
  maxFractionDigits?: number;
  //input group
  addons?: ClAction[];
  //checkbox, radiobutton
  binary?: boolean;
  //textarea
  rows?: number;
  maxLength?: number;
  showLength?: boolean;
  //datepicker
  hasClear?: boolean;
  acceptFileFormat?: string;
  autoUpload?: boolean;
  fileLimit?: number;
  fileDownloadUrl?: string;
  fileDeleteUrl?: string;
  maxFileSize?: number;
  onEnter?: (event?: any) => void;
  onSelect?: (event?: any) => void;
  onChange?: (event?: any) => void;
}
