# Code33129

This projet is the set of API for code33129, an application dedicated to Africans coomics.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Before starting to use this projet, you have to clone it.

```
git clone https://gitlab.com/metroide/code33129-bd-api.git
```

### Installing

A step by step series of examples that tell you how to get a development env running.

For the moment work with the fake production cluster
```
cd code33129
npm install
npm run prod
```
These are supplementary packages that will be usefull when runing the project:
* npm install pm2 -g

* npm install artillery -g

In dev, you will only run

```
npm run dev
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```


### Start mongo DB locally

Explain what these tests test and why

```
net start MongoDB
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [NodeJS](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [ExpressJs](https://expressjs.com/) -  is a web application framework for Node.js.
* [MongoDB](https://www.mongodb.com/) - a cross-platform document-oriented database program. 

## Versioning

We use [GitLab](https://gitlab.com/) for versioning. For the versions available. 

## Authors

* **Dimedrik Feudjieu** - *Initial work*
* **Saint Germes**

## License

Private code. No reuse somewhere. *@copyrigth2020*

## Acknowledgments
* Inspiration
* etc

{
  "bind_address": "127.0.0.1",
  "database": {
    "user": "",
    "password": "",
    "connectionString": "mongodb://127.0.0.1:27017/code33129_db"
  },
  "jwt": {
    "secret": "C@d@6@3",
    "expire": "30d",
    "cookie_expire": 30
  },
  "smtp": {
    "host": "smtp.mailtrap.io",
    "port": 2525,
    "email": "",
    "password": "",
    "from_email": "noreply@code33129.io",
    "from_name": "Code33129"
  }
}