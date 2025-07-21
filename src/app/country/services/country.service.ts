import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private baseURL = environment.baseURL;

  private regionList = ['Africa', 'Asia', 'Americas', 'Europa', 'Oceania'];

  get regions(): string[] {
    return [...this.regionList]
  }

  byRegion(region:string): Observable<Country[]> {
    if ( !region ) return of([]);
    const url = `${this.baseURL}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  byAlphaCode(alphaCode:string): Observable<Country> {
    const url = `${this.baseURL}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  countryBordersByAlphaCodes(alphaCodes: string[]): Observable<Country[]> {
    if (!alphaCodes.length) return of([]);
    const countriesReq:Observable<Country>[] = [];
    alphaCodes.forEach(code => {
      const request = this.byAlphaCode(code);
      countriesReq.push(request);
    });
    return combineLatest(countriesReq);
  }


}
