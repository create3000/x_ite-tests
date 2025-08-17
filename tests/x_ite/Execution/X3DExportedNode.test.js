const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

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

   expect (X3D .X3DExportedNode .typeName) .toBe ("X3DExportedNode")
   expect (exportedNode .getTypeName ()) .toBe ("X3DExportedNode")
   expect (Object .prototype .toString .call (exportedNode)) .toBe (`[object X3DExportedNode]`)
   expect (exportedNode .toString ()) .toBe (`[object ${exportedNode .getTypeName ()}]`)

   const properties = [
      "exportedName",
      "localNode",
      "description",
   ]

   enumerate (properties, exportedNode)
})
