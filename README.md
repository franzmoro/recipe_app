# Completion Status
### Completed
- Displaying recipes from db
- Filtering them by ingredient / recipe name(s)
- Backend query for maximumCookingTime
- Tests for Frontend actions and backend routes

### Would have done with more time
- CSS Layout responsiveness / image sizing (current layout is optimized only for 13" screen)
- Filtering by Cooking time (logic had been applied on the back end)
- Starring recipes
- Populate dev database with more seed data
- Deployment to AWS

# Dev Setup
## Third Party Items
Install unless they're already on your machine:
- **[npm](https://www.npmjs.com/get-npm)** or **[yarn](https://yarnpkg.com/en/docs/install)**. Yarn will be faster than npm.
- **[mysql](https://www.mysql.com/downloads/)** if not already on machine

## Setup instructions
In order to run the project locally, the setup has to occur separately between backend & frontend.

#### Backend
From project root:
- run `yarn` or `npm i` to install `node_modules`
- create necessary mysql databases from command line:
  - run `mysqld` daemon
  - access mysql: `mysql -u root`
  - create local & test databases:

    ``` sql
    CREATE DATABASE recipe_test;
    CREATE DATABASE recipe_dev;
    ```
- seed fixtures in local database with `yarn seed:dev` or `npm run seed:dev`
- run in dev mode with `yarn dev` or `npm run dev`

In addition:
- tests to be run with `yarn test` or `npm test`

#### Frontend
From the `views` folder:
- run `yarn` or `npm i` to install `node_modules`
- run the project:
  - in development mode with `yarn dev`
  - in build/production mode with `yarn build` or `yarn npm build`
- go to `http://localhost:9000`
- run tests with `yarn test` or `npm test`

# Technical Choices
## Stack Summary
- *React*
- *Redux*
- *Express*
- *MySql*
- *Sequelize*

## Choices
#### Unique repo
- Frontend & backend in same folder.
- Frontend will export `index.html` and `bundle.js` in **`views`** folder, after webpack build is run.
- Frontend has its own package.json, to keep ordered dependencies (especially due to the many required by React)

#### SQL Database
- MySql and Sequelize to manage recipes, images & ingredients:
  - Separate table for `images`, as there could be multiple images per recipe.
  - Recipe line items combining recipe-ingredient-quantity info, to optimize queries (see below argument).

A NoSQL alternative or MongoDB would have allowed to easily place ingredients/quantity as an array of objects for each recipe. Although this would have been very convenient and fast to display the recipe, it would have been inefficient in terms of query (i.e. finding recipes by ingredient).

#### React / Redux
- React in order to provide a UI responsive to user interactions (state changes).
- Redux to separate state-management logic from UI/presentation

#### Other
- No authentication scheme, as there is no private info, nor user profiling.


# Original Specification

The application is a food / recipe application that will help users
become better at cooking. Unfortunately the product manager has dumped
a bunch of specifications on you and done a runner!

Your task is to develop an application that fulfills _some_ or _all_ of the
specification provided.

## What are we looking for?

The aim of the task is to give you the opportunity to show **your** skills
in web development. The specification is deliberately open for that
reason. If you aren't strong in front-end development or you haven't
done much server-side development, don't worry... **Play to your strengths!**

We are also very interested in _non-coding_ aspects and how you approach
problems, please supply any notes you make, such as showing your working,
questions you might want to ask and assumptions you may have made.

## Technology choices

The server-side languages that will be accepted are:-

* Node.js
* PHP
* Python
* Java
* Scala

You may pick whichever client and/or server side frameworks you feel
are suited to the task at hand.

If your framework of choice generates a lot of
scaffolding/boilerplate (like Rails!) please make it clear which code
_you've_ written. We can work it out but it will make life easier for us.

## Where to start

The `features` folder contains the behavioural specifications of the
application to be built. Start by reading through these feature files,
they should give you a sense of what is required. Remember, you don't
_have_ to satisfy them all!

## Submitting your test

Please either:

* Check your source code into a public github repository and email
the repository location to the contact email provided; OR
* Create an archive (zip, tar) and send the archive via email.
