# Self hosted tz-lookup server

A [tz-lookup](https://github.com/darkskyapp/tz-lookup) HTTP server.

## Install

    npm install

## Running

Start the server:

    node tz-lookup-server.js

Use environment variables PORT and IP for different port/host. F.e.:

    PORT=1337 node tz-lookup-server.js

## Query

    curl -s 'http://localhost:5266/?lat=42.7235&lon=-73.6931'

## License

Released under the [WTFPL version 2](http://sam.zoy.org/wtfpl/).
