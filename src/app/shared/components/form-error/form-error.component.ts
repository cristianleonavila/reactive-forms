import { Component, computed, input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'form-error',
  imports: [],
  templateUrl: './form-error.component.html',
  styles: ``
})
export class FormErrorComponent {

  form = input<FormGroup>(new FormGroup([]));

  name = input<string>("");

  private formUtils = FormUtils;

  formArray = input<FormArray>();

  index = input<number>();

  customErrors = input<CustomFormMessages>();

  hasErrors = computed<boolean>(() => {
    if (!this.form() || !this.name()) return false;
    return this.formUtils.hasErrors(this.form(), this.name());
  });


}
