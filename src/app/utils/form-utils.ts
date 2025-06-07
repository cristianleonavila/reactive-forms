import { FormGroup, FormArray, ValidationErrors } from '@angular/forms';
import { CustomFormMessages } from '../shared/components/form-error/custom-messages';

export class FormUtils {

  static hasErrors(form: FormGroup, field:string):boolean {
    return (form.controls[field].errors !== null) &&
           (form.controls[field].touched);
  }

  static getFieldError(form: FormGroup, field:string, customMessages: CustomFormMessages): string|null {
    if ( !form.controls[field]) return null;
    const errors = form.controls[field].errors;
    return this.getError(field, errors, customMessages);
  }

  private static getError(field: string | number, errors: ValidationErrors | null, customMessages: CustomFormMessages):string | null {
    if ( errors === null) return null;
    for ( const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return customMessages[field]?.required || "Este campo es requerido";
        case 'minlength':
          return customMessages[field]?.minlength || `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return customMessages[field]?.min || `Valor mínimo de ${errors['min'].min}`;
        case 'email':
          return customMessages[field]?.email || `La dirección de correo es inválida`;
        case 'pattern':
          return customMessages[field]?.pattern || `El valor para ${field} es inválido`;
      }
    }
    return null;
  }

  static hasErrorsInArray(formArray: FormArray | undefined, index: number | undefined) {
    if ( !formArray || index === undefined ) return false;
    const element = formArray.controls[index];
    return (element.errors !== null ) &&
           (element.touched);
  }

  static getFieldErrorFromArray(formArray: FormArray | undefined, index: number | undefined, customMessages: CustomFormMessages) {
    if ( !formArray || index === undefined ) return false;
    const errors = formArray.controls[index].errors ?? {};
    return this.getError(index, errors, customMessages);
  }

  static isFieldsMatch(field1:string, field2:string) {
    return (formGroup:FormGroup) => {
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;
      console.log({value1, value2});

      return value1 === value2 ? null : {
        valuesNotMatch: true
      }
    }
  }

  static getFormError(formGroup: FormGroup):string {
    const errors = formGroup.errors;
    console.log(errors);
    return "Error a nivel de formulario";

  }
}
