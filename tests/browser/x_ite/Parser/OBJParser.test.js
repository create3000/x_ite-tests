import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("LibertyStatue.obj.gz", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/OBJ/LibertyStatue/LibertStatue.obj.gz", import.meta.url)));

   expect (scene .encoding) .toBe ("OBJ");
   expect (scene .rootNodes) .toHaveLength (1);
});

test .concurrent ("LibertyStatue.obj.gz", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/OBJ/minicooper.obj", import.meta.url)));

   expect (scene .encoding) .toBe ("OBJ");
   expect (scene .rootNodes) .toHaveLength (1);
});
