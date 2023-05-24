const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("Primitives.svg", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", `Primitives.svg`))))

   expect (scene .encoding) .toBe ("SVG")
   expect (scene .rootNodes) .toHaveLength (4)
})

test ("design.svg", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", `design.svg`))))

   expect (scene .encoding) .toBe ("SVG")
   expect (scene .rootNodes) .toHaveLength (4)
})
