import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
// import path from "path";
// import yaml from "yamljs";
// import userRouter from "../routers/userRouter";
import cors from "cors";
require("dotenv").config();

const swagger = express();
swagger.use(cors());

//swaggerUi
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Elice AI 5기 3차 4팀 팀프로젝트의 API",
    version: "1.0.0",
    description: "API description: 화이팅!!",
  },
  servers: [
    {
      description: "로컬환경",
      url: `http://localhost:${process.env.SERVER_PORT}`,
    },
    {
      description: "서버환경",
      url: `http://${process.env.DB_HOST}:${process.env.SERVER_PORT}`,
    },
  ],
  tags: [
    {
      name: "userRouter",
      description: "userRouter.ts",
    },
  ],
  host: `${process.env.DB_HOST}:${process.env.SERVER_PORT}`,
  basePath: "/",
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            description: "PK, UUID",
          },
          password: {
            type: "string",
          },
          email: {
            type: "string",
          },
          nickname: {
            type: "string",
          },
          profile_image: {
            type: "string",
          },
          provider: {
            type: "string",
          },
          created_at: {
            type: "timstamp",
          },
        },
      },
      attendance: {
        type: "object",
        properties: {
          atnd_id: {
            type: "string",
            description: "PK, UUID",
          },
          user_id: {
            type: "string",
          },
          created_at: {
            type: "timstamp",
          },
        },
      },
      body: {
        type: "object",
        properties: {
          body_id: {
            type: "string",
            description: "PK, UUID",
          },
          user_id: {
            type: "string",
          },
          tag: {
            type: "string",
          },
          created_at: {
            type: "timstamp",
          },
        },
      },
      neck: {
        type: "object",
        properties: {
          neck_id: {
            type: "string",
            description: "PK, UUID",
          },
          user_id: {
            type: "string",
          },
          filename: {
            type: "string",
          },
          result: {
            type: "string",
          },
          created_at: {
            type: "timstamp",
          },
        },
      },
      self: {
        type: "object",
        properties: {
          self_id: {
            type: "string",
            description: "PK, UUID",
          },
          user_id: {
            type: "string",
          },
          filename: {
            type: "string",
          },
          result: {
            type: "string",
          },
          created_at: {
            type: "timstamp",
          },
        },
      },
    },
  },
};
const option = {
  swaggerDefinition,
  apis: ["./src/routers/*.js"], // 디렉터리 선언이 상대경로인데 본 파일 기준이 아니라 back 기준으로 선언해야함. 이것 때문에 시간이 오래 걸림
  //   swaggerPaths,
};

const swaggerSpec = swaggerJSDoc(option); // json
// const swaggerSpec = yaml.load(path.join(__dirname, "./build.yarm")); // yaml

// Docs in Json format
swagger.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Swagger page
swagger.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export = swagger;
