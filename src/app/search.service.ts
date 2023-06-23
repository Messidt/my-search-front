import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { SearchParams, Country } from './types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  tableData$ = new ReplaySubject<{totalElements: number, content: Country[]}>(1);
  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) { }

  getCountries(params?: SearchParams): Observable<{totalElements: number, content: Country[]}> {
    console.log(params);
    return this.http.get<{totalElements: number, content: Country[]}>(`http://localhost:3000/countries?${params ? this.parseSearchParamsToQueryParams(params) : ''}`);
  }

  private parseSearchParamsToQueryParams(params: SearchParams) {
    const searchFields = Object.keys(params.searchFields)
    .filter(e => params.searchFields[e] !== null && params.searchFields[e] !== '')
    .map((key: string) => `${key}=${params.searchFields[key]}`)
    .join('&');
    const listParams = `page=${params.page}&sort=${params.sort}&sortDirection=${params.sortDirection}`;
    return `${searchFields ? searchFields : ''}`;
  }

  getDictionary(type: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/dictionaries?type=${type}`);
  }
}
