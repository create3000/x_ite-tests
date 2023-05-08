const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("units", async () =>
{
   const files = [ ]

   for (const ext of [".x3d", ".x3dj", ".x3dv"])
   {
      files .push (await fetch (path .join (__dirname, "files", `units${ext}`)) .then (r => r .text ()))
   }

   const to = ["toXMLString", "toJSONString", "toVRMLString"]

   for (const [i, ext] of [".x3d", ".x3dj", ".x3dv"] .entries ())
   {
      const
         canvas  = X3D .createBrowser (),
         Browser = canvas .browser,
         scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", `units${ext}`))))

      expect (scene .getNamedNode ("Transform") .rotation .angle) .toBeCloseTo (Math .PI / 4)
      expect (scene .getNamedNode ("Box") .size .x) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Box") .size .y) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Box") .size .z) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Emitter") .mass) .toBeCloseTo (2)
      expect (scene .getNamedNode ("Force") .force .y) .toBeCloseTo (-10)

      expect (scene [to [i]] ()) .toBe (files [i])
   }
})
