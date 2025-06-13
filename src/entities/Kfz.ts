import { Collection, Entity, ManyToMany, ManyToOne, Property } from "@mikro-orm/core";
import { Footnote, State } from "@/entities";
import { _BaseEntity } from "./Base";

@Entity({ tableName: "kfz" })
export class Kfz extends _BaseEntity {
  @Property()
  symbol!: string;

  @Property()
  region!: string;

  @Property()
  derivation!: string;

  @Property()
  derivationMarked!: string;

  @Property({ nullable: true })
  note?: string;

  @ManyToOne(() => State)
  state!: State;

  @ManyToMany(() => Footnote, "kfzs", { owner: true })
  footnotes = new Collection<Footnote>(this);
}
