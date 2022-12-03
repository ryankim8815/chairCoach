"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var cors_1 = __importDefault(require("cors"));
require("dotenv").config();
var swagger = (0, express_1.default)();
swagger.use((0, cors_1.default)());
//swaggerUi
var swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Elice AI 5기 3차 4팀 팀프로젝트의 API",
        version: "1.0.0",
        description: "API description: 화이팅!!",
    },
    servers: [
        {
            description: "로컬환경",
            url: "http://localhost:".concat(process.env.SERVER_PORT),
        },
        {
            description: "서버환경",
            url: "http://".concat(process.env.DB_HOST, ":").concat(process.env.SERVER_PORT),
        },
    ],
    tags: [
        {
            name: "userRouter",
            description: "userRouter.ts",
        },
        {
            name: "neckRouter",
            description: "neckRouter.ts",
        },
        {
            name: "bodyRouter",
            description: "bodyRouter.ts",
        },
    ],
    host: "".concat(process.env.DB_HOST, ":").concat(process.env.SERVER_PORT),
    basePath: "/",
    components: {
        securitySchemes: {
            bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        },
        schemas: {
            users: {
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
                    provider: {
                        type: "string",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                    withdraw_at: {
                        type: "timstamp",
                    },
                    status: {
                        type: "string",
                    },
                },
            },
            bodies: {
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
                    start_time: {
                        type: "timstamp",
                    },
                    end_time: {
                        type: "timstamp",
                    },
                },
            },
            necks: {
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
                        type: "flost",
                    },
                    score: {
                        type: "int",
                    },
                    created_at: {
                        type: "timstamp",
                    },
                },
            },
            codes: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "PK",
                    },
                    code: {
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
var option = {
    swaggerDefinition: swaggerDefinition,
    apis: ["./src/routers/*.js"], // 디렉터리 선언이 상대경로인데 본 파일 기준이 아니라 back 기준으로 선언해야함. 이것 때문에 시간이 오래 걸림
    //   swaggerPaths,
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(option);
// Docs in Json format
swagger.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
// Swagger page
swagger.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
module.exports = swagger;
