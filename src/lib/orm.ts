import { MikroORM } from "@mikro-orm/core";
import config from "../../mikro-orm.config";

let orm: MikroORM | null = null;

export const getOrm = async () => {
  if (!orm) {
    orm = await MikroORM.init(config);

    if (process.env.NODE_ENV !== "production") {
      await orm.getSchemaGenerator().updateSchema();
    }
  }
  return orm;
};

export const getEM = async () => {
  orm = await getOrm();
  return orm.em.fork();
};
