export interface Country {
  cityName: number;
  name: string;
  district: string;
  countryCode: string;
  population: number;
}

export interface SearchParams {
  sort?: string;
  sortDirection?: 'asc' | 'dsc';
  page?: string;
  pageSize?: string;
  searchFields: {[key: string]: any}
}
