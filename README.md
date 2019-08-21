# Quantified Self

## About

## Endpoints

### GET /api/v1/foods

Returns a list of all foods stored in the database.

Example of expected output:
```
[
  {
      "id": 1,
      "name": "Banana",
      "calories": 120
  },
  {
      "id": 2,
      "name": "Orange",
      "calories": 80
  },
  {
      "id": 3,
      "name": "Strawberry",
      "calories": 10
  }
]
```

### GET /api/v1/foods/:id

Returns the food stored in the database matching the specified ID. If no food is found, returns a 404 error.

Example of expected output:
```
{
    "id": 1,
    "name": "Banana",
    "calories": 120
}
```

### POST /api/v1/foods

Creates a new food in the database.

Request:
```
body:
{
  "name": "Banana",
  "calories": 120
}
```

Example of expected output:
```
{
    "id": 1,
    "name": "Banana",
    "calories": 120
}
```

### PATCH /api/v1/foods/:id

Updates the food stored in the database matching the specified ID. If no food is found, returns a 404 error.

Request:
```
{
    "name": "Orange",
    "calories": 100
}
```

Example of expected output:
```
{
    "id": 20,
    "name": "Orange",
    "calories": 100
}
```

### DELETE /api/v1/foods/:id

Deletes the food stored in the database matching the specified ID.  Returns 204 if the operation is successful. If no food is found, returns a 404 error.

## Local Installation

### Requirements

* [Node 10.16.2](https://nodejs.org/en/download/) - Node Version

### Clone

```
$ git clone https://github.com/CosmicSpagetti/quantified_self.git
$ cd quantified_self
$ npm install
```

### Setup Database

```
$ npx db:create
$ npx db:migrate
```

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `quantified_self` project directory, boot up a server with `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser

### Running Tests

Tests are implemented with Jest, and can be run with `$ npm test`.

Example of expected output:
```
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        4.725s
Ran all test suites.
```
