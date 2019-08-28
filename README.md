# Quantified Self

## About

Welcome to _Quantified Self_! This is a Turing School of Software & Design project completed by [Billy Urrutia](https://github.com/CosmicSpagetti/) and [Alexander Mathieu](https://github.com/alexander-mathieu/) during Module 4 of the backend engineering program. _Quantified Self_ uses Express, Node, Sequelize and GraphQL to build a calorie tracker.

The deployed site's endpoints can be consumed at:

https://calorie-coach.herokuapp.com/

The accompanying micro-service can be viewed [here](https://github.com/alexander-mathieu/quantified_self_microservice).

## Learning Goals
* Create an Express API given specified endpoints and response formats
* Create a micro-service that interfaces with the Edamam API
* Integrate both apps together to complete the Quantified Self experience
* Implement a GraphQL endpoint

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

Returns the food stored in the database matching the specified ID.

**Returns a 404 error if the food is not found.**

Example of successful output:
```
{
  "id": 1,
  "name": "Banana",
  "calories": 120
}
```

### POST /api/v1/foods

Creates a new food in the database. Name and calories are required as form input.

**Returns a 400 error if required information is not supplied.**

Request:
```
body:
{
  "name": "Banana",
  "calories": 120
}
```

Example of successful output:
```
{
  "id": 1,
  "name": "Banana",
  "calories": 120
}
```

### PATCH /api/v1/foods/:id

Updates the food stored in the database matching the specified ID.

**Returns a 404 error if the food is not found.**

Request:
```
{
  "name": "Orange",
  "calories": 100
}
```

Example of successful output:
```
{
  "id": 20,
  "name": "Orange",
  "calories": 100
}
```

### DELETE /api/v1/foods/:id

Deletes the food stored in the database matching the specified ID.  Returns 204 if the operation is successful.

**Returns a 404 error if the food is not found.**

### GET /api/v1/meals

Returns a list of all meals with their associated foods in the database.

Example of expected output:
```
[
  {
    "id": 1,
    "name": "Breakfast",
    "foods": [
      {
        "id": 1,
        "name": "Banana",
        "calories": 150
      },
      {
        "id": 6,
        "name": "Yogurt",
        "calories": 550
      },
      {
        "id": 12,
        "name": "Apple",
        "calories": 220
      }
    ]
  }
]
```

### GET /api/v1/meals/:id/foods

Returns the specified meal with all associated foods.

**Returns a 404 error if the meal is not found.**

Example of successful output:
```
{
  "id": 1,
  "name": "Breakfast",
  "foods": [
    {
      "id": 1,
      "name": "Banana",
      "calories": 150
    },
    {
      "id": 6,
      "name": "Yogurt",
      "calories": 550
    },
    {
      "id": 12,
      "name": "Apple",
      "calories": 220
    }
  ]
}
```

### POST /api/v1/meals/:id/foods/:id

Creates a new association between the specified meal and food.

**Returns a 404 error if the meal or food is not found.**

Example of successful output:
```
{
  "message": "Successfully added FOODNAME to MEALNAME!"
}
```

### DELETE /api/v1/meals/:id/foods/:id

Deletes the association between the specified meal and the specified food.  Returns 204 if the operation is successful.

**Returns a 404 error if either the meal or food is not found.**

### GET /api/v1/recipes/foods_search?q=food_type

Returns a list of all recipes stored in the database with the specified food type.

**Returns a 404 error if no recipes are found.**

Example of expected output:
```
{
data: {
  recipes: [
    {
      id: 1,
      name: "Chicken Vesuvio",
      recipeUrl: "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      foodType: "chicken",
      preparationTime: 60,
      calorieCount: 4231,
      numberOfIngredients: 11
    },
    {
      "id": 7,
      "name": "Chicken Piccata",
      "recipeUrl": "http://www.simplyrecipes.com/recipes/chicken_piccata/",
      "foodType": "chicken",
      "preparationTime": 0,
      "calorieCount": 1652,
      "numberOfIngredients": 11
    }
  ]
}
```

### GET /api/v1/recipes/calorie_count?q=calorie_count

Returns all recipes in the database with the specified amount of calories.

**Returns a 404 error if no recipes are found**

Example of expected output:
```
{
data: {
  recipes: [
    {
      id: 1,
      name: "Chicken Vesuvio",
      recipeUrl: "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
      foodType: "chicken",
      preparationTime: 60,
      calorieCount: 4231,
      numberOfIngredients: 11
    }
  ]
}
```

### GET /api/v1/recipes/num_of_ingredients?q=number

Returns all recipes in the database with the specified amount of calories.

**Returns a 404 error if no recipes are found**

Example of expected output:
```
{
data: {
  recipes: [
    {
      "id": 10,
      "name": "Tarragon Chicken",
      "recipeUrl": "http://www.frenchrevolutionfood.com/2009/09/french-in-a-flash-tarragon-chicken-and-carrot-muffins-with-sweet-chevre-icing/",
      "foodType": "chicken",
      "preparationTime": 211,
      "calorieCount": 9436,
      "numberOfIngredients": 11
    }
  ]
}
```

### GET /api/v1/recipes/average_calorie_count?q=food_type

Returns the average calorie count of all recipes in the database that match the specified food type.

**Returns a 404 error if no recipes matching the food type are found**

Example of expected output:
```
{
  "data": {
    "averageCalorieCount": [
      {
          "foodType": "chicken",
          "average": 3810.3
      }
    ]
  }
}
```

### GET /api/v1/recipes/preparation_time

Returns all recipes in the database, sorted by preparation time, from least to greatest. Recipes with no preparation time will no be listed.

Example of expected output:
```
{
  "data": {
    "preparationTime": [
      {
        "id": 6,
        "name": "Kreplach (Chicken Dumplings)",
        "recipeUrl": "https://www.tastingtable.com/entry_detail/chefs_recipes/10154/Matzo_balls_watch_your_back.htm",
        "foodType": "chicken",
        "preparationTime": 10,
        "calorieCount": 4279,
        "numberOfIngredients": 9
      },
      {
        "id": 21,
        "name": "Simple Turkey Gravy",
        "recipeUrl": "https://www.marthastewart.com/1038816/turkey-gravy",
        "foodType": "turkey",
        "preparationTime": 15,
        "calorieCount": 7750,
        "numberOfIngredients": 6
      }
    ]
  }
```

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

The database is setup using Postgres. In order to complete the setup:

* Install [Postgres](https://www.postgresql.org/download/)
* Create a `.env` file in the main directory
* Define `DB_USERNAME` within `.env` as your Postgres username
* Define `DB_DATABASE` within `.env` as `quantified_self_development`

Once setup is complete, run the following commands:
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
