import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas           = X3D .createBrowser (),
   Browser          = canvas .browser,
   scene            = Browser .currentScene,
   node             = scene .createNode ("WorldInfo"),
   fieldDefinitions = node .getFieldDefinitions ();

test .concurrent ("index", () =>
{
   for (let i = 0; i < fieldDefinitions .length; ++ i)
      expect (fieldDefinitions [i]) .toBeInstanceOf (X3D .X3DFieldDefinition);
});

test .concurrent ("spread", () =>
{
   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray);
   expect (fieldDefinitions .constructor) .toBe (X3D .FieldDefinitionArray);

   const a = [... fieldDefinitions];

   expect (a) .toHaveLength (fieldDefinitions .length);

   for (const [i, v] of a .entries ())
      expect (v) .toBe (fieldDefinitions [i]);
});

test .concurrent ("filter", () =>
{
   const a = fieldDefinitions .filter (f => f .name .includes ("i"));

   expect (a) .not .toBe (fieldDefinitions);
   expect (a) .toBeInstanceOf (X3D .FieldDefinitionArray);
   expect (a) .toHaveLength (2);
});

test .concurrent ("toString", () =>
{
   expect (X3D .FieldDefinitionArray .typeName) .toBe ("FieldDefinitionArray");
   expect (fieldDefinitions .getTypeName ()) .toBe ("FieldDefinitionArray");
   expect (Object .prototype .toString .call (fieldDefinitions)) .toBe (`[object FieldDefinitionArray]`);
   expect (fieldDefinitions .toString ()) .toBe (`[object ${fieldDefinitions .getTypeName ()}]`);
});

test .concurrent ("enumerate", () =>
{
   const a = fieldDefinitions;

   expect (Reflect .ownKeys (a) .includes ("length")) .toBe (true);

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
