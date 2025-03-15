export enum ClRegexStr{
  pint = '^[0-9]*$',  //Positive integers
  int  = '^[0-9-]$', //Integers
  num = '^[0-9.-]$', // whole Numbers
  pnum = '^[0-9.]$', // Positive numbers
  alpha = '^[a-zA-Z]*$', //Alphabetic
  email = '^[a-zA-Z0-9.!#$&@_-]*$', //Email
  alphanum = '^[a-zA-Z0-9_]*$', // Alphanumeric
  alphaNumPersian = '^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC0-9\\s]+$'
}

export type ClRegexStrType = keyof typeof ClRegexStr;
