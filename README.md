# StarWarsCharacters

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.


## Installation

Run `npm install` to install the application dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Approach
- Use Angular CLI to create the project and components.
- Create models based on the SWAPi schema for each api.
- Create a service to retrieve data from SWAPI.
- Retrieve all characters from the SWAPI service on application initialization.
- Use Bootstrap select and card styles.
- Send selected character data to the character component.
- Use urls in the character data to retrieve additional information.
- Send film urls to the movies component and retrieve film information.
- Notify user if any errors occur retrieving data from the SWAPI service.
- Upon selecting my name (Wendell Brown)  no errors are shown as selecting a provided name from the dropdown is not a user error. No data is shown in the character card details.