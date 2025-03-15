
export enum ClMessageTypes {
    success = 'success',
    info = 'info',
    warning= 'warning',
    error= 'error',
    help= 'help'
}

export type ClMessageType = keyof typeof ClMessageTypes;

