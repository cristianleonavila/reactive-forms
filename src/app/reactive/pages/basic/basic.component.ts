import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic.component.html',
  styles: ``
})
export class BasicComponent {

  /*form: FormGroup = new FormGroup({
    name: new FormControl(""),
    price: new FormControl(0),
    inStorage: new FormControl(0)
  });*/

  formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  hasErrors(field:string):boolean {
    return (this.form.controls[field].errors !== null) &&
           (this.form.controls[field].touched);
  }

  getFieldError(field:string): string|null {
    if ( !this.form.controls[field]) return null;
    const errors = this.form.controls[field].errors ?? {};
    for ( const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return "Esta campo es requerido";
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
      }   return `Valor mínimo de ${errors['min'].min}`;
    }
    return null;
  }

  save() {
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);

    this.form.reset();

  }
}
