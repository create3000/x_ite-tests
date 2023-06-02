const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

const sleep = delay => new Promise (resolve => setTimeout (resolve, delay))

test ("properties", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF N1 Group { }
DEF N2 Switch { }

EXPORT N1 AS E1
EXPORT N2 AS E2
   `)

   await sleep ();

   const exportedNode = scene .exportedNodes [0]

   expect (exportedNode) .toBeInstanceOf (X3D .X3DExportedNode)
   expect (exportedNode .constructor) .toBe (X3D .X3DExportedNode)
   expect (exportedNode .exportedName) .toBe ("E1")
   expect (exportedNode .localNode) .toBeInstanceOf (X3D .SFNode)
   expect (exportedNode .localNode) .toBe (scene .getNamedNode ("N1"))
   expect (exportedNode .getExportedName ()) .toBe (exportedNode .exportedName)
   expect (exportedNode .getLocalNode ()) .toBe (exportedNode .localNode .getValue ())
   expect (exportedNode .toString ()) .toBe (`[object ${exportedNode .getTypeName ()}]`)

   exportedNode .exportedName = undefined
   exportedNode .localNode    = undefined

   expect (exportedNode) .toBeInstanceOf (X3D .X3DExportedNode)
   expect (exportedNode .exportedName) .toBe ("E1")
   expect (exportedNode .localNode) .toBeInstanceOf (X3D .SFNode)
   expect (exportedNode .localNode) .toBe (scene .getNamedNode ("N1"))
   expect (exportedNode .toString ()) .toBe (`[object ${exportedNode .getTypeName ()}]`)

   function enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   }

   const properties = [
      "exportedName",
      "localNode",
   ]

   enumerate (properties, exportedNode)
})
