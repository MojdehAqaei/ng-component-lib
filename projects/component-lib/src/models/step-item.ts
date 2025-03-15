import {ClMessage} from "./message";

export interface ClStepItem{
  label?: string;
  status?: boolean;
  alertMessage?: ClMessage[],
}

