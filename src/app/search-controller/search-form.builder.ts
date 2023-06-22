import { FormGroup, FormControl } from '@angular/forms'

export class SearchFormBuilder {
  static build(): FormGroup {
    return new FormGroup({
      cityName: new FormControl(),
      countryName: new FormControl(),
      continent: new FormControl(),
      countryCode: new FormControl(),
      population: new FormControl()
    });
  }

}
