const
   path = require ("path"),
   url  = require ("url");

const X3D = require ("../../X3D");

test ("glTF", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "glTF", "CesiumMan", "glTF", "CesiumMan.gltf"))));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});

test ("glTF-Binary", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "glTF", "CesiumMan", "glTF-Binary", "CesiumMan.glb"))));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});

test ("glTF-Draco", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "glTF", "CesiumMan", "glTF-Draco", "CesiumMan.gltf"))));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});

test ("glTF-Embedded", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "glTF", "CesiumMan", "glTF-Embedded", "CesiumMan.gltf"))));

   expect (scene .encoding) .toBe ("GLTF");
   expect (scene .rootNodes .length) .toBe (2);
});
