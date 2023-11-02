const path = require ("path")

test ("documentation", () =>
{
   expect (sh `perl ${path .resolve (__dirname, "fields.pl")}`) .toBe ("Test done.\n")
})

test ("X3DUOM", () =>
{
   expect (sh `node ${path .resolve (__dirname, "x3duom.js")}`) .toBe (sh `cat ${path .resolve (__dirname, "x3duom.txt")}`)
})

function sh (strings, ... values)
{
   const { execSync } = require ("child_process");

   return execSync (String .raw ({ raw: strings }, ... values), { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
}
