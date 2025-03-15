export enum ClButtonTypes {
  success = 'success',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
  help = 'help',
  secondary = 'secondary',
  default = 'default'
}

export type ClButtonType = keyof typeof ClButtonTypes;


