import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

@Injectable()
export class ClDialogRef<T = any, R = any> {
    private closeSubject = new Subject<R>();
    readonly onClose = this.closeSubject.asObservable();

    constructor(@Inject(DIALOG_DATA) public data: T) { }

    close(result?: R) {
        this.closeSubject.next(result as R);
        this.closeSubject.complete();
    }
}
