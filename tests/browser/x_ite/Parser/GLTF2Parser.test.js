import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("glTF", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/glTF/CesiumMan/glTF/CesiumMan.gltf", import.meta.url)));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});

test .concurrent ("glTF-Binary", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/glTF/CesiumMan/glTF-Binary/CesiumMan.glb", import.meta.url)));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});

test .concurrent ("glTF-Draco", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/glTF/CesiumMan/glTF-Draco/CesiumMan.gltf", import.meta.url)));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});

test .concurrent ("glTF-Embedded", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (new URL ("files/glTF/CesiumMan/glTF-Embedded/CesiumMan.gltf", import.meta.url)));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});
