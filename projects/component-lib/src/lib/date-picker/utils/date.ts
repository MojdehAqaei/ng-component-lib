import dayjs from 'dayjs';
import 'dayjs/locale/fa.js';
import weekday from 'dayjs/plugin/weekday.js';
import minMax from 'dayjs/plugin/minMax';
import today from 'dayjs/plugin/isToday';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';

import { DatePickerValue, DaysInMonth, formatFunctions, Formats, WeekDays, Range } from '@sadad/component-lib/src/models';

dayjs.extend(minMax);
dayjs.extend(weekday);
dayjs.extend(localizedFormat);
dayjs.extend(today);

export const isToday = (day: string | Date) => {
  return dayjs(day).isToday();
};

export const isInRange = (
  value: string | Date,
  min?: string | Date | null,
  max?: string | Date | null,
) => {
  let validMin = false;
  let validMax = false;

  if (max) {
    validMax = dayjs(value).isSame(
      dayjs.max(dayjs(value), dayjs(max).add(1, 'day')),
    );
  }

  if (min) {
    validMin = dayjs(value).isSame(dayjs.min(dayjs(value), dayjs(min)));
  }

  return !validMin && !validMax;
};

export const getDayString = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { day: 'numeric' }, numberingSystem);
};
export const getYear = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { year: 'numeric' }, numberingSystem);
};
export const getYear2Digit = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { year: '2-digit' }, numberingSystem);
};

export const getMonthName = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { month: 'short' }, numberingSystem);
};

export const getMonth = (date: Date, numberingSystem?: string): string => {
  return getDateFormat(date, { month: '2-digit' }, numberingSystem);
};

export const getDateFormat = (
  date: Date,
  options: Intl.DateTimeFormatOptions,
  numberingSystem?: string,
) => {
  const defaultOptions = {
    ...options,
    ...(numberingSystem != null && { numberingSystem }),
  };
  return new Date(date).toLocaleString('fa', defaultOptions);
};

const getDayOfMonth = (date: Date): number => {
  return parseInt(getDateFormat(date, { day: 'numeric' }, 'latn'), 10);
};

const formats: Record<Formats, formatFunctions> = {
  MMMM: getMonthName,
  MM: getMonth,
  M: getMonth,
  YYYY: getYear,
  YY: getYear2Digit,
  DD: getDayString,
  D: getDayString,
};

const sameMonth = (date: Date, date2: Date) => {
  return getMonth(date) === getMonth(date2);
};

export const formatDate = (
  date: Date,
  format: string,
  numberingSystem?: string,
): string => {
  try {
    validateFormat(format);
    const splitFormat = format.trimStart().trimEnd().split(regex) as Formats[];
    const splitCharacterSearch = format.match(regex);
    const splitCharacter =
      splitCharacterSearch !== null ? splitCharacterSearch[0] : '';

    return splitFormat
      .map((format) => {
        return formats[format](date, numberingSystem);
      })
      .join(splitCharacter);
  } catch (ex) {
    console.error(ex);
  }
  return '';
};

const regex = /\/|\s|-/;

const validateFormat = (format: string) => {
  const splitFormat = format.trimStart().trimEnd().split(regex) as Formats[];
  if (format === '' || format.trim() === '') {
    throw new Error('format is empty');
  }
  splitFormat.forEach((format) => {
    if (!(format in formats)) {
      throw new Error(`format is not valid, format passed is: ${format}`);
    }
  });
};

const getDays = (date: DatePickerValue | undefined, range: Range): DaysInMonth => {
  dayjs.locale('fa');
  const startDate = date === undefined ? new Date() : dayjs(date).toDate();
  const selectedDayOnMonth = getDayOfMonth(new Date(startDate));
  const firstDayOfMonth = dayjs(new Date(startDate)).subtract(
    selectedDayOnMonth - 1,
    'days',
  );
  const dayNumberOfWeek = firstDayOfMonth.weekday();
  const firstDayOfWeek = dayjs(firstDayOfMonth).subtract(
    dayNumberOfWeek,
    'days',
  );
  const middleOfMonth = firstDayOfMonth.add(15, 'days');

  const weeks: WeekDays[][] = [];
  let initialDate = dayjs(firstDayOfWeek.format());
  for (let i = 0; i <= 5; i++) {
    const day: WeekDays[] = [];
    for (let j = 0; j < 7; j++) {
      const currentDay = new Date(initialDate.format());
      day.push({
        date: currentDay,
        disabled: !sameMonth(firstDayOfMonth.toDate(), currentDay) || !isInRange(currentDay, range?.min ?? null, range?.max ?? null),
      });
      initialDate = initialDate.add(1, 'day');
    }
    weeks.push(day);
  }

  return {
    id: Date.now(),
    monthName: formatDate(new Date(startDate), 'MMMM YYYY'),
    middleOfMonth: middleOfMonth.toDate(),
    weeks,
  };
};

export const selectMonth = (date: Date, selectedMonth: number) => {
  const currentMonth = parseInt(getMonth(date, 'latn'), 10);
  const diffMonth = selectedMonth - currentMonth;

  if (diffMonth > 0) {
    return dayjs(date).add(diffMonth, 'months').toDate();
  }
  return dayjs(date).subtract(Math.abs(diffMonth), 'months').toDate();
};

export const selectYear = (date: Date, selectedYear: number) => {
  const currentYear = parseInt(getYear(date, 'latn'), 10);
  const diffYear = selectedYear - currentYear;

  if (diffYear > 0) {
    return dayjs(date).add(diffYear, 'years').toDate();
  }
  return dayjs(date).subtract(Math.abs(diffYear), 'years').toDate();
};

export const weekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
export const months = [
  { key: 1, name: 'فروردین' },
  { key: 2, name: 'اردیبهشت' },
  { key: 3, name: 'خرداد' },
  { key: 4, name: 'تیر' },
  { key: 5, name: 'مرداد' },
  { key: 6, name: 'شهریور' },
  { key: 7, name: 'مهر' },
  { key: 8, name: 'آبان' },
  { key: 9, name: 'آذر' },
  { key: 10, name: 'دی' },
  { key: 11, name: 'بهمن' },
  { key: 12, name: 'اسفند' },
];

export default getDays;
