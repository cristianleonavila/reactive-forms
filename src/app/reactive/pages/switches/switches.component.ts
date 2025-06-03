import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches.component.html',
  styles: ``
})
export class SwitchesComponent {

  private fb = inject(FormBuilder);


  formUtils = FormUtils;

  form:FormGroup = this.fb.group({
    gender: [, Validators.required],
    wantNotifications: [true],
    terms: [false, Validators.requiredTrue]
  });

  submit() {
    console.log(this.form.value);

  }

}
