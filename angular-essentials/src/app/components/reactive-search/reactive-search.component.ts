import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap} from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { catchError, tap } from "rxjs/operators";

/**
 * Interface for each brewery object returned by the API
 */
export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string | null;
  address_3: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string | null;
  latitude: string | null;
  phone: string;
  website_url: string;
  state: string;
  street: string;
}

@Component({
  selector: 'app-reactive-search',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './reactive-search.component.html',
  styleUrl: './reactive-search.component.scss',
})
export class ReactiveSearchComponent {

  /**
   * Observable containing brewery data based on search results
   */
  public data$: Observable<Brewery[]>;

  /**
   * Search input control bound to the input field
   */
  public searchControl: FormControl<string> = new FormControl('', { nonNullable: true });

  /**
   * Boolean to control loading state during API call
   */
  public isLoading: boolean = false;

  /**
   * Holds any error message to display on UI
   */
  public errorMessage: string = '';

  constructor(private http: HttpClient) {
    /**
     * Subscribe to searchControl value changes
     */
    this.data$ = this.searchControl.valueChanges.pipe(
        /**
         * -->Emit: empty string immediately on component load
         */
        startWith(""),

        /**
         * -->Wait: 300ms after user stops typing before emitting
         */
        debounceTime(300),

        /**
         * -->Ignore: values that are the same as the previous one
         */
        distinctUntilChanged(),

        // -->Set: loading and reset error
        tap(() => {
          this.isLoading = true;
          this.errorMessage = '';
        }),

        // -->Fetch: search results via HTTP request
        switchMap((value: string): Observable<Brewery[]> =>
              this.getAll(value).pipe(

                  // -->Handle: errors gracefully and return empty array
                  catchError((err): Observable<Brewery[]> => {
                    this.errorMessage = err.message || 'something went wrong';
                    return of([]);
                  }),

                  // -->Set: loading to false after response or error
                  tap(() => (this.isLoading = false)),
              )
        ),
    );
  }

  /**
   * Perform GET request to brewery API search endpoint
   */
  public getAll(query: string = ''): Observable<Brewery[]> {
    if(query.trim() === ''){
      return this.http.get<Brewery[]>('https://api.openbrewerydb.org/v1/breweries');
    }else{
      return this.http.get<Brewery[]>('https://api.openbrewerydb.org/v1/breweries/search', {
        params: { query }
      });
    }
  }

}
