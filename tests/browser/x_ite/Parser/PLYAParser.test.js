import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test ("cube.ply", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/PLY/cube.ply", import.meta.url)));

   expect (scene .encoding) .toBe ("PLY");
   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [1] .geometry .coordIndex) .toHaveLength (33);
   expect (scene .rootNodes [1] .geometry .coord .point) .toHaveLength (8);
});

test ("cube32.ply", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/PLY/cube32.ply", import.meta.url)));

   expect (scene .encoding) .toBe ("PLY");
   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [1] .geometry .coordIndex) .toHaveLength (30);
   expect (scene .rootNodes [1] .geometry .coord .point) .toHaveLength (8);
});
