#!/usr/bin/env node

const
   path   = require ("path"),
   { sh } = require ("shell-tools");

// https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml

const
   x3duom        = xml (sh (`wget -q -O - https://www.web3d.org/specifications/X3dUnifiedObjectModel-4.0.xml`)),
   nodes         = new Map (x3duom .X3dUnifiedObjectModel .ConcreteNodes .ConcreteNode .map (node => [node .name, node])),
   abstractNodes = new Map (x3duom .X3dUnifiedObjectModel .AbstractNodeTypes .AbstractNodeType .map (node => [node .name, node]));

 sh (`find "${process .cwd ()}/../x_ite/src/x_ite/Components" -type f -mindepth 2`)
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
   {
      abstractNode (typeName, filename);
      return;
   }

   const x3duom = nodes .get (typeName);

   // Filter non-standard nodes.

   if (!x3duom)
      return;

   const file = sh (`cat "${filename}"`);

   common (typeName, file, x3duom);

   // Check containerField.

   const containerField = file .match (/getStaticProperties\s*\(.*?,.*?,.*?,\s*"(.*?)"/s);

   if (!containerField || !containerField [1] === x3duom .InterfaceDefinition ?.containerField ?.default)
   {
      console .log (`${typeName} containerField differs (Spec <=> X3DUOM): ${containerField ?.[1]} <=> ${x3duom .InterfaceDefinition ?.containerField ?.default}.`);
   }

   // Check fields.

   const excludes = new Set (["IS", "USE", "DEF", "id", "class"]);

   if (!typeName .match (/^(?:FontStyle|ScreenFontStyle)/))
   {
      excludes .add ("style");
   }

   if (typeName .match (/^(?:Script|ComposedShader|PackagedShader|ShaderPart|ShaderProgram)$/))
   {
      excludes .add ("field");
      excludes .add ("sourceCode");
   }

   const
      fields           = new Map (x3duom .InterfaceDefinition .field .filter (field => !excludes .has (field .name)) .map (field => [field .name, field])),
      fieldDefinitions = file .match (/X3DFieldDefinition \(X3DConstants \.\w+,\s+"\w+",\s+new Fields \.\w+ \(.*?\)\),.*?\n/g)  .filter (fieldDefinition => !fieldDefinition .match (/skip test|experimental/)) .map (fieldDefinition => fieldDefinition .match (/X3DFieldDefinition \(X3DConstants \.(\w+),\s+"(\w+)",\s+new Fields \.(\w+) \((.*?)\)\),/)) .filter (f => !f [2] .match (/^(?:blendMode|depthMode)$/));

   if (fieldDefinitions .length !== fields .size)
   {
      console .log (`${typeName} number of fields differ (Spec <=> X3DUOM): ${fieldDefinitions .length} <=> ${fields .size}.`);

      const x3duom = fieldDefinitions .filter (f => !fields .has (f [2])) .map (f => f [2]);

      if (x3duom .length)
         console .log (`  Where [${x3duom}] not in X3DUOM.`)

      const x_ite = [... fields .values ()] .map (f => f .name) .filter (n => !fieldDefinitions .find (f => f [2] === n));

      if (x_ite .length)
         console .log (`  Where [${x_ite}] not in Spec.`);

      return;
   }

   fieldDefinitions .forEach (fieldDefinition => field (typeName, fieldDefinition, fields));
}

function abstractNode (typeName, filename)
{
   const x3duom = abstractNodes .get (typeName);

   if (!x3duom)
      return;

   const file = sh (`cat "${filename}"`);

   common (typeName, file, x3duom);
}

function common (typeName, file, x3duom)
{
   // Test typeName.

   const name = file .match (/getStaticProperties\s*\(\s*"(.*?)"/s);

   if (!name || name [1] !== x3duom .name)
   {
      console .log (`Node ${typeName} has wrong name (Local <=> X3DUOM): ${name ?.[1]} !== ${x3duom .name}`);
   }

   // Test componentInfo.

   const componentInfo = file .match (/getStaticProperties\s*\(.*?,\s*"(.*?)",\s*(\d+)/s);

   if (!componentInfo)
   {
      console .log (`Node ${typeName} misses componentInfo.`);
   }
   else
   {
      // Check component name.

      if (componentInfo [1] !== x3duom .InterfaceDefinition ?.componentInfo ?.name)
      {
         console .log (`${typeName}: component name differs (Spec <=> X3DUOM): ${componentInfo ?.[1]} <=> ${x3duom .InterfaceDefinition ?.componentInfo ?.name}.`);
      }

      // Check component level.

      if (componentInfo [2] !== x3duom .InterfaceDefinition ?.componentInfo ?.level)
      {
         console .log (`${typeName}: component level differs (Spec <=> X3DUOM): ${componentInfo ?.[2]} <=> ${x3duom .InterfaceDefinition ?.componentInfo ?.level}.`);
      }
   }

   if (typeName === "X3DNode")
      return;

   // Test inheritance

   const bases = [x3duom .InterfaceDefinition .Inheritance .baseType];

   if (x3duom .InterfaceDefinition .AdditionalInheritance)
   {
      if (Array .isArray (x3duom .InterfaceDefinition .AdditionalInheritance))
         bases .push (... x3duom .InterfaceDefinition .AdditionalInheritance .map (i => i .baseType));
      else
         bases .push (x3duom .InterfaceDefinition .AdditionalInheritance .baseType);
   }

   // for (const base of bases)
   // {
   //    if (!file .match (new RegExp (`${base}\\.`)))
   //       console .error (`${typeName}: X3DUOM base '${base}' differs from Spec.`);
   // }
}

function field (typeName, fieldDefinition, fields)
{
   const
      accessType = fieldDefinition [1],
      name       = fieldDefinition [2],
      type       = fieldDefinition [3],
      x3duom     = fields .get (name);

   let value = fieldDefinition [4];

   if (!x3duom)
   {
      console .log (`Unknown field '${name}' of node ${typeName} in X3DUOM.`);
      return;
   }

   if (x3duom .accessType !== accessType)
   {
      console .log (`Field '${name}' in node ${typeName} has different access type (Spec <=> X3DUOM): ${accessType} !== ${x3duom .accessType}.`);
   }

   if (x3duom .type !== type)
   {
      console .log (`Field '${name}' in node ${typeName} has different type (Spec <=> X3DUOM): ${type} !== ${x3duom .type}.`);
   }

   if (accessType .match (/^(?:inputOnly|outputOnly)$/))
      return;

   x3duom .default ||= "";
   x3duom .default = x3duom .default .replace (/\.0+(?!\d)/g, "");

   value = value
      .replace (/new Color3 \(\)/g, "0 0 0")
      .replace (/new Color3 \((\d+)\)/g, "$1 $1 $1")
      .replace (/new Color4 \(\)/g, "0 0 0 0")
      .replace (/new Color4 \((\d+)\)/g, "$1 $1 $1 $1")
      .replace (/new Vector2 \(\)/g, "0 0")
      .replace (/new Vector2 \((\d+)\)/g, "$1 $1")
      .replace (/new Vector3 \(\)/g, "0 0 0")
      .replace (/new Vector3 \((\d+)\)/g, "$1 $1 $1")
      .replace (/new Vector4 \(\)/g, "0 0 0 0")
      .replace (/new Vector4 \((\d+)\)/g, "$1 $1 $1 $1")
      .replace (/new Rotation4 \(\)/g, "0 0 1 0")
      .replace (/new (?:Vector|Color|Matrix)[234] \((.*?)\)/g, "$1");

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
      case "SFMatrix3d":
      case "SFMatrix3f":
         value ||= "1 0 0 0 1 0 0 0 1";
         break;
      case "SFMatrix4d":
      case "SFMatrix4f":
         value ||= "1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1";
         break;
      case "SFNode":
         value ||= "NULL";
         break;
      case "SFRotation":
         value ||= "0 0 1 0";
         value = value .replaceAll (",", "");
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
      case "MFBool":
      case "MFColor":
      case "MFColorRGBA":
      case "MFDouble":
      case "MFFloat":
      case "MFInt32":
      case "MFImage":
      case "MFMatrix3d":
      case "MFMatrix3f":
      case "MFMatrix4d":
      case "MFMatrix4f":
      case "MFRotation":
      case "MFString":
      case "MFVec2d":
      case "MFVec2f":
      case "MFVec3d":
      case "MFVec3f":
      case "MFVec4d":
      case "MFVec4f":
         value = value .replaceAll (",", "");
         break;
   }

   if (value !== x3duom .default)
   {
      console .log (`Field ${type} '${name}' in node ${typeName} has different value (Spec <=> X3DUOM): ${value} !== ${x3duom .default}.`);
      return;
   }
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
