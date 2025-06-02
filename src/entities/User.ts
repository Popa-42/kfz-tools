import { Entity, Property } from "@mikro-orm/core";
import { _BaseEntity } from "@/entities/Base";

@Entity({ tableName: "user" })
export class User extends _BaseEntity {
  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ type: "date", onCreate: () => new Date() })
  createdAt: Date = new Date();
}
