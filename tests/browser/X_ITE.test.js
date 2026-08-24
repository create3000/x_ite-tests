import { expect, test } from "vitest";
import X3D              from "./X3D.js";
import $                from "https://cdn.jsdelivr.net/npm/jquery@4.0.0/dist-module/jquery.slim.module.js";

const
   X3DCanvasElement = X3D .X3DCanvasElement,
   DEVELOPMENT      = X3D .DEVELOPMENT;

test .concurrent ("noConflict", () =>
{
   expect (X3D .noConflict ()) .toBe (X3D);
});

test .concurrent ("createBrowser", () =>
{
   const canvas = X3D .createBrowser ();

   expect (canvas) .toBeInstanceOf (X3DCanvasElement);
   expect (X3D .getBrowser (canvas)) .toBe (canvas .browser);
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser);
});

test .concurrent ("getBrowser", () =>
{
   const canvas = $(X3D .createBrowser ());

   canvas .addClass ("browser");

   expect (X3D .getBrowser ()) .toBe (undefined);

   $("body") .append (canvas);

   expect (X3D .getBrowser ()) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (canvas [0])) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (".browser")) .toBe (canvas [0] .browser);
});

test .concurrent ("X3D-classic", () => new Promise ((resolve, reject) =>
{
   X3D (() =>
   {
      resolve ();
   },
   (error) =>
   {
      reject (error .message);
   });
}));

test .concurrent ("X3D-async", async () =>
{
   await X3D ();
});

test .concurrent ("DEVELOPMENT", () =>
{
   expect (DEVELOPMENT) .toBe (false);
});

test .concurrent ("X3D", async () =>
{
   const browser = X3D .createBrowser () .browser;

   await browser .loadComponents (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));

   for (const key in X3D .Namespace)
      expect (X3D [key]) .toBe (X3D .Namespace [key]);

   for (const key in X3D .Fields)
      expect (X3D [key]) .toBe (X3D .Fields [key]);

   for (const ConcreteNode of browser .getConcreteNodes ())
      expect (X3D [ConcreteNode .typeName]) .toBe (ConcreteNode);

   const values = new Set (Object .values (X3D));

   for (const AbstractNode of browser .getAbstractNodes ())
      expect (values .has (AbstractNode)) .toBe (true);

   expect (Object .hasOwn (X3D .Namespace, "call")) .toBe (false);
   expect (Object .hasOwn (X3D .Namespace, "apply")) .toBe (false);
   expect (Object .hasOwn (X3D .Namespace, "bind")) .toBe (false);
   expect (Object .hasOwn (X3D .Namespace, "toString")) .toBe (false);

   expect (Object .hasOwn (X3D, "add")) .toBe (false);
   expect (Object .hasOwn (X3D, "has")) .toBe (false);
   expect (Object .hasOwn (X3D, "set")) .toBe (false);
   expect (Object .hasOwn (X3D, "get")) .toBe (false);
   expect (Object .hasOwn (X3D, "delete")) .toBe (false);
   expect (Object .hasOwn (X3D, "clear")) .toBe (false);
   expect (Object .hasOwn (X3D, "size")) .toBe (false);
   expect (Object .hasOwn (X3D, "forEach")) .toBe (false);
   expect (Object .hasOwn (X3D, "entries")) .toBe (false);
   expect (Object .hasOwn (X3D, "keys")) .toBe (false);
   expect (Object .hasOwn (X3D, "values")) .toBe (false);
   expect (Object .hasOwn (X3D, "toString")) .toBe (true);
});
