import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("constructor", () =>
{
   const components = Browser .supportedComponents;

   expect (components) .toHaveLength (37 + 2); // WebXR + X_ITE
   expect (components) .toBeInstanceOf (X3D .ComponentInfoArray);
   expect (components .constructor) .toBe (X3D .ComponentInfoArray);
});

test .concurrent ("filter", () =>
{
   const components = Browser .supportedComponents;

   const a = components .filter (c => c .name .match (/[23]D$/));

   expect (a) .not .toBe (components);
   expect (a) .toBeInstanceOf (X3D .ComponentInfoArray);
   expect (a) .toHaveLength (3);

   expect (a [0] .name) .toBe ("Geometry2D");
   expect (a [1] .name) .toBe ("Geometry3D");
   expect (a [2] .name) .toBe ("Texturing3D");
});

test .concurrent ("toString", () =>
{
   const components = Browser .supportedComponents;

   expect (X3D .ComponentInfoArray .typeName) .toBe ("ComponentInfoArray");
   expect (components .getTypeName ()) .toBe ("ComponentInfoArray");
   expect (Object .prototype .toString .call (components)) .toBe (`[object ComponentInfoArray]`);
   expect (components .toString ()) .toBe (`[object ${components .getTypeName ()}]`);
});

test .concurrent ("enumerate", () =>
{
   const a = Browser .supportedComponents;

   expect (a) .toBe (a);

   expect (Reflect .ownKeys (a) .includes ("length")) .toBe (true);
   expect (a) .toHaveLength (39);
   expect (Object .keys (a)) .toEqual (Array .from (Array (39) .keys (), String));
   expect (Array .from (a .keys ())) .toEqual (Array .from (Array (39) .keys ()));

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

   expect (Object .keys (a)) .toEqual (Array .from (Array (39) .keys (), String) .concat ("abc"));
});
