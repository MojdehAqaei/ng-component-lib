import {ClHttpMethod} from "@sadad/component-lib/src/enums";

export interface ClRequestOption {
  response?: any | any[];
  params?: any[];
  endPoint?: string;
  httpMethod?: ClHttpMethod;
}
