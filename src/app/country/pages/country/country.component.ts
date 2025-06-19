import { Component, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country.component.html',
  styles: ``
})
export class CountryComponent {

  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countries = signal<Country[]>([]);

  borders = signal<Country[]>([]);

  fb = inject(FormBuilder);

  form = this.fb.group({
    region: ["", Validators.required],
    country: ["", Validators.required],
    border: ["", Validators.required]
  });

}
