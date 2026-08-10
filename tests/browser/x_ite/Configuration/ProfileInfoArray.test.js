import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("constructor", () =>
{
   const profiles = Browser .supportedProfiles;

   expect (profiles) .toHaveLength (8);
   expect (profiles) .toBeInstanceOf (X3D .ProfileInfoArray);
   expect (profiles .constructor) .toBe (X3D .ProfileInfoArray);
});

test .concurrent ("filter", () =>
{
   const profiles = Browser .supportedProfiles;

   const a = profiles .filter (p => p .name .match (/^In/));

   expect (a) .not .toBe (profiles);
   expect (a) .toBeInstanceOf (X3D .ProfileInfoArray);
   expect (a) .toHaveLength (2);

   expect (a [0] .name) .toBe ("Interactive");
   expect (a [1] .name) .toBe ("Interchange");
});

test .concurrent ("toString", () =>
{
   const profiles = Browser .supportedProfiles;

   expect (X3D .ProfileInfoArray .typeName) .toBe ("ProfileInfoArray");
   expect (profiles .getTypeName ()) .toBe ("ProfileInfoArray");
   expect (Object .prototype .toString .call (profiles)) .toBe (`[object ProfileInfoArray]`);
   expect (profiles .toString ()) .toBe (`[object ${profiles .getTypeName ()}]`);
});

test .concurrent ("enumerate", () =>
{
   const a = Browser .supportedProfiles;

   expect (a) .toBe (a);

   expect (Reflect .ownKeys (a) .includes ("length")) .toBe (true);
   expect (a) .toHaveLength (8);
   expect (Object .keys (a)) .toEqual (Array .from (Array (8) .keys (), String));
   expect (Array .from (a .keys ())) .toEqual (Array .from (Array (8) .keys ()));

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
