# Project Management Tool API

This is the backend (API) for a simple project management tool. The user needs to be able to shift the different tiles to the relevant phases in which the project is located. It uses MongoDB, Express, and Node.js.

There can be multiple `Board`s (e.g. Spring, Summer, Autumn, Winter). Every `Board` has `Phase`s (e.g. Flowcharts, Wireframes etc). A project is represented in a `Tile` which can be moved along the `Phase`s. When the user calls `/board` it should retrieve its associated `Phase`s and the phase's associated `Tile`s. Only authenticated users, however, can create, update, or delete a `Board`, `Phase`, or `Tile`.

*Example*: https://calm-badlands-76166.herokuapp.com/board/5cc461a05bf1ef00171a9c1d

## Instructions

1. Connect to the database and create schemas/models
2. Tile management (creating, retrieving, updating, and deleting tiles)
3. Making the tiles movable between phases
4. Authentication on the create, update, and delete routes
5. _What would you like to add to the API yourself to make it better/easier to use?_

## Installation

Clone the repository.

```
docker-compose build
docker-compose up
```

It will be available on [localhost:3000](localhost:3000).

The database can be reset and sample data can be loaded with the following commands:

```
docker-compose run app npm run truncate
docker-compose run app npm run sample
```

### Tests

Tests can be run here:

```
docker-compose run app npm test
```

NB: Authentication killed the tests 🤯 — need to stub the authentication middleware.

## Set up

After running the sample data...

Register a new user with the email bruce@avengers.com with the password _peas_:

```bash
curl --request POST \
  --url http://localhost:3000/register \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'name=Professor%20Hulk&email=bruce%40avengers.com&password=peas'
```

Then login to retrieve your `token`:

```bash
curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'email=bruce%40avengers.com&password=peas'
```

In the create, update, and delete routes, use the returned `token` as your _Authorization_ header:

```bash
curl --request POST \
  --url http://localhost:3000/board \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYzQ1NTNmM2QwNzg4MDMzZmZjM2VhOCIsIm5hbWUiOiJQcm9mZXNzb3IgSHVsayIsImlhdCI6MTU1NjM3MDg4MywiZXhwIjoxNTU2NDA2ODgzfQ.cvvYPCSbXRZla_7rWhi6pi2SeoYJr9hKz7OatWyAJp4' \
  --header 'Content-Type: application/json' \
  --data '{\n	"name": "2019"\n}'
```

### Routes

| ROUTE | METHOD | REQUEST BODY | RESPONSE CODE | Notes |
|------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------|
| /register | POST | {  "name": "Professor Hulk",  "email": "bruce@banner.com",  "password": "peas" } | 201 |  |
| /login | POST | {  "email": "bruce@banner.com",  "password": "peas" } | 200 |  |
| /boards | GET |  | 200 |  |
| /board | POST | {  "name": "Winter 2019",  "description": "tba"  } | 201 | * requires _Authorization_ header |
| /board/:id | GET |  | 200 | Returns `Board` information with its associated `Phases` and its `Tiles`. |
| /board/:id | PATCH | {  "description": "Snowtime projects." } | 200 | * requires _Authorization_ header |
| /board/:id | DELETE |  | 204 | * requires _Authorization_ header |
| /phase | POST | {  "name": "Review",  "board": <boardId> } | 201 | * requires _Authorization_ header |
| /phase/:id | GET |  | 200 | Returns the specified `Phase` information and the `Tiles` currently assigned to it. |
| /phase/:id | PATCH | {  "name": "Mgt Review" } | 200 | * requires _Authorization_ header |
| /phase/:id | DELETE |  | 204 | * requires _Authorization_ header |
| /tile | POST | {  "name": "Avocado Infinity"  "description": "Wayfarers ugh sustainable."  "board": `<boardId>`,  "phase": `<phaseName`> } | 201 | * requires _Authorization_ header |
| /tile/:id | GET |  | 200 |  |
| /tile/:id | PATCH | {   "phase": `<newPhaseId>` } | 200 | * requires _Authorization_ header  The IDs of the phases associated with the `Board` can be found on `GET /board/:id` |
| /tile/:id | DELETE |  | 204 | * requires _Authorization_ header |

### Considerations/to-do list

* _Tile_ should also include information like _TeamMembers_, _Client_, and associated URLs.
* Improve authentication — and figure out a nice way to check authentication on routes, and to stub the tests.
* Tiles on creation can be assigned a phase through a name (e.g. "Flowcharts") but moving it (through `PATCH`) requires a phase ID. It should also be moveable via name. Default phases should be the 'first' phase.
* JSON responses should be cleaned up to only show the essentials — and `GET /board` should only show `board.phases` and not also `board.tiles` because they are already shown in `board.phases`.
