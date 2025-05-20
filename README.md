# Kfz-Learner

Eine Webapp, mit der man alle deutschen Kfz-Kennzeichen lernen kann.

## Installation

### Vorraussetzungen

- Node.js
- npm
- Git

### Klonen und installieren

Zunächst muss das Projekt geklont werden:

```bash
git clone https://github.com/Popa-42/kfz-kennzeichen-lernen/tree/create-base-logic
cd kfz-kennzeichen-lernen
```

Danach müssen die Abhängigkeiten installiert werden:

```bash
npm install
```

### Starten

Um die App im Entwicklermodus zu starten, führe folgenden Befehl aus:

```bash
npm run dev
```

Die App ist dann unter `http://localhost:8080` erreichbar.

## Datenquelle

Die Daten der Kfz-Kennzeichen stammen von [openpotato/kfz-kennzeichen](https://github.com/openpotato/kfz-kennzeichen)
und sind unter der Open Database License (ODbL) Version 1.0 lizenziert. Die Daten wurden in das Projekt integriert und
sind im Ordner `public/assets/data` zu finden.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die [LICENSE](LICENSE) Datei für Details.
