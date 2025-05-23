import asyncio
import math as maths

import asyncpg
import dotenv
import pandas as pd

dotenv.load_dotenv()

DATABASE_URL = dotenv.get_key(dotenv.find_dotenv(), "DATABASE_URL")

DB_CONFIG = {
    "user": DATABASE_URL.split(":")[1].split("//")[1],
    "password": DATABASE_URL.split(":")[2].split("@")[0],
    "database": DATABASE_URL.split(":")[2].split("@")[1].split("/")[1],
    "host": DATABASE_URL.split("@")[1].split(":")[0],
    "port": int(DATABASE_URL.split(":")[2].split("@")[1].split("/")[0]),
}

CSV_PATH = "kennzeichen.csv"


async def get_state_id(conn, bundesland_name):
    query = "SELECT id FROM state WHERE name = $1"
    result = await conn.fetchrow(query, bundesland_name)
    if result:
        return result["id"]
    else:
        raise ValueError(f"Bundesland '{bundesland_name}' nicht gefunden in DB.")


async def insert_kfz(conn, symbol, region, derivation, derivation_marked, state_id, note):
    query = """
            INSERT INTO kfz (id, symbol, region, derivation, derivation_marked, state_id, note)
            VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6) RETURNING id \
            """
    result = await conn.fetchrow(query, symbol, region, derivation, derivation_marked, state_id, note)
    return result["id"]


async def main():
    df = pd.read_csv(CSV_PATH)
    conn = await asyncpg.connect(**DB_CONFIG)

    try:
        for idx, row in df.iterrows():
            symbol = row["Unterscheidungszeichen"]
            region = row["StadtOderKreis"]
            derivation = row["Herleitung"]
            derivation_marked = row["HerleitungMarkiert"]
            bundesland_name = row["Bundesland.Name"]
            note = row.get("Bemerkung", None)

            if isinstance(note, float) and maths.isnan(note):
                note = None

            state_id = await get_state_id(conn, bundesland_name)

            id = await insert_kfz(conn, symbol, region, derivation, derivation_marked, state_id, note)
            print(f"Inserted kfz {id} with symbol {symbol} and state_id {state_id}")

    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(main())
