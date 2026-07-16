import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("Menger_sponge-ASCII.stl", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/STL/Menger_sponge-ASCII.stl", import.meta.url)));

   expect (scene .encoding) .toBe ("STL");
   expect (scene .rootNodes) .toHaveLength (1);
});
