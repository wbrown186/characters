import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnChanges {

  @Input() movies: string[];
  films: Observable<Film>[] = [];
  errors: string[] = [];
  constructor(private swapiService: SwapiService) { }

  ngOnChanges() {
    this.films = [];
    this.errors = [];
    if (this.movies && this.movies.length > 0) {
      this.movies.forEach(url => {
        this.films.push(this.swapiService.getFilms(url));
      });
      this.checkErrors('films', this.films);
    }
  }

  checkErrors(api: string, list: Observable<any>[]): void {
    list.forEach(watch => {
      watch.subscribe(data => {
        // store data to reduce api calls
      }, () => {
        const message = `There was an error retrieving data from the ${api} api.`;
        if (!this.errors.some(error => error === message)) {
          this.errors.push(message);
        }
      });
    });
  }
}
