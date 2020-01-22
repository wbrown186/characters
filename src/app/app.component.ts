import { Component, OnInit, Output } from '@angular/core';
import { SwapiService } from './swapi.service';
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'star-wars-characters';
  characterData: Character[] = [];
  error: string;
  chosenCharacter: Character;
  chosenCharacterFilms: string[];
  constructor(private swapiService: SwapiService) {}

  ngOnInit() {
    this.getCharacters(1);
  }

  getCharacters(pageNumber: number): void {
    this.swapiService.getCharacters(pageNumber).subscribe( data => {
      data.results.forEach(character => {
        this.characterData.push(character);
      });

      if (data.next) {
        const page: string[] = data.next.split('=');
        this.getCharacters(parseInt(page[1], 10));
      } else {
        const me: Character = new Character();
        me.name = 'Wendell Brown';
        this.characterData.push(me);
      }
    },
    () => { // handle errors
      if (this.characterData.length === 0) {
        this.error = 'There was an error retrieving the character data.';
      } else {
        this.error = 'The character data may be incomplete.';
      }
    });
  }

  setSelectedCharacter(character: string): void {
    this.chosenCharacter = this.characterData.find(person => character === person.name);
    this.chosenCharacterFilms = this.chosenCharacter.films;
  }
}

