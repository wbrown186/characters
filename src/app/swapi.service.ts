import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CharacterContainer } from './models/characterContainer.model';
import { Film } from './models/film.model';
import { Planet } from './models/planet.model';
import { Species } from './models/species.model';
import { Starship } from './models/starship.model';
import { Vehicle } from './models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  BASE_URL = 'https://swapi.co/api';

  constructor(private http: HttpClient) { }

  getCharacters(pageNumber: number): Observable<CharacterContainer> {
    return this.http.get<CharacterContainer>(`${this.BASE_URL}/people/?page=${pageNumber}`);
  }

  getFilms(url: string): Observable<Film> {
    return this.http.get<Film>(url);
  }

  getPlanets(url: string): Observable<Planet> {
    return this.http.get<Planet>(url);
  }

  getSpecies(url: string): Observable<Species> {
    return this.http.get<Species>(url);
  }

  getStarships(url: string): Observable<Starship> {
    return this.http.get<Starship>(url);
  }

  getVehicles(url: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(url);
  }
}
