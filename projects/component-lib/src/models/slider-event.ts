export interface SliderChangeEvent {
  event: Event;
  values?: number[];
  value?: number;
}


export interface SliderSlideEndEvent {
  originalEvent: Event;
  value?: number;
  values?: number[];
}
