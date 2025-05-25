"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SelectSeparator } from "@/components/ui/select";
import { ComboboxWithCheckbox } from "@/components/ui/combobox";
import React, { useEffect, useState } from "react";

export default function LearnPage() {
  const [filterStates, setFilterStates] = useState<Record<"value" | "label", string>[]>([]);
  const [details, setDetails] = useState(false);
  const [highlightDerivation, setHighlightDerivation] = useState(false);
  const [allKfz, setAllKfz] = useState<Kfz[]>([]);

  const [correctKfzIndex, setCorrectKfzIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchKfzData() {
      try {
        if (filterStates.length === 0) {
          const response = await fetch("/api/kfz/get/all");
          if (!response.ok) {
            throw new Error("Failed to fetch Kfz data");
          }
          const data: Kfz[] = await response.json();
          data.sort(() => Math.random() - 0.5);
          setAllKfz(data);
        } else {
          const regions = filterStates.map((state) => state.value);
          const response = await fetch(`/api/kfz/get/${regions.join("/")}`);
          if (!response.ok) {
            throw new Error("Failed to fetch Kfz data for selected states");
          }
          const data: Kfz[] = await response.json();
          data.sort(() => Math.random() - 0.5);
          setAllKfz(data);
        }
      } catch (error) {
        console.error("Error fetching Kfz data:", error);
      }
    }

    fetchKfzData().then((r) => r);
  }, [filterStates]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className={`
            flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear
            group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12
          `}
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <SelectSeparator />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href="/">Startseite</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Kfz-Kennzeichen zuordnen</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Erklärung</CardTitle>
                <CardDescription>So funktioniert das Spiel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 text-sm">
                  <p>
                    Du siehst ein Kennzeichen und musst es dem richtigen Landkreis zuordnen. Klicke auf den
                    entsprechenden Landkreis, um deine Antwort abzugeben.
                  </p>
                  <p>Ob du richtig oder falsch liegst, erfährst du sofort.</p>
                  <p>
                    Das Spiel weiß auch, ob du das Kennzeichen schon einmal gesehen hast. Wenn du es bisher noch nicht
                    kanntest, ist es nicht so schlimm, wenn du zum ersten Mal falsch rätst.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex w-full items-center justify-center">
                    <span className="font-head w-fit rounded-md border px-4 py-2 text-center text-2xl font-extrabold">
                      {allKfz[correctKfzIndex]?.symbol || "???"}
                    </span>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2">
                    {/* Map the first four options as Buttons */}
                    {allKfz.slice(0, 4).map((kfz) => (
                      <Button key={kfz.id} variant="outline" className="h-fit flex-col gap-0 px-4">
                        <span className="text-wrap">{kfz.region}</span>
                        {details && (
                          <div className="text-muted-foreground text-xs text-wrap">
                            {highlightDerivation ? (
                              <span>
                                {kfz.derivation_marked.split("").map((char, idx) =>
                                  /[A-ZÄÖÜ]/.test(char) ? (
                                    <b className="text-primary" key={idx}>
                                      {char}
                                    </b>
                                  ) : (
                                    <span key={idx}>{char}</span>
                                  ),
                                )}
                              </span>
                            ) : (
                              kfz.derivation
                            )}
                          </div>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Einstellungen</CardTitle>
                <CardDescription>Hier kannst du die Einstellungen anpassen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="state-filter">Filtern nach Bundesland</Label>
                  <ComboboxWithCheckbox
                    id="state-filter"
                    className="mb-4 w-full"
                    placeholder="Alle Bundesländer"
                    noneFoundText="Keine Bundesländer gefunden"
                    searchPlaceholder="Bundesland suchen..."
                    options={[
                      { value: "DE-BB", label: "Brandenburg" },
                      { value: "DE-BE", label: "Berlin" },
                      { value: "DE-BW", label: "Baden-Württemberg" },
                      { value: "DE-BY", label: "Bayern" },
                      { value: "DE-HB", label: "Bremen" },
                      { value: "DE-HE", label: "Hessen" },
                      { value: "DE-HH", label: "Hamburg" },
                      { value: "DE-MV", label: "Mecklenburg-Vorpommern" },
                      { value: "DE-NI", label: "Niedersachsen" },
                      { value: "DE-NW", label: "Nordrhein-Westfalen" },
                      { value: "DE-RP", label: "Rheinland-Pfalz" },
                      { value: "DE-SH", label: "Schleswig-Holstein" },
                      { value: "DE-SL", label: "Saarland" },
                      { value: "DE-SN", label: "Sachsen" },
                      { value: "DE-ST", label: "Sachsen-Anhalt" },
                      { value: "DE-TH", label: "Thüringen" },
                    ]}
                    selected={filterStates}
                    onSelectedChange={setFilterStates}
                  />

                  <div className="flex items-center space-x-2">
                    <Switch id="details" checked={details} onCheckedChange={setDetails} />
                    <Label htmlFor="details">Details einblenden</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="highlight-derivation"
                      disabled={!details}
                      checked={highlightDerivation}
                      onCheckedChange={setHighlightDerivation}
                    />
                    <Label htmlFor="highlight-derivation">Herleitung hervorheben</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Debug</CardTitle>
                <CardDescription>Hier kannst du Debug-Informationen sehen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="debug-details">Details:</Label>
                  <pre className="bg-muted rounded-md p-4 text-xs">
                    {JSON.stringify(
                      {
                        filterStates,
                        details,
                        highlightDerivation,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Mehr Debug-Zeug</CardTitle>
                <CardDescription>Hier ist noch mehr Debug-Information zu sehen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Label htmlFor="debug-kfz">Kfz-Daten:</Label>
                  <pre className="bg-muted max-h-50 overflow-auto rounded-md p-4 text-xs">
                    {JSON.stringify(allKfz, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
