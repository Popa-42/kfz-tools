type UUID = string;

type State = {
  id: UUID;
  name: string;
  abbr: string;
  note?: string;
};

type Kfz = {
  id: UUID;
  symbol: string;
  region: string;
  derivation: string;
  derivation_marked: string;
  state_id: UUID;
  note?: string;
  state: Omit<State, "id" | "note">;
  footnotes?: {
    id: UUID;
    kfz_id: UUID;
    footnote: number;
    footnoteRef: {
      text: string;
    };
  }[];
};
