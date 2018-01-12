# Feeds app with Spring Boot and Angular
 
Example of a Feeds app with Upvoting System and Facebook sign in/up with Spring Boot and Angular 5.

**Prerequisites:** [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Node.js](https://nodejs.org/).


## Getting Started

1 - Put your own facebook app id in Frontend/src/app/services/Secrets.ts

2 - Configure the Database in Backend/src/main/resources/application.properties the app use Mysql by default

To run the server, cd into the `Backend` folder and run:
 
```bash
 mvn spring-boot:run
```

cd into the `Frontend` folder and run:
 
```bash
npm install
```
To run Client app :

```bash
npm start
```

