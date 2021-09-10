const verifyToken = require("../../util/generateToken");
const { Game } = require("../../models/models");

module.exports = () => {
  const GET = async (req, res, next) => {
    res.status(200).send();
  }

  let operations = {
    GET,
  };

  GET.apiDoc = {
    summary: "placeholder",
    operationId: "placeholder",
    responses: {
      200: {
        description: "placeholder"
      }
    }
  };

  return operations;
};
