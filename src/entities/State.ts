import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { _BaseEntity, Country, Kfz } from "@/entities";

@Entity({ tableName: "state" })
export class State extends _BaseEntity {
  @Property()
  abbr!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Country)
  country!: Country;

  @OneToMany(() => Kfz, "id")
  kfzs = new Collection<Kfz>(this);
}
