import { AbstractControl, ValidationErrors } from "@angular/forms";

export const noStriderValidation = (control: AbstractControl):ValidationErrors | null => {
  if ( control.value === 'strider') {
    return {noStrider: true};
  }
  return null;
};
