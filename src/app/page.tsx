"use client";

import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import csv from "csv-parser";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState<Record<string, string>[]>();

  const handleButtonClick = () => {
    const results: Record<string, string>[] = [];
    fetch("/assets/data/de/kennzeichen.csv")
      .then((response) => response.text())
      .then((text) => {
        const parser = csv();
        parser.on("data", (row: Record<string, string>) => {
          results.push(row);
        });
        parser.on("end", () => {
          setData(results);
        });
        parser.write(text);
        parser.end();
      })
      .catch((error) => {
        console.error("Error fetching or parsing CSV:", error);
      });
  };

  return (
    <div>
      <h1>Kfz-Learner</h1>
      <p>Eine Webapp, um die deutschen Kfz-Kennzeichen zu lernen</p>
      <Button onClick={handleButtonClick}>
        <List />
        Kennzeichen aufzählen
      </Button>

      {data && (
        <>
          <h2>Ergebnisse:</h2>
          <ul>
            {Object.entries(
              data.reduce(
                (acc, item) => {
                  const bundesland = item["Bundesland.Name"] || "Unbekannt";
                  if (!acc[bundesland]) acc[bundesland] = [];
                  acc[bundesland].push(item);
                  return acc;
                },
                {} as Record<string, Record<string, string>[]>,
              ),
            )
              .sort()
              .map(([bundesland, items]) => (
                <section key={bundesland}>
                  <h3>{bundesland}</h3>
                  <ul>
                    {items.map((item, idx) => (
                      <li key={idx}>
                        {item["Unterscheidungszeichen"]}: {item["StadtOderKreis"]} (
                        {item["Herleitung"] &&
                          [...item["Herleitung"]].map((char, i) =>
                            /[A-ZÄÖÜẞ]/.test(char) ? <b key={i}>{char}</b> : char,
                          )}
                        )
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
