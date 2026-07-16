import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("properties", () =>
{
   const profile = Browser .getProfile ("Core");

   expect (profile) .toBeInstanceOf (X3D .ProfileInfo);
   expect (profile .constructor) .toBe (X3D .ProfileInfo);
   expect (profile .name) .toBe ("Core");
   expect (profile .title) .toBe ("Core");
   expect (profile .providerURL .length > 0) .toBe (true);
   expect (profile .providerURL) .not .toBe ("");
   expect (profile .components) .toBeInstanceOf (X3D .ComponentInfoArray);
   expect (profile .components) .toHaveLength (1);
   expect (profile .components [0] .name) .toBe ("Core");

   expect (() => profile .name        = undefined) .toThrow (Error);
   expect (() => profile .title       = undefined) .toThrow (Error);
   expect (() => profile .providerURL = undefined) .toThrow (Error);
   expect (() => profile .components  = undefined) .toThrow (Error);

   expect (profile .name) .toBe ("Core");
   expect (profile .title) .toBe ("Core");
   expect (profile .providerURL .length > 0) .toBe (true);
   expect (profile .providerURL) .not .toBe ("");
   expect (profile .providerURL) .not .toBe (undefined);
   expect (profile .components) .toBeInstanceOf (X3D .ComponentInfoArray);
   expect (profile .components) .toHaveLength (1);
   expect (profile .components [0] .name) .toBe ("Core");

   const properties = [
      "name",
      "title",
      "providerURL",
      "components",
   ];

   enumerate (properties, profile);
});

test .concurrent ("legacy", () =>
{
   const profile = Browser .getProfile ("Core");

   expect (profile .providerUrl) .toBe (profile .providerURL);
});

test .concurrent ("toString", () =>
{
   const profile = Browser .getProfile ("Core");

   expect (X3D .ProfileInfo .typeName) .toBe ("ProfileInfo");
   expect (profile .getTypeName ()) .toBe ("ProfileInfo");
   expect (Object .prototype .toString .call (profile)) .toBe (`[object ProfileInfo]`);
   expect (profile .toString ()) .toBe (`[object ${profile .getTypeName ()}]`);
});
