"use client";

import React, {useEffect, useState} from "react";
import {fetchKennzeichen} from "@/lib/fetch";
import {Button} from "@/components/ui/button";

export default function Home() {
  const [data, setData] = useState<Record<string, string>[]>();
  const [currentKfz, setCurrentKfz] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    fetchKennzeichen().then((r) => {
      r.sort(() => Math.random() - 0.5);
      setData(r);
      setCurrentKfz(pickRandomKfz(r));
    });
  }, []);

  const pickRandomKfz = (data: Record<string, string>[], filterState?: string): Record<string, string> | null => {
    if (data) {
      if (filterState) {
        data = data.filter((item) => item["Bundesland.Iso3166-2"] === filterState);
      }
      data.sort(() => Math.random() - 0.5);
      return data[0];
    }
    return null;
  };

  return (
    <div>
      <h1>Kfz-Learner</h1>
      <Button onClick={() => setCurrentKfz(pickRandomKfz(data ?? []))} className="mb-4">
        Randomise
      </Button>
      <h2>Zufällige Kennzeichen:</h2>
      {
        data ? data.map((kfz, index) => index >= 5 ? null :(
          <React.Fragment key={index}>
            <h3>{kfz["Unterscheidungszeichen"]}</h3>
            <b>{kfz["Bundesland.Name"]} </b>
            <div>{kfz["StadtOderKreis"]}</div>
            <div className="text-muted-foreground text-xs">
              {kfz["HerleitungMarkiert"].split("").map((char, index) => {
                if (/[A-ZÄÖÜẞ]/.test(char)) {
                  return <b key={index}>{char}</b>;
                } else {
                  return <React.Fragment key={index}>{char}</React.Fragment>;
                }
              })}
            </div>
          </React.Fragment>
        )
      ) : (
        <p>Lade...</p>
      )}
    </div>
  );
}
