import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("constructor", () =>
{
   const
      scene         = Browser .currentScene,
      importedNodes = scene .importedNodes;

   expect (importedNodes) .toHaveLength (0);
   expect (importedNodes) .toBeInstanceOf (X3D .ImportedNodesArray);
   expect (importedNodes .constructor) .toBe (X3D .ImportedNodesArray);
});

test .concurrent ("filter", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
PROFILE Interchange

DEF E1 Group { }
DEF E2 Switch { }

EXPORT E1
EXPORT E2
   "
}

IMPORT I.E1 AS I1
IMPORT I.E2 AS I2
      `);

   const importedNodes = scene .importedNodes;

   const a = importedNodes .filter (i => i .importedName === "I1");

   expect (a) .not .toBe (importedNodes);
   expect (a) .toBeInstanceOf (X3D .ImportedNodesArray);
   expect (a) .toHaveLength (1);

   expect (a [0] .importedName) .toBe ("I1");
});

test .concurrent ("toString", () =>
{
   const
      scene         = Browser .currentScene,
      importedNodes = scene .importedNodes;

   expect (X3D .ImportedNodesArray .typeName) .toBe ("ImportedNodesArray");
   expect (importedNodes .getTypeName ()) .toBe ("ImportedNodesArray");
   expect (Object .prototype .toString .call (importedNodes)) .toBe (`[object ImportedNodesArray]`);
   expect (importedNodes .toString ()) .toBe (`[object ${importedNodes .getTypeName ()}]`);
});

test .concurrent ("enumerate", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
PROFILE Interchange

DEF E1 Group { }
DEF E2 Switch { }

EXPORT E1
EXPORT E2
   "
}

IMPORT I.E1 AS I1
IMPORT I.E2 AS I2
      `);

   const a = scene .importedNodes;

   expect (a) .toBe (a);

   expect (Reflect .ownKeys (a) .includes ("length")) .toBe (true);
   expect (a) .toHaveLength (2);
   expect (Object .keys (a)) .toEqual (Array .from (Array (2) .keys (), String));

   const s = Symbol ();

   a [s]     = "symbol";
   a ["abc"] = "string";

   expect (a [s])     .toBe ("symbol");
   expect (a ["abc"]) .toBe ("string");

   expect (Reflect .ownKeys (a) .includes (s))     .toBe (true);
   expect (Reflect .ownKeys (a) .includes ("abc")) .toBe (true);

   expect (() => a [123] = "number") .toThrow (Error);

   expect ("length" in a) .toBe (true);
   expect (s in a) .toBe (true);
   expect ("abc" in a) .toBe (true);

   expect (Object .keys (a) .includes ("0")) .toBe (true);
   expect (Object .keys (a) .includes ("length")) .toBe (false);
   expect (Object .keys (a) .includes (s)) .toBe (false);
   expect (Object .keys (a) .includes ("abc")) .toBe (true);
});
