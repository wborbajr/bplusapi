"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const config = require("../package.json");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  const swaggerOptions = {
    info: {
      title: config.description + " Documentation",
      version: config.version
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  // API Route
  await server.register({
    plugin: require("./routes/api")
  });

  // await server.register({
  //     plugin: require('your-route-folder/users'),
  //     options: {
  //         routes: {
  //             prefix: '/user'
  //         }
  //     }
  // });

  await server.start();
  console.log(
    "%s Server %s running on %s",
    config.description,
    config.version,
    server.info.uri
  );
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
