const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

console .warn = Function .prototype

test ("statements", async () =>
{
   const
      canvas        = X3D .createBrowser (),
      Browser       = canvas .browser,
      latestVersion = Browser .createScene () .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `statements.x3d`))))

   const
      orig = await fetch (path .join (__dirname, "files", "X3D", `statements.x3d`)) .then (r => r .text ()),
      x3d  = scene .toXMLString (),
      x3dv = scene .toVRMLString (),
      x3dj = scene .toJSONString ()

   const encodings = ["XML", "XML", "VRML", "JSON"]

   Browser .baseURL = scene .worldURL

   for (const [i, file] of [orig, x3d, x3dv, x3dj] .entries ())
   {
      const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

      expect (scene .encoding) .toBe (encodings [i])

      if (i)
         expect (scene .specificationVersion) .toBe (latestVersion)

      expect (scene .getNamedNode ("Transform") .rotation .angle) .toBeCloseTo (Math .PI / 4)
      expect (scene .getNamedNode ("Box") .size .x) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Box") .size .y) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Box") .size .z) .toBeCloseTo (4)
      expect (scene .getNamedNode ("Emitter") .mass) .toBeCloseTo (2)
      expect (scene .getNamedNode ("Force") .force .y) .toBeCloseTo (-10)

      expect (scene .toXMLString ()) .toBe (orig)
      expect (scene .toVRMLString ()) .toBe (x3dv)
      expect (scene .toJSONString ()) .toBe (x3dj)
   }
})

test ("fields", async () =>
{
   const
      canvas        = X3D .createBrowser (),
      Browser       = canvas .browser,
      latestVersion = Browser .createScene () .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `fields.x3d`))))

   const
      orig = await fetch (path .join (__dirname, "files", "X3D", `fields.x3d`)) .then (r => r .text ()),
      x3d  = scene .toXMLString (),
      x3dv = scene .toVRMLString (),
      x3dj = scene .toJSONString ()

   const encodings = ["XML", "XML", "VRML", "JSON"]

   Browser .baseURL = scene .worldURL

   for (const [i, file] of [orig, x3d, x3dv, x3dj] .entries ())
   {
      const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

      expect (scene .encoding) .toBe (encodings [i])

      if (i)
         expect (scene .specificationVersion) .toBe (latestVersion)

      expect (scene .toXMLString ()) .toBe (x3d)
      expect (scene .toVRMLString ()) .toBe (x3dv)
      expect (scene .toJSONString ()) .toBe (x3dj)
   }
})

test ("nodes", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadComponents (Browser .getProfile ("Full"))

   const string = `PROFILE Full

   ${[...Browser .getSupportedNodes ()] .map (Type => Type .prototype .getTypeName () + "{ }") .join ("\n")}
   `

   const
      scene1 = await Browser .createX3DFromString (string),
      scene2 = await Browser .createX3DFromString (scene1 .toXMLString ()),
      scene3 = await Browser .createX3DFromString (scene1 .toJSONString ())

   expect (scene1 .rootNodes) .toHaveLength (Browser .getSupportedNodes () .length)
   expect (scene2 .rootNodes) .toHaveLength (Browser .getSupportedNodes () .length)
   expect (scene3 .rootNodes) .toHaveLength (Browser .getSupportedNodes () .length)
})
