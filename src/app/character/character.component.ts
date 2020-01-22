import { Component, Input, OnChanges } from '@angular/core';
import { Character } from '../models/character.model';
import { SwapiService } from '../swapi.service';
import { Species } from '../models/species.model';
import { Observable } from 'rxjs';
import { Planet } from '../models/planet.model';
import { Starship } from '../models/starship.model';
import { Vehicle } from '../models/vehicle.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent implements OnChanges {

  @Input() selectedCharacter: Character;
  homeworld: Observable<Planet>;
  species: Observable<Species>[] = [];
  starships: Observable<Starship>[] = [];
  vehicles: Observable<Vehicle>[] = [];
  errors: string[] = [];

  constructor(private swapiService: SwapiService) { }

  ngOnChanges() {
    if (this.selectedCharacter) {
      this.clearData();
      this.getPlanets();
      this.getSpecies();
      this.getStarships();
      this.getVehicles();
    }
  }

  getPlanets(): void {
    if (this.selectedCharacter.homeworld != null) {
      this.homeworld = this.swapiService.getPlanets(this.selectedCharacter.homeworld);
      this.checkErrors('planets', [this.homeworld]);
    }
  }

  getSpecies(): void {
    if (this.selectedCharacter.species) {
      this.selectedCharacter.species.forEach(url => {
        this.species.push(this.swapiService.getSpecies(url));
      });
      this.checkErrors('species', this.species);
    }
  }

  getStarships(): void {
    if (this.selectedCharacter.starships) {
      this.selectedCharacter.starships.forEach(url => {
        this.starships.push(this.swapiService.getStarships(url));
      });
      this.checkErrors('starships', this.starships);
    }
  }

  getVehicles(): void {
    if (this.selectedCharacter.vehicles) {
      this.selectedCharacter.vehicles.forEach(url => {
        this.vehicles.push(this.swapiService.getVehicles(url));
      });
      this.checkErrors('vehicles', this.vehicles);
    }
  }

  clearData(): void {
    this.homeworld = null;
    this.species = [];
    this.starships = [];
    this.vehicles = [];
    this.errors = [];
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
