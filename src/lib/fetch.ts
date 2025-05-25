import csv from "csv-parser";

const fetchCsvData = async (path: string): Promise<Record<string, string>[]> => {
  const results: Record<string, string>[] = [];
  const response = await fetch(path);
  const text = await response.text();
  const parser = csv();
  return new Promise((resolve, reject) => {
    parser.on("data", (row: Record<string, string>) => {
      results.push(row);
    });
    parser.on("end", () => {
      console.log("CSV parsing completed");
      resolve(results);
    });
    parser.on("error", reject);
    parser.write(text);
    parser.end();
  });
};

const fetchKennzeichen = () => fetchCsvData("/assets/data/de/kennzeichen.csv");
const fetchKennzeichenAuslaufend = () => fetchCsvData("/assets/data/de/kennzeichen.auslaufend.csv");
const fetchKennzeichenFussnoten = () => fetchCsvData("/assets/data/de/kennzeichen.fussnoten.csv");
const fetchSonderkennzeichen = () => fetchCsvData("/assets/data/de/sonderkennzeichen.csv");

export { fetchKennzeichen, fetchKennzeichenAuslaufend, fetchKennzeichenFussnoten, fetchSonderkennzeichen };
