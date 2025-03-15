export enum ClSignatures {
  JVBERi0 = "application/pdf",
  R0lGODdh = "image/gif",
  R0lGODlh = "image/gif",
  iVBORw0KGgo = "image/png",
  "/9j/" = "image/jpg"
}

export type ClSignature = keyof ClSignatures;
