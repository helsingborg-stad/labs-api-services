# labs-api-services
Api for storing and exposing services; 

## Development
Prerequisite: local MySQL server running

1. Clone repository
2. Install dependencies with npm install
3. Create .env-file in the root folder with these properties
````
   PORT=3002 #(or any other port you prefer)
   LOG_LEVEL=info #(trace, debug, info, warn, error, fatal, silent)
````
4. run ```npm run migrate:latest``` (this will migrate your mysql schemas to the latest version)
5. Run project with ```npm run dev```

## Documentation

Documentation for apis built from this applications should be split into two sections. Project related information should be written in the README-file for the repository, and specific instructions for calling the api should be documented with Swagger which is included in the project by default.

## Swagger

Swagger is a set of open-source tools built around the OpenAPI Specification that can help you design, build, document and consume REST APIs. The Swagger tools include in this project is:

**Swagger UI**

Swagger UI allows anyone — be it the development team or the end consumers — to visualize and interact with the API’s resources without having any of the implementation logic in place. 
It’s automatically generated from your OpenAPI (formerly known as Swagger) Specification, with the visual documentation making it easy for back end implementation and client side consumption.

The Swagger document can be accessed with the following URLs (whenever the server is running) :  
http://localhost:3002/api-docs


### Tests

The project uses [mocha](https://mochajs.org/) + [chai](https://www.chaijs.com/) for testing.

Running tests:

1. Create .env.test-file in the root folder with same settings as the regular .env but with a different port.
2. Run the command ```npm run test```

To run the tests on code-changes, use ```npm run test:watch```

All files following the *.test.js-syntax will be included.

## Deployment
TODO

## Docker

This app can be built using [docker](https://www.docker.com/). To do so, simply navigate to the root of the project and run:

```
docker build . -t [tag] && \
docker run -d \
-p [host-port]:[server-port] \
-e PORT=[server-port] \
-e SERVER_KEY=./assets/certificates/server.key \
-e SERVER_CERT=./assets/certificates/server.cert \
[tag]
```

Further, you can thus use [docker-compose](https://docs.docker.com/compose/) to orchestrate containers created from this repository (and other dockerized apps). When developing, we use [this](https://github.com/helsingborg-stad/labs-docker-compose) specific docker-compose file.
