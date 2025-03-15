import { Injector } from "@angular/core";

export interface ClDynamicDialogOptions<T = any> {
    hideTransitionOptions?: number;
    styleClasses?: string;
    header?: string;
    dismissible?: boolean;
    closeable?: boolean;
    resizeable?: boolean;
    position?: 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight' | 'top' | 'bottom' | 'left' | 'right';
    width?: string;
    data?: T;
    injector?: Injector;
}
