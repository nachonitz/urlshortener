import express from "express";
import accountRoutes from "./infrastructure/routes/accountRoutes";
import "reflect-metadata";
import cors from "cors";
import AppDataSource from "./infrastructure/typeorm/typeorm.config";

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const app = express();

AppDataSource.initialize()
  .then(() => {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/shorturl", accountRoutes);
  })
  .catch((error: any) => console.log("Error initializing DataSource", error));

export default app;
