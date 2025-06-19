import { FormGroup, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';
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
          return this.getCustomError(customMessages, field, key) || "Este campo es requerido";
        case 'minlength':
          return this.getCustomError(customMessages, field, key) || `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return this.getCustomError(customMessages, field, key) || `Valor mínimo de ${errors['min'].min}`;
        case 'email':
          return this.getCustomError(customMessages, field, key) || `La dirección de correo es inválida`;
        case 'pattern':
          return this.getCustomError(customMessages, field, key) || `El valor para ${field} es inválido`;
        default:
          return this.getCustomError(customMessages, field, key) || `El valor para ${field} es inválido`;
      }
    }
    return null;
  }

  private static getCustomError(customErrors: CustomFormMessages = {}, field:string | number, key:string):string | null {
    if ( !customErrors[field] ) return null;
    if ( !customErrors[field][key]) return null;
    return customErrors[field][key];
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
