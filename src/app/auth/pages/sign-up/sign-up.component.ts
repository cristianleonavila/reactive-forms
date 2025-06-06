import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";

@Component({
  selector: 'app-sign-up',
  imports: [JsonPipe, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export class SignUpComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    nombre: ["", Validators.required],
    correo: ["", [Validators.required, Validators.email]],
    usuario: ["", [Validators.required, Validators.minLength(6)]],
    clave: ["", [Validators.required, Validators.minLength(6)]],
    confirmarClave: ["", [Validators.required, Validators.minLength(6)]]
  });

}
