import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
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
import { Select, SelectTrigger } from "@/components/ui/select";

export default function LearnPage() {
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
            <Separator orientation="vertical" className="mr-2 h-4" />
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
                      MYK
                    </span>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-4">
                    <Button variant="outline" className="h-fit flex-col gap-0 px-4">
                      <span className="text-wrap">Donnersbergkreis</span>
                      <div className="text-muted-foreground text-xs text-wrap">Rockenhausen</div>
                    </Button>
                    <Button variant="outline" className="h-fit flex-col gap-0 px-4">
                      <span className="text-wrap">Cochem-Zell</span>
                      <div className="text-muted-foreground text-xs text-wrap">Zell (Mosel)</div>
                    </Button>
                    <Button variant="outline" className="h-fit flex-col gap-0 px-4">
                      <span className="text-wrap">Landkreis Mayen-Koblenz</span>
                      <div className="text-muted-foreground text-xs text-wrap">Mayen-Koblenz</div>
                    </Button>
                    <Button variant="outline" className="h-fit flex-col gap-0 px-4">
                      <span className="text-wrap">Bad Dürkheim</span>
                      <div className="text-muted-foreground text-xs text-wrap">Dürkheim an der Weinstraße</div>
                    </Button>
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
                <div className="flex flex-col gap-4">
                  <Select>
                    <SelectTrigger className="w-full">Bundesland</SelectTrigger>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Switch id="details" />
                    <Label htmlFor="airplane-mode">Details einblenden</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" disabled />
                    <Label htmlFor="airplane-mode">Herleitung hervorheben</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
