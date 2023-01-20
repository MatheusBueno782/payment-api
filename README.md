## Description

Payment Api to manage contractors and clients. The idea of this project is to, in a limited amount of time,   


Note: this project was created with [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### TODOs

- implement `/balances/deposit/:userId`.
I had a lot of doubts about the requisites on this one, normally the best approach on this situation would be asking 
someone from the product team for clarification, but I don't have enough time. That being said, the most important point
if this endpoint is that the db operation **MUST** be done within a transaction, otherwise we will suffer from nasty 
race conditions, which can lead to inconsistencies on clients' balances.


- Better handle errors. Due to the lack of time I invoked http errors on the use case(service in Nest convention) layer,
I'm aware this is a bad practice. A good approach here would be using my own error classes with business errors and then 
convert it to Http errors using exceptionFilters.


- Better dependency injection. In this project I'm using dependency injection in the simplest(and fastest) way, this way I'm still 
using the concrete class as the type of my injected dependencies, thus still violating dependency inversion principle.
A simple solution for that would be extracting interfaces from the injectable, in association with a different approach
for registering the dependencies `{provide: DEPENDENCY_TOKEN, useClass: ConcreteClass}`.

- 

- Observability. I'm a big fan of this subject, and I strongly believe that by having observability we save a huge amount
of time on debugging and improve the overall performance of the entire team. That being said, unfortunately I didn't have time to 
implement logs, tracing, or metrics. If I had time, taking the size of the application I would focus on properly log our
requests, and try to extract consistent information for an eventual debugging.