#!/usr/bin/env node

// https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml

const x3doum = xml (sh `wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`);

console .log (x3doum);

sh `find ${process .cwd ()}/../x_ite/src/x_ite/Components -type f -mindepth 2`
   .split ("\n")
   .sort ()
   .forEach (s => node (s));

console .log ("Test done.");

function node (filename)
{
   // console .log (filename);
}

function sh (strings, ... values)
{
   const { execSync } = require ("child_process");

   return execSync (String .raw ({ raw: strings }, ... values), { encoding: "utf8", maxBuffer: 100 * 1024 * 1024 });
}

function xml (string)
{
   const { XMLParser } = require ("fast-xml-parser")

   const parser = new XMLParser ();

   return parser .parse (string);
}
