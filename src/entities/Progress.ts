import { Entity } from "@mikro-orm/core";
import { _BaseEntity } from "./Base";

@Entity({ tableName: "progress" })
export class Progress extends _BaseEntity {}
