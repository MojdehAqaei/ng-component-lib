import {ClMessage} from "./message";

export interface ClFile {
  id?: string;
  name?: string;
  size?: number;
  base64File?: any;
  extension?: string;
  messages?: ClMessage[];
}
