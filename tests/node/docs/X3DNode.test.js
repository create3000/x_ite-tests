import { expect, test } from "vitest";

const path = require ("path");

test .concurrent ("documentation", () =>
{
   expect (sh `perl "${path .resolve (__dirname, "documentation.pl")}"`) .toBe ("Test done.\n");
},
60_000);

test .concurrent ("X3DUOM", () =>
{
   expect (sh `node "${path .resolve (__dirname, "x3duom.js")}"`)
      .toBe (sh `cat "${path .resolve (__dirname, "x3duom.txt")}"`);
},
60_000);

function sh (strings, ... values)
{
   const { execSync } = require ("child_process");

   return execSync (String .raw ({ raw: strings }, ... values), { encoding: "utf8", maxBuffer: Infinity });
}

