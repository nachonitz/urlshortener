import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();
export default new DataSource({
  type: "mariadb",
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "usuario",
  password: process.env.DB_PASSWORD || "contraseña",
  database: process.env.DB_NAME || "nombre_base_de_datos",
  entities: ["src/infrastructure/typeorm/entities/*.ts"],
  migrations: ["migrations/*.ts"],
  synchronize: false,
});
