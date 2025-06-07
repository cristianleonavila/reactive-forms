import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";
import { emailPattern, namePattern, notOnlySpacesPattern } from '../../../shared/patterns/common-patterns';
import { CustomFormMessages } from '../../../shared/components/form-error/custom-messages';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-sign-up',
  imports: [JsonPipe, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {

  formMessages:CustomFormMessages = {
    nombre: {
      required: "Debe especificar el nombre",
      pattern: "Hace falta el apellido"
    }
  }

  fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ["", [Validators.required, Validators.pattern(namePattern)]],
    correo: ["", [Validators.required, Validators.pattern(emailPattern)]],
    usuario: ["", [Validators.required, Validators.minLength(6), Validators.pattern(notOnlySpacesPattern)]],
    clave: ["", [Validators.required, Validators.minLength(6)]],
    confirmarClave: ["", [Validators.required, Validators.minLength(6)]]
  }, {
    validators: [
      FormUtils.isFieldsMatch('clave', 'confirmarClave')
    ]
  });

  submit() {
    this.form.markAllAsTouched();
    console.log({formData: this.form.value});

  }

}
