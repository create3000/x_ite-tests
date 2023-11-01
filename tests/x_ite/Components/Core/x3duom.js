#!/usr/bin/env node

const
   path = require ("path");

// https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml

const
   x3doum = xml (sh `wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`),
   nodes  = new Map (x3doum .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode .map (node => [node .name, node]));

sh `find ${process .cwd ()}/../x_ite/src/x_ite/Components -type f -mindepth 2`
   .split ("\n")
   .sort ()
   .slice (10, 11)
   .forEach (s => node (s));

console .log ("Test done.");

function node (filename)
{
   const typeName = path .parse (filename) .name;

   // Filter abstract nodes.

   if (typeName .match (/^X3D/))
      return;

   const x3doum = nodes .get (typeName);

   // Filter non-standard nodes.

   if (!x3doum)
      return;

   const file = sh `cat ${filename}`;

   console .log (typeName, x3doum);
}

function sh (strings, ... values)
{
   const { execSync } = require ("child_process");

   return execSync (String .raw ({ raw: strings }, ... values), { encoding: "utf8", maxBuffer: 128 * 1024 * 1024 });
}

function xml (string)
{
   const { XMLParser } = require ("fast-xml-parser")

   const parser = new XMLParser ({
      ignoreAttributes: false,
      attributeNamePrefix: "",
   });

   return parser .parse (string);
}
