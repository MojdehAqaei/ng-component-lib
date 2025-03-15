import {ClAction} from './action';

export interface ClToolbarAction{
items: ClAction[];
direction: 'start' | 'end' | 'center';
}
