import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country';
import { filter, switchMap, tap } from 'rxjs';

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

  regionChangedEffect = effect((onCleanup) => {
    const regionSubs = this.regionChanged();
    onCleanup(() => regionSubs?.unsubscribe());
  });

  countryChangedEffect = effect((onCleanup) => {
    const countrySubs = this.countryChanged();
    onCleanup(() => countrySubs?.unsubscribe())
  });

  regionChanged () {
    return this.form.get('region')
      ?.valueChanges
       .pipe(
        tap(() => {
          this.form.get('country')?.setValue("");
          this.form.get('border')?.setValue("");
          this.borders.set([]);
          this.countries.set([]);
        }),
        switchMap((region) => {
          return this.countryService.byRegion(region ?? '');
        })
       )
      .subscribe(countries => this.countries.set(countries));
  }

  countryChanged () {
    return this.form.get('country')
      ?.valueChanges
       .pipe(
        tap(() => {
          this.form.get('border')?.setValue("");
          this.borders.set([]);
        }),
        filter((value) => value!.length > 0),
        switchMap(alphaCode => this.countryService.byAlphaCode(alphaCode ?? '')),
        switchMap(country => this.countryService.countryBordersByAlphaCodes(country.borders))
       )
      .subscribe(borders => this.borders.set(borders));
  }

}
