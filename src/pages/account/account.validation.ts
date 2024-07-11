import { AccountformErrors, createEmptyAccountFormErrors } from "./account.vm";
import { Account } from "./api";

interface ValidationResult {
  succeeded: boolean;
  errors: AccountformErrors;
}

export const validateForm = (account: Account): ValidationResult => {
  let validationResult = {
    succeeded: true,
    errors: createEmptyAccountFormErrors(),
  };

  if (!account.type.trim()) {
    validationResult.errors = {
      ...validationResult.errors,
      type: "Debe seleccionar un tipo de cuenta",
    };
    validationResult.succeeded = false;
  }

  if (!account.name.trim()) {
    validationResult.errors = {
      ...validationResult.errors,
      name: "Debe añadir un alias a la cuenta",
    };
    validationResult.succeeded = false;
  }

  return validationResult;
};
