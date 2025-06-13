import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { _BaseEntity } from "./Base";
import { Country, Kfz } from "@/entities";

@Entity({ tableName: "state" })
export class State extends _BaseEntity {
  @Property()
  abbr!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Country)
  country!: Country;

  @OneToMany(() => Kfz, (kfz) => kfz.state)
  kfzs = new Collection<Kfz>(this);
}
