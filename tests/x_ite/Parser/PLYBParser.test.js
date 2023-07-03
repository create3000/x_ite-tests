const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("Garuda and Vishnu.ply", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "PLY", "garuda-and-vishnu-ply", `Garuda and Vishnu.ply`))))

   expect (scene .encoding) .toBe ("PLY")
   expect (scene .rootNodes) .toHaveLength (2)
})
