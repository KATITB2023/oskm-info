/* eslint-disable @typescript-eslint/no-misused-promises */
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";

const prisma = new PrismaClient();

interface RawCSVData {
  title: string;
  rawLongitude: string;
  rawLatitude: string;
}

function main() {
  /** Data for your test environment */
  const csvFilePath = path.resolve(__dirname, "pengmas.csv");
  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: ["title", "rawLongitude", "rawLatitude"]
    },
    async (err, records: RawCSVData[]) => {
      if (err) console.error(err);

      const map = await prisma.map.findUnique({
        where: {
          campus: "Pengmas"
        }
      });

      if (!map) {
        console.error("Map not found");
        return;
      }

      const mapLocations = await Promise.all(
        records.map(async (record) => {
          try {
            const mapLocation = await prisma.mapLocation.create({
              data: {
                title: record.title,
                Map: {
                  connect: {
                    id: map.id
                  }
                },
                baseLatitude: parseFloat(record.rawLatitude),
                baseLongitude: parseFloat(record.rawLongitude)
              }
            });

            return mapLocation;
          } catch (e) {
            console.log(record.title);
            throw e;
          }
        })
      );

      console.log(mapLocations);
    }
  );
}

main();
