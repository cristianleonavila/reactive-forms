import { FormGroup, FormArray, ValidationErrors } from '@angular/forms';

export class FormUtils {

  static hasErrors(form: FormGroup, field:string):boolean {
    return (form.controls[field].errors !== null) &&
           (form.controls[field].touched);
  }

  static getFieldError(form: FormGroup, field:string, customMessage: string = ""): string|null {
    if ( !form.controls[field]) return null;
    const errors = form.controls[field].errors;
    return this.getError(errors);
  }

  private static getError(errors: ValidationErrors | null ):string | null {
    if ( errors === null) return null;
    for ( const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
      }   return `Valor mínimo de ${errors['min'].min}`;
    }
    return null;
  }

  static hasErrorsInArray(formArray: FormArray | undefined, index: number | undefined) {
    if ( !formArray || index === undefined ) return false;
    const element = formArray.controls[index];
    return (element.errors !== null ) &&
           (element.touched);
  }

  static getFieldErrorFromArray(formArray: FormArray | undefined, index: number | undefined) {
    if ( !formArray || index === undefined ) return false;
    const errors = formArray.controls[index].errors ?? {};
    return this.getError(errors);
  }
}
