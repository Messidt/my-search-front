import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'cityName', 'countryName', 'countryCode', 'continent', 'population'];
  dataSource: any[] = [];
  subscription = new Subscription();
  isLoading = true;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.subscribeOnLoading();
    this.getData();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  private getData() {
    this.subscription.add(this.searchService.tableData$
      .pipe(tap(() => this.isLoading = false))
      .subscribe((data) => {
        this.dataSource = data.content;
        this.length = data.totalElements;
      }))
  }

  private subscribeOnLoading() {
    this.subscription.add(this.searchService.isLoading$
      .subscribe((data) => {
        this.isLoading = data;
      }));
  }
}
