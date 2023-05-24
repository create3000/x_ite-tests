const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("Menger_sponge-ASCII.stl", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "STL", `Menger_sponge-ASCII.stl`))))

   expect (scene .encoding) .toBe ("STL")
   expect (scene .rootNodes) .toHaveLength (1)
})
