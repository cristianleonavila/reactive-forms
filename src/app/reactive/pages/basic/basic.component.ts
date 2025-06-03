import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";

@Component({
  selector: 'app-basic',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './basic.component.html',
  styles: ``
})
export class BasicComponent {

  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  save() {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);

    this.form.reset();

  }
}
