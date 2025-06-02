import { PrimaryKey } from "@mikro-orm/core";

export abstract class _BaseEntity {
  @PrimaryKey({ lazy: true, type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;
}
