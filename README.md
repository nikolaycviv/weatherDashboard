# Weather Dashboard

## Getting Started

Installing dependencies from main folder:

```
cd server && npm i
cd client && npm i
```

Starting the service from two different terminals:

```
cd server && npm start
cd client && npm start
```

The service should be up and running on port 3000 for the client and on port 4000 for the server.

## Setup the database
The project uses Sequalize Database [Migrations](https://sequelize.org/master/manual/migrations.html)

Navigate to project's server folder (`cd server`).

Run the following commands to create database, create user table and fill it with some data
```
npx sequelize-cli db:create
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all
```
## Running the backend tests

Navigate to project's server folder (`cd server`)

### Run all unit and system tests

```
npm test
```

### Run all unit tests

```
npm run test:coverage
```
 