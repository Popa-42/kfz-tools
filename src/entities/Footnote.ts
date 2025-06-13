import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { _BaseEntity } from "./Base";
import { Kfz } from "@/entities";

@Entity({ tableName: "footnote" })
export class Footnote extends _BaseEntity {
  @Property({ nullable: false, type: "text" })
  text!: string;

  @ManyToMany(() => Kfz, (kfz) => kfz.footnotes)
  kfzs = new Collection<Kfz>(this);
}
