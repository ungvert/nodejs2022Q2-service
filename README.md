# Home Library Service

REST api for home music library service.

[Assignment, part 1, REST Service: Basic](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)

[Assignment, part 2, Containerization, Docker](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization/assignment.md)

[Assignment, part 3, PostgreSQL & ORM](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/database-orm/assignment.md)

[Assignment, part 4, Authentication and Authorization](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/authentication/assignment.md)


[Assignment, part 5, Logging & Error Handling](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-handling/assignment.md)`


## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Install Docker](https://docs.docker.com/engine/install/)
- Docker Compose - [Install Docker Compose](https://docs.docker.com/compose/install/).

## Downloading

```bash
git clone https://github.com/ungvert/nodejs2022Q2-service.git
```

## Installing NPM modules

```bash
npm ci
```

### Create and setup .env file

```bash
cp .env.example .env
```

## Running application with docker

### Running application with db instance

```bash
docker compose up
```

Backend running in dev mode as default. You can change it by adding `command` in docker-compose.yml, in backend section.

Backend starts on port 4000 as default, can be changed in .env file.

### Run migrations for creating db entities

```bash
npm run migration:run
```

After starting the backend and db and running migrations you can open in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Stopping application 

```bash
docker compose down
```

### Scan backend docker file in registry for vulnerabilities 

```bash
npm run scan
```

Image with backend service pushed to Docker Hub: https://hub.docker.com/r/ungvert/nest-backend


### Running application locally

```bash
npm start
```

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test:auth
```

To run only one of all test suites

```bash
npm run test:auth -- <path to suite>
```

#### Auto-fix and format

```bash
npm run lint
```

```bash
npm run format
```

#### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
