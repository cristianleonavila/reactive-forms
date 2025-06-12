import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-country',
  imports: [ReactiveFormsModule],
  templateUrl: './country.component.html',
  styles: ``
})
export class CountryComponent {

  countryService = inject(CountryService);

  fb = inject(FormBuilder);

  form = this.fb.group({
    region: ["", Validators.required],
    country: ["", Validators.required],
    border: ["", Validators.required]
  });

}
