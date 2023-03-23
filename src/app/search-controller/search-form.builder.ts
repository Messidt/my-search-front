import { FormGroup, FormControl } from '@angular/forms'

export class SearchFormBuilder {
  static build(): FormGroup {
    return new FormGroup({
      name: new FormControl(),
      weight: new FormControl(),
      symbol: new FormControl()
    });
  }

}
