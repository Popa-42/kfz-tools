import { Collection, Entity, ManyToMany, ManyToOne, Property } from "@mikro-orm/core";
import { _BaseEntity, Footnote, State } from "@/entities";

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

  @Property()
  note?: string;

  @ManyToOne(() => State)
  state!: State;

  @ManyToMany(() => Footnote, "kfzs", { owner: true })
  footnotes = new Collection<Footnote>(this);
}
