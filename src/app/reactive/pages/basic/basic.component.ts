import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";
import { CustomFormMessages } from '../../../shared/components/form-error/custom-messages';

@Component({
  selector: 'app-basic',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './basic.component.html',
  styles: ``
})
export class BasicComponent {

  formBuilder = inject(FormBuilder);

  customMsg: CustomFormMessages = {
    name: {
      required: "Debe especificar el nombre",
      minlength: "El nombre debe tener mínimo 3 caracteres"
    },
    price: {
      required: "Debe especificar el precio del producto",
      min: "El precio del producto debe ser mínimo de 10"
    },
    inStorage: {
      required: "Debe especificar las existencias del producto",
      min: "Existencia del producto inválida"
    }
  };

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
    this.form.reset();

  }
}
