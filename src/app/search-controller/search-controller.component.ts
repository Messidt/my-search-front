import { Component, OnInit } from '@angular/core';
import { SearchFormBuilder } from './search-form.builder';
import { SearchService } from '../search.service';
import { Country, DropDownOption } from '../types';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search-controller.component.html',
  styleUrls: ['./search-controller.component.scss']
})
export class SearchControllerComponent implements OnInit {
  form = SearchFormBuilder.build();
  countryCodes: DropDownOption[] = [];
  private sub = new Subscription();

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.subscribeOnPagination();
    this.getCountryCodes();
    this.getData();
  }

  search() {
    this.searchService.isLoading$.next(true);
    this.searchService.getCountries({searchFields: this.form.getRawValue()})
    .subscribe((data: {totalElements: number, content: Country[]}) => {
      this.searchService.tableData$.next(data);
      this.searchService.isLoading$.next(false);
    });
  }

  private getData() {
    this.searchService.isLoading$.next(true);
    this.searchService.getCountries()
    .subscribe((data: {totalElements: number, content: Country[]}) => {
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

  private subscribeOnPagination() {
    this.sub.add(
      this.searchService.pagination$
      .subscribe((data: {pageSize: number, pageIndex: number}) => {
        this.searchService.isLoading$.next(true);
        this.searchService.getCountries({searchFields: Object.assign({}, this.form.getRawValue(), data)})
        .subscribe((data: {totalElements: number, content: Country[]}) => {
        this.searchService.tableData$.next(data);
        this.searchService.isLoading$.next(false);
        });
      })
    )
  }
}
