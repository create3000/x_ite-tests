const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("cube", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", `cube.stl`))))

   expect (scene .encoding) .toBe ("STL")
   expect (scene .rootNodes) .toHaveLength(1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene .rootNodes [0] .geometry .getNodeTypeName ()) .toBe ("TriangleSet")
})
