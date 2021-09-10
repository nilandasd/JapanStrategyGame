const generateToken = require("../../util/generateToken");
const { User } = require("../../models/models");
const bcrypt = require("bcrypt");

module.exports = () => {

  //LOGIN
  const GET = async (req, res, next) => { 
    try {
      const result = await User.findOne({ username: req.body.username }).exec();
      if (bcrypt.compareSync(req.body.password, result.password)) {
        await generateToken(res, req.body.username);
        res.status(200).json({
          description:
            "Login successful. A JWT has been stored as a cookie for further authorization. Expires in 1 day.",
        });
      } else {
        res.status(401).json({
          description: "Username taken",
        });
      }
    } catch (err) {
      return res.status(500).json({
        description: "Server error",
      });
    }
  };

  //SIGNUP
  const POST = async (req, res, next) => {
    console.log("in post");
    try {
      const user = await User.findOne({ username: req.body.username }).exec();
      if (user === null) {
        const hash = await bcrypt.hash(req.body.password, 13);
        const newUser = new User({
          username: req.body.username,
          password: hash,
        });
        await newUser.save();
        await generateToken(res, req.body.username);
        res
          .status(201)
          .json({
            description:
              "Signup successful. A JWT has been stored as a cookie for further authorization. Expires in 1 day.",
          });
      } else {
        res.status(401).json({
          description:
            "Username taken",
        });
      }
    } catch (err) {
      return res.status(500).json({
        description: "Server error",
      });
    }
  };

  let operations = {
    GET,
    POST,
  };


  GET.apiDoc = {
    summary: "Authenticate User",
    operationId: "loginUser",
    produces: ["application/json"],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "User to login.",
        required: true,
        schema: {
          $ref: "#/definitions/User",
        },
      },
    ],
    responses: {
      200: {
        description:
          "Login successful. A JWT has been stored as a cookie for further authorization. Expires in 1 day.",
      },
      400: {
        description: "Invalid login information",
      },
      500: {
        description: "server error",
      },
    },
  };

  POST.apiDoc = {
    summary: "Register New User",
    operationId: "createUser",
    produces: ["application/json"],
    parameters: [
      {
        name: "body",
        in: "body",
        description: "User to register.",
        required: true,
        schema: {
          $ref: "#/definitions/User",
        },
      },
    ],
    responses: {
      201: {
        description: "User created and authenticated. A JWT has been stored as a cookie for further authorization. Expires in 1 day.",
      },
      400: {
        description: "Invalid login information",
      },
      500: {
        description: "server error",
      },
    },
  };

  return operations;
};