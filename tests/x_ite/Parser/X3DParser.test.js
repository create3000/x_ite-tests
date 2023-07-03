const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("statements.x3d", async () =>
{
   const
      latestVersion = Browser .createScene () .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `statements.x3d`))))

   const orig = await fetch (path .join (__dirname, "files", "X3D", `statements.x3d`)) .then (r => r .text ())

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style: style }),
         x3dv = scene .toVRMLString ({ style: style }),
         x3dj = scene .toJSONString ({ style: style })

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
         expect (scene .toXMLString  ({ style: style })) .toBe (x3d)
         expect (scene .toVRMLString ({ style: style })) .toBe (x3dv)
         expect (scene .toJSONString ({ style: style })) .toBe (x3dj)
      }
   }
})

test ("fields.x3d", async () =>
{
   const
      latestVersion = Browser .createScene () .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `fields.x3d`))))

   const orig = await fetch (path .join (__dirname, "files", "X3D", `fields.x3d`)) .then (r => r .text ())

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style: style }),
         x3dv = scene .toVRMLString ({ style: style }),
         x3dj = scene .toJSONString ({ style: style })

      const encodings = ["XML", "XML", "VRML", "JSON"]

      Browser .baseURL = scene .worldURL

      for (const [i, file] of [orig, x3d, x3dv, x3dj] .entries ())
      {
         const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

         expect (scene .encoding) .toBe (encodings [i])

         if (i)
            expect (scene .specificationVersion) .toBe (latestVersion)

         expect (scene .toXMLString ()) .toBe (orig)
         expect (scene .toXMLString  ({ style: style })) .toBe (x3d)
         expect (scene .toVRMLString ({ style: style })) .toBe (x3dv)
         expect (scene .toJSONString ({ style: style })) .toBe (x3dj)
      }
   }
})

test ("nodes", async () =>
{
   await Browser .loadComponents (Browser .getProfile ("Full"))

   const string = `PROFILE Full

   ${[...Browser .getConcreteNodes ()] .map (ConcreteNode => ConcreteNode .typeName + "{ }") .join ("\n")}
   `

   const
      scene1 = await Browser .createX3DFromString (string),
      scene2 = await Browser .createX3DFromString (scene1 .toXMLString ()),
      scene3 = await Browser .createX3DFromString (scene1 .toJSONString ())

   expect (scene1 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene2 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene3 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)

   for (const [i, node] of scene1 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene2 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene3 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)
})

test ("initializableReference.x3dv", async () =>
{
   const
      orig  = await fetch (path .join (__dirname, "files", "X3D", `initializableReference.x3dv`)) .then (r => r .text ()) .then (t => t .replace (/V\d+\.\d+\.\d+/, "V" + Browser .version)),
      scene = await Browser .createX3DFromString (orig),
      x3d   = await Browser .createX3DFromString (scene .toXMLString ()),
      x3dj  = await Browser .createX3DFromString (scene .toJSONString ()),
      x3dv  = await Browser .createX3DFromString (scene .toVRMLString ())

   expect (x3d  .toVRMLString ()) .toBe (orig)
   expect (x3dj .toVRMLString ()) .toBe (orig)
   expect (x3dv .toVRMLString ()) .toBe (orig)
})

test ("doubleFields.x3d", async () =>
{
   const
      orig  = await fetch (path .join (__dirname, "files", "X3D", `doubleFields.x3d`)) .then (r => r .text ()),
      scene = await Browser .createX3DFromString (orig),
      x3d   = await Browser .createX3DFromString (scene .toXMLString ()),
      x3dj  = await Browser .createX3DFromString (scene .toJSONString ()),
      x3dv  = await Browser .createX3DFromString (scene .toVRMLString ())

   expect (x3d  .toXMLString ()) .toBe (orig)
   expect (x3dj .toXMLString ()) .toBe (orig)
   expect (x3dv .toXMLString ()) .toBe (orig)
})
