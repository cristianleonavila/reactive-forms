import { Component, input } from '@angular/core';
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

  formUtils = FormUtils;

  formArray = input<FormArray>();

  index = input<number>();

  customErrors = input<CustomFormMessages>();

}
