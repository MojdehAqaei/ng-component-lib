import { ClMessageType } from "@sadad/component-lib/src/enums";

export const ButtonTypeToColorMapper = new Map<ClMessageType, string>()
.set('success', 'cl-form-message-boarder-success')
.set('info', 'cl-form-message-boarder-info')
.set('warning', 'cl-form-message-boarder-warning')
.set('error', 'cl-form-message-boarder-error')
.set('help', 'cl-form-message-boarder-help');
