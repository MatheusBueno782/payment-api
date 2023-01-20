## Description

Payment Api to manage contractors and clients. The idea of this project is to, in a limited amount of time,
develop a system that is clean, consistent, and focused on respecting some classical development principles as
SOLID, YAGNI, etc. 

I Also took the decision to rewrite the original project, the idea behind this it to have more liberty
to define my architecture, take profit of ts and nest, and to avoid some pitfalls of refactoring. 
The rewriting process was pretty straightforward and the advantages of ts/nest saved me a lot of time.

About the architecture, taking account the limited amount of time I decided to not go for something 
fancy as clean architecture, but rather create something that let us open to evolve as the application 
grows. In this spirit I decided to split our main components in modules, each module has its model(s) that
compose our deepest layer. Our service(s), that contains our business logic. 
And our controller(s), that deals with service orchestration and with api's requests.
controller -> service -> model, should be the ideal flow for our requests.

We achieve loosely coupling among the layers and the modules by dependency injection, it's also the 
dependency injection  that allow us to avoid having infrastructure code on our business code. Sequelize 
is db agnostic(kind of) which allow us to change sqlLite to a more productionLevel sql in the future.

This architecture was designed to evolve so, if the situation requires, since we separated our components  we can move 
from a monolith to a monorepo almost effortlessly. we can also reduce even more our coupling by 
with a smooth transition to hexagonal architecture. To improve consistency we could define a more strict
set of rules with the help of eslint and tsconfig. NestJs works well for converting our system to 
microservices, and if we fell we should go serverless, we can use cloudFormation/terraform to configure
api gateway and lambda functions. 


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

$ npm run test:e2e

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


- More tests. I created only a few e2e tests, and their purpose is mainly to show the api working, if I 
had time I would focus on unit testes since they are cheaper and effective, I could also use jest's 
coverage tool to identify points that are lacking.


- Observability. I'm a big fan of this subject, and I strongly believe that by having observability we save a huge amount
of time on debugging and improve the overall performance of the entire team. That being said, unfortunately I didn't have time to 
implement logs, tracing, or metrics. If I had time, taking the size of the application I would focus on properly log our
requests, and try to extract consistent information for an eventual debugging.