## API

# Welcome to Secret Family Recipes! A CRUD-operations-based API.
This project is built to help families create, post, and edit their secret recipes that have been passed down for generations.


## Table Diagram
![Database Table](images/Database_Tables.png)

-  Users can register - /api/auth/register
-  Users can log in - /api/auth/login
-  Users can view & add their recipes - /api/recipes
-  Users can edit and delete their own recipes - api/recipes/:id

-  This app includes automated testing for each route using jest, supertest, and
   cross-env packages
-  This app also includes custom middleware for authenticating users, sending
   authentication tokens back and forth w/the client, and ensuring data
   integrity for POSTs, PUTs, and DELETEs


# API Endpoints
## Register/Login
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| POST         | /api/auth/register             | Registers a new User      |
| POST         | /api/auth/login                | Logs user in - creates JWT|
## Users/Family Members
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/users                     | Returns list of fellow users/family members         |
| GET          | /api/users/:id                 | Returns specific user by ID with more detail | 
## Recipes
| Request Type | Endpoint                       | Description               |
|:------------:|:------------------------------:|:-------------------------:|
| GET          | /api/recipes                   | Users can view their recipes|
| POST         | /api/recipes                   | Users can add a new recipe       |
| GET          | /api/recipes/:id               | Returns specific recipe by ID        |
| PUT          | /api/recipes/:id               | User can edit specific recipes               |
| DELETE       | /api/recipes/:id               | User can remove a specific recipe              |
