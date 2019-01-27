# TSCore Sample App

This sample project demostrates the usage of `tscore` module (https://www.npmjs.com/package/@dpjayasekara/tscore)

# Setting up

- Clone the project
- In project directory, run:

```
npm install
```

- To start the application, run:

```
npm start
```

The sample web server will listen on the port configured in `config.json` (current port 8809).

The following simple endpoints are built in:

```
http://localhost:8809/a
```

```
http://localhost:8809/b
```

```
# get square of any given number as a url paramter
http://localhost:8809/square/:number
```