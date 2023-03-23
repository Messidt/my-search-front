import { Component } from '@angular/core';
import { SearchFormBuilder } from './search-form.builder';

@Component({
  selector: 'app-search-controller',
  templateUrl: './search-controller.component.html',
  styleUrls: ['./search-controller.component.scss']
})
export class SearchControllerComponent {
  form = SearchFormBuilder.build();

}
