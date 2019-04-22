# NodeJS Video Rental API

My first `Node.js` application, using the `Express.js` framework to build web APIs and `Mongoose` ORM to manipulate `MongoDB`.

> Only the server-side logic was implemented

## Things I learned in this project:

### Backend Infrastructure

- RESTful services
- API routings
- Asynchronous operations through promises, callbacks & named functions
- Data validation
- Request - response middlewares

### Databases

- DB integration & NoSQL structure
- Differences between NoSQL & relational DBs
- NoSQL document references
- CRUD operations

### Security

- Transactions (2 Phase Commits)
- JSON Web Tokens
- Password salting
- Error logging & handling

### Authentication & Authorization

- Generating JSON Web Tokens upon registers and logins
- Setting the JWT to a custom HTTP response header (`x-auth-token`)
- Authorize and verifies credentials through the sent tokens

> Overall still a naive approach since the current JWT is signed and verified with the same environment-set private key.
>
> A better approach would be through constructing a strong private-public key pair (RSA), sign the JWT with the private key and verify it with the public key.

## Third party helper services used:

- Postman
- MongoDB Compass
