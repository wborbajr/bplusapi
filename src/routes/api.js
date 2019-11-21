exports.plugin = {
  async register(server, options) {
    server.route([
      {
        method: "GET",
        path: "/api",
        options: {
          description: "main request handler",
          notes: "Returns a todo item by the id passed in the path",
          tags: ["api"], // ADD THIS TAG
          handler: async (request, h) => {
            return "It's Works!";
          }
        }
      },
      {
        method: "GET",
        path: "/api/{id}",
        options: {
          description: "main request handler",
          handler: async (request, h) => {
            return h.view("detail_page", {
              title: "Detail Page",
              id: request.params.id
            });
          }
        }
      }
    ]);
  },
  version: require("../../package.json").version,
  name: "route-main"
};
