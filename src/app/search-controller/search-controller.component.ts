import { Component, OnInit } from '@angular/core';
import { SearchFormBuilder } from './search-form.builder';
import { SearchService } from '../search.service';
import { Country, DropDownOption } from '../types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search-controller.component.html',
  styleUrls: ['./search-controller.component.scss']
})
export class SearchControllerComponent implements OnInit {
  form = SearchFormBuilder.build();
  countryCodes: DropDownOption[] = [];

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.getCountryCodes();
    this.getProducts();
  }

  search() {
    this.searchService.isLoading$.next(true);
    this.searchService.getCountries({searchFields: this.form.getRawValue()})
    .subscribe((data: Country[]) => {
      this.searchService.tableData$.next(data);
      this.searchService.isLoading$.next(false);
    });
  }

  private getProducts() {
    this.searchService.isLoading$.next(true);
    this.searchService.getCountries()
    .subscribe((data: Country[]) => {
      this.searchService.tableData$.next(data);
      this.searchService.isLoading$.next(false);
    });
  }

  private getCountryCodes() {
    this.searchService.getDictionary('code')
    .pipe(map((array: string[]) => {
      return array.map((elm: string) => {
        return {value: elm, label: elm};
      })
    }))
    .subscribe((data) => this.countryCodes = data);
  }
}
