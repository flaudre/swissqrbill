import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { SwissQRBill } from "./svg-lib.js";

const defaultData = {
  amount: 1994.75,
  creditor: {
    account: "CH44 3199 9123 0008 8901 2",
    address: "Musterstrasse",
    buildingNumber: 7,
    city: "Musterstadt",
    country: "CH",
    name: "SwissQRBill",
    zip: 1234
  },
  currency: "CHF",
  debtor: {
    address: "Musterstrasse",
    buildingNumber: 1,
    city: "Musterstadt",
    country: "CH",
    name: "Peter Muster",
    zip: 1234
  },
  reference: "21 00000 00003 13947 14300 09017"
};

const [dataPath, outputPath = "output/qr-slip.svg"] = process.argv.slice(2);
const resolvedOutputPath = resolve(outputPath);
const outputDir = dirname(resolvedOutputPath);

mkdirSync(outputDir, { recursive: true });

const data = dataPath
  ? JSON.parse(readFileSync(resolve(dataPath), "utf8"))
  : defaultData;

const qrBill = new SwissQRBill(data);
writeFileSync(resolvedOutputPath, qrBill.toString());

console.log(`QR slip written to ${resolvedOutputPath}`);
