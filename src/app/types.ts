export interface Country {
  cityName: number;
  countryName: string;
  continent: string;
  countryCode: string;
  population: number;
}

export interface SearchParams {
  sort?: string;
  sortDirection?: 'asc' | 'dsc';
  pageIndex?: string;
  pageSize?: string;
  searchFields: {[key: string]: any}
}

export interface DropDownOption {
  value: string;
  label: string;
}
