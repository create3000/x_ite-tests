import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("Garuda and Vishnu.ply", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/PLY/garuda-and-vishnu-ply/Garuda and Vishnu.ply", import.meta.url)));

   expect (scene .encoding) .toBe ("PLY");
   expect (scene .rootNodes) .toHaveLength (2);
});
