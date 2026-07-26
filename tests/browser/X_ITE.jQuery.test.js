import { expect, test } from "vitest";
import X3D              from "./X3D.js";
import $                from "https://cdn.jsdelivr.net/npm/jquery@4.0.0/dist-module/jquery.slim.module.js";

test .concurrent ("getBrowser", () =>
{
   const canvas = $(X3D .createBrowser ());

   canvas .addClass ("browser");

   expect (X3D .getBrowser ()) .toBe (undefined);

   $("body") .append (canvas);

   expect (canvas [0]) .toBeInstanceOf (X3D .X3DCanvasElement);
   expect (X3D .getBrowser ()) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (canvas [0])) .toBe (canvas [0] .browser);
   expect (X3D .getBrowser (".browser")) .toBe (canvas [0] .browser);
});
