import { Account } from "./api";

export const createEmptyAccount = (): Account => ({
  type: "",
  name: "",
});

export interface AccountformErrors {
  type: string;
  name: string;
}

export const createEmptyAccountFormErrors = (): AccountformErrors => ({
  type: "",
  name: "",
});
