const apiDoc = {
  swagger: "2.0",
  basePath: "/",
  info: {
    title: "Japan Strategy Game",
    version: "1.0.0",
  },
  definitions: {
    User: {
        type: "object",
        properties: {
            username: {
                type: "string"
            },
            password: {
                type: "string"
            }
        }
    },
    Game: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
      required: ["id", "message"],
    },
  },
  paths: {},
};

module.exports = apiDoc;
