<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
 
## Description

Global Accelerex Test API. Official documentation is <a href="http://127.0.0.1:3000/api/ target="\_blank">here</a>

## Installation

```bash
$ npm install
```

## Running app migrations

```bash
# generate migration
$ npm run migration:generate

# run migration
$  npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the seed

```bash
# development
$ npm run seed
```

## Running the file with docker

#requirement
install docker and docker-compose global in you machine

```bash
# production

$ run docker-compose up --build -d

$ run docker exec npm run migration:generate

$ run docker exec npm run migration:run

$ run docker exec npm run seed

```

Note: The api port is exposed to 30001 why the database phpmyadmin is exposed to 30002

db username is gauser
db password is  gapass

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
