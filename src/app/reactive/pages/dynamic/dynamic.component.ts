import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";

@Component({
  selector: 'app-dynamic',
  imports: [ReactiveFormsModule, FormErrorComponent],
  templateUrl: './dynamic.component.html',
  styles: ``
})
export class DynamicComponent {

  fb: FormBuilder = inject(FormBuilder);

  formUtils = FormUtils;

  newGame = new FormControl('', [Validators.required, Validators.minLength(3)]);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', [Validators.required, Validators.minLength(3)]],
      ['Death Stranding', [Validators.required, Validators.minLength(3)]]
    ], Validators.minLength(3))
  });

  get favoriteGames(): FormArray {
    return this.form.get('favoriteGames') as FormArray;
  }

  addGame() {
    if ( this.newGame.invalid ) return;
    this.favoriteGames.push(new FormControl(this.newGame.value, [Validators.required, Validators.minLength(3)]));
    this.newGame.reset();
  }

  deleteGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  save() {
    this.form.markAllAsTouched();
  }

}
