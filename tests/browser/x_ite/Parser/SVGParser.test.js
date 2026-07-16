import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("Primitives.svg", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/SVG/Primitives.svg", import.meta.url)));

   expect (scene .encoding) .toBe ("SVG");
   expect (scene .rootNodes) .toHaveLength (3);
});

test .concurrent ("design.svg", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/SVG/design.svg", import.meta.url)));

   expect (scene .encoding) .toBe ("SVG");
   expect (scene .rootNodes) .toHaveLength (3);
});
