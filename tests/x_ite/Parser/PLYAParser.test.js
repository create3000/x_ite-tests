const
   path = require ("path"),
   url  = require ("url");

const X3D = require ("../../X3D");

test ("cube.ply", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "PLY", `cube.ply`))));

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
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "PLY", `cube32.ply`))));

   expect (scene .encoding) .toBe ("PLY");
   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [1] .geometry .coordIndex) .toHaveLength (30);
   expect (scene .rootNodes [1] .geometry .coord .point) .toHaveLength (8);
});
