import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("properties", () =>
{
   const unit = Browser .currentScene .getUnit ("angle");

   expect (unit) .toBeInstanceOf (X3D .UnitInfo);
   expect (unit .constructor) .toBe (X3D .UnitInfo);
   expect (unit .category) .toBe ("angle");
   expect (unit .name) .toBe ("radian");
   expect (unit .conversionFactor) .toBe (1);
   expect (unit .conversion_factor) .toBe (1);

   expect (() => unit .category          = undefined) .toThrow (Error);
   expect (() => unit .name              = undefined) .toThrow (Error);
   expect (() => unit .conversionFactor  = undefined) .toThrow (Error);
   expect (() => unit .conversion_factor = undefined) .toThrow (Error);

   expect (unit) .toBeInstanceOf (X3D .UnitInfo);
   expect (unit .category) .toBe ("angle");
   expect (unit .name) .toBe ("radian");
   expect (unit .conversionFactor) .toBe (1);
   expect (unit .conversion_factor) .toBe (1);

   const properties = [
      "category",
      "name",
      "conversionFactor",
   ];

   enumerate (properties, unit);
});

test ("toString", () =>
{
   const unit = Browser .currentScene .getUnit ("angle");

   expect (X3D .UnitInfo .typeName) .toBe ("UnitInfo");
   expect (unit .getTypeName ()) .toBe ("UnitInfo");
   expect (Object .prototype .toString .call (unit)) .toBe (`[object UnitInfo]`);
   expect (unit .toString ()) .toBe (`[object ${unit .getTypeName ()}]`);
});
