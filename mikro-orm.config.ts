import { Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "@/entities/User";
import path from "path";
import "dotenv/config";

const config: Options = {
  clientUrl: process.env.DATABASE_URL,
  entities: [User],
  migrations: {
    path: path.join(__dirname, "src", "migrations"),
  },
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  debug: process.env.NODE_ENV !== "production",
};

export default config;
