import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene,
   node    = scene .createNode ("WorldInfo");

test .concurrent ("get", () =>
{
   const n = X3D .SFNodeCache .get (node .getValue ());

   expect (n) .toBe (node);
   expect (n .getValue ()) .toBe (node .getValue ());
   expect (n) .toBe (X3D .SFNodeCache .get (node .getValue ()));
});

test .concurrent ("delete", () =>
{
   X3D .SFNodeCache .delete (node .getValue ());

   const n = X3D .SFNodeCache .get (node .getValue ());

   expect (n) .toBeInstanceOf (X3D .SFNode);
   expect (n) .not .toBe (node);
   expect (n .getValue ()) .toBe (node .getValue ());
   expect (n) .toBe (X3D .SFNodeCache .get (node .getValue ()));
});

test .concurrent ("add", () =>
{
   X3D .SFNodeCache .delete (node .getValue ());
   X3D .SFNodeCache .set (node .getValue (), node);

   const n = X3D .SFNodeCache .get (node .getValue ());

   expect (n) .toBeInstanceOf (X3D .SFNode);
   expect (n) .toBe (node);
   expect (n .getValue ()) .toBe (node .getValue ());
   expect (n) .toBe (X3D .SFNodeCache .get (node .getValue ()));
});
