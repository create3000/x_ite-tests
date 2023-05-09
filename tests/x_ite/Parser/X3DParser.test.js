const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("statements", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", `statements.x3d`))))

   const
      x3d  = await fetch (path .join (__dirname, "files", `statements.x3d`)) .then (r => r .text ()),
      x3dv = scene .toVRMLString (),
      x3dj = scene .toJSONString ()

   Browser .baseURL = scene .worldURL

   for (const file of [x3d, x3dv, x3dj])
   {
      const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

      expect (scene .getNamedNode ("Transform") .rotation .angle) .toBeCloseTo (Math .PI / 4)
      expect (scene .getNamedNode ("Box") .size .x) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Box") .size .y) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Box") .size .z) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Emitter") .mass) .toBeCloseTo (2)
      expect (scene .getNamedNode ("Force") .force .y) .toBeCloseTo (-10)

      expect (scene .toXMLString ()) .toBe (x3d)
      expect (scene .toVRMLString ()) .toBe (x3dv)
      expect (scene .toJSONString ()) .toBe (x3dj)
   }
})

test ("fields", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", `fields.x3d`))))

   const
      x3d  = await fetch (path .join (__dirname, "files", `fields.x3d`)) .then (r => r .text ()),
      x3dv = scene .toVRMLString (),
      x3dj = scene .toJSONString ()

   Browser .baseURL = scene .worldURL

   for (const file of [x3d, x3dv, x3dj])
   {
      const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

      expect (scene .toXMLString ()) .toBe (x3d)
      expect (scene .toVRMLString ()) .toBe (x3dv)
      expect (scene .toJSONString ()) .toBe (x3dj)
   }
})
