import { Component, computed, input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { CustomFormMessages } from './custom-messages';

@Component({
  selector: 'form-error',
  imports: [],
  templateUrl: './form-error.component.html',
  styles: ``
})
export class FormErrorComponent {

  form = input<FormGroup>(new FormGroup([]));

  name = input<string>("");

  formArray = input<FormArray>();

  index = input<number>();

  customErrors = input<CustomFormMessages>({});

  hasErrors() {
    if (!this.form() || !this.name()) return false;
    return FormUtils.hasErrors(this.form(), this.name());
  }

  getFieldError() {
    return FormUtils.getFieldError(this.form(), this.name(), this.customErrors());
  }

  formHasErrors() {
    return this.form().errors && this.form().touched;
  }

  getFormError() {
    return FormUtils.getFormError(this.form());
  }


}
