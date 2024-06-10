import express, { Application } from "express";
import sequelize from "./database";
import apiRouter from "./routes/index";
import authRouter from "./routes/authRoutes";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT: number = parseInt(process.env.PORT || "5000");

const app: Application = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/auth", authRouter);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Shop App",
      description: "Shop API Info",
      contact: {
        name: "Leonid Tishalovich",
      },
      servers: "http://localhost:5000",
    },
  },
  apis: ["src/routes/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
  });
};

start();
