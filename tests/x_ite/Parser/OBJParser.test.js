const
   path = require ("path"),
   url  = require ("url");

const X3D = require ("../../X3D");

test ("LibertyStatue.obj.gz", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "OBJ", "LibertyStatue", `LibertStatue.obj.gz`))));

   expect (scene .encoding) .toBe ("OBJ");
   expect (scene .rootNodes) .toHaveLength (1);
});

test ("LibertyStatue.obj.gz", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "OBJ", "minicooper.obj"))));

   expect (scene .encoding) .toBe ("OBJ");
   expect (scene .rootNodes) .toHaveLength (1);
});
