#!/usr/bin/env node

// https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml

sh`find ${process .cwd ()}/../x_ite/src/x_ite/Components -type f -mindepth 2`
   .split ("\n")
   .sort ()
   .forEach (s => node (s));

console .log ("Test done.");

function node (filename)
{
   console .log (filename);
}

function sh (strings, ... values)
{
   const { execSync } = require ("child_process");

   return execSync (String .raw ({ raw: strings }, ... values), { encoding: "utf8" });
}
