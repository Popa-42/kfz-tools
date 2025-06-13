import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { _BaseEntity } from "./Base";
import { State } from "@/entities";

@Entity({ tableName: "country" })
export class Country extends _BaseEntity {
  @Property()
  name!: string;

  @OneToMany(() => State, "country")
  states = new Collection<State>(this);
}
