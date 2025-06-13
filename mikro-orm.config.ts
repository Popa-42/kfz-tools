import { Options, ReflectMetadataProvider } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";
import "dotenv/config";
import { Country, Footnote, Kfz, State, User } from "@/entities";
import { _BaseEntity } from "@/entities/Base";

const config: Options = {
  clientUrl: process.env.DATABASE_URL,
  entities: [_BaseEntity, Country, Footnote, Kfz, State, User],
  migrations: {
    path: path.join(__dirname, "src", "migrations"),
  },
  driver: PostgreSqlDriver,
  metadataProvider: ReflectMetadataProvider,
  debug: process.env.NODE_ENV !== "production",
  schema: process.env.node_env === "production" ? "production" : "development",
  schemaGenerator: {
    disableForeignKeys: false,
    createForeignKeyConstraints: true,
  },
  forceEntityConstructor: true,
  allowGlobalContext: true,
};

export default config;
