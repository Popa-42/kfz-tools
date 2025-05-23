import asyncio
import math as maths

import asyncpg
import dotenv
import pandas as pd

dotenv.load_dotenv()

DB_USER = dotenv.get_key(dotenv.find_dotenv(), "DB_USER")
DB_PASSWORD = dotenv.get_key(dotenv.find_dotenv(), "DB_PASSWORD")
DB_NAME = dotenv.get_key(dotenv.find_dotenv(), "DB_NAME")
DB_HOST = dotenv.get_key(dotenv.find_dotenv(), "DB_HOST")
DB_PORT = int(dotenv.get_key(dotenv.find_dotenv(), "DB_PORT"))

DB_CONFIG = {
    "user": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "port": DB_PORT,
}

CSV_PATH = "kennzeichen.csv"


async def get_kfz_id(conn, symbol):
    query = "SELECT id FROM kfz WHERE symbol = $1"
    result = await conn.fetchrow(query, symbol)
    if result:
        return result["id"]
    else:
        raise ValueError(f"Kfz mit Symbol '{symbol}' nicht gefunden.")


async def get_or_create_footnote(conn, footnote_num):
    # Check if footnote already exists
    query = "SELECT id FROM footnote WHERE id = $1"
    result = await conn.fetchrow(query, footnote_num)
    if result:
        return result["id"]

    # If not, insert new footnote with empty text (du kannst das anpassen)
    query = "INSERT INTO footnote (id, text) VALUES ($1, '') RETURNING id"
    result = await conn.fetchrow(query, footnote_num)
    return result["id"]


async def insert_kfz_to_footnote(conn, kfz_id, footnote_id):
    query = """
            INSERT INTO kfz_to_footnote (id, kfz_id, footnote)
            VALUES (gen_random_uuid(), $1, $2)
            ON CONFLICT DO NOTHING \
            """
    await conn.execute(query, kfz_id, footnote_id)


async def main():
    df = pd.read_csv(CSV_PATH)
    conn = await asyncpg.connect(**DB_CONFIG)

    try:
        for idx, row in df.iterrows():
            symbol = row["Unterscheidungszeichen"]
            footnotes_str = row.get("Fußnoten", "")

            if isinstance(footnotes_str, float) and maths.isnan(footnotes_str):
                continue

            footnotes = [f.strip() for f in footnotes_str.split(",") if f.strip().isdigit()]
            if not footnotes:
                continue

            kfz_id = await get_kfz_id(conn, symbol)

            for footnote_num_str in footnotes:
                footnote_num = int(footnote_num_str)
                footnote_id = await get_or_create_footnote(conn, footnote_num)
                await insert_kfz_to_footnote(conn, kfz_id, footnote_id)
                print(f"Linked footnote {footnote_num} to {symbol}")

    finally:
        await conn.close()


if __name__ == "__main__":
    asyncio.run(main())
