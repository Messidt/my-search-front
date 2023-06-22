import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.subscribeOnLoading();
    this.getData();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  private getData() {
    this.subscription.add(this.searchService.tableData$
      .pipe(tap(() => this.isLoading = false))
      .subscribe((data) => {
        this.dataSource = data;
      }))
  }

  private subscribeOnLoading() {
    this.subscription.add(this.searchService.isLoading$
      .subscribe((data) => {
        this.isLoading = data;
      }));
  }
}
