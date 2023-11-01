#!/usr/bin/env node

const
   path = require ("path");

// https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml

const
   x3duom = xml (sh `wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`),
   nodes  = new Map (x3duom .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode .map (node => [node .name, node]));

sh `find ${process .cwd ()}/../x_ite/src/x_ite/Components -type f -mindepth 2`
   .split ("\n")
   .sort ()
   // .slice (10, 11)
   .forEach (s => node (s));

console .log ("Test done.");

function node (filename)
{
   const typeName = path .parse (filename) .name;

   // Filter abstract nodes.

   if (typeName .match (/^X3D/))
      return;

   const x3duom = nodes .get (typeName);

   // Filter non-standard nodes.

   if (!x3duom)
      return;

   const excludes = new Set (["IS", "USE", "DEF", "id", "class", "style"]);

   const
      fields           = new Map (x3duom .InterfaceDefinition .field .filter (field => !excludes .has (field .name)) .map (field => [field .name, field])),
      file             = sh `cat ${filename}`,
      fieldDefinitions = file .match (/X3DFieldDefinition \(X3DConstants \.\w+,\s+"\w+",\s+new Fields \.\w+ \(.*?\)\).*?\n/g);

   if (fieldDefinitions .length !== fields .size)
   {
      console .log (`${typeName} number of fields differ: ${fieldDefinitions .length} <=> ${fields .size}.`);
      return;
   }

   fieldDefinitions .forEach (fieldDefinition => field (typeName, fieldDefinition, fields));
}

function field (typeName, fieldDefinition, fields)
{
   const
      match      = fieldDefinition .match (/X3DFieldDefinition \(X3DConstants \.(\w+),\s+"(\w+)",\s+new Fields \.(\w+) \((.*?)\)\)/),
      accessType = match [1],
      name       = match [2],
      type       = match [3],
      x3duom     = fields .get (name);

   let value = match [4];

   if (!x3duom)
   {
      console .log (`Unknown field '${name}' of node ${typeName} in X3DUOM.`);
      return;
   }

   if (x3duom .accessType !== accessType)
   {
      console .log (`Field '${name}' in node ${typeName} has different access type: ${accessType} !== ${x3duom .accessType}.`);
      return;
   }

   if (x3duom .type !== type)
   {
      console .log (`Field '${name}' in node ${typeName} has different type: ${type} !== ${x3duom .type}.`);
      return;
   }

   if (accessType .match (/^(?:inputOnly|outputOnly)$/))
      return;

   x3duom .default ||= "";
   x3duom .default = x3duom .default .replace (/\.0+/g, "");

   switch (type)
   {
      case "SFBool":
         value ||= "false";
         break;
      case "SFDouble":
      case "SFFloat":
      case "SFInt32":
      case "SFTime":
         value ||= "0";
         break;
      case "SFImage":
         value ||= "0 0 0";
         break;
      case "SFNode":
         value ||= "NULL";
         break;
      case "SFRotation":
         value ||= "0 0 1 0";
         break;
      case "SFString":
         value = value .replace (/^"|"$/g, "");
         break;
      case "SFVec2d":
      case "SFVec2f":
         value ||= "0 0";
         value = value .replaceAll (",", "");
         break;
      case "SFColor":
      case "SFVec3d":
      case "SFVec3f":
         value ||= "0 0 0";
         value = value .replaceAll (",", "");
         break;
      case "SFColorRGBA":
      case "SFVec4d":
      case "SFVec4f":
         value ||= "0 0 0 0";
         value = value .replaceAll (",", "");
         break;
      case "MFInt32":
      case "MFImage":
         value = value .replaceAll (",", "");
         break;
   }

   if (x3duom .default !== value)
   {
      console .log (`Field ${type} '${name}' in node ${typeName} has different value: ${value} !== ${x3duom .default}.`);
      return;
   }
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
