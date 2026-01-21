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
EXPORT N2 AS E2 DESCRIPTION "Test Desc"
   `)

   const exportedNode0 = scene .exportedNodes [0]

   expect (exportedNode0) .toBeInstanceOf (X3D .X3DExportedNode)
   expect (exportedNode0 .constructor) .toBe (X3D .X3DExportedNode)
   expect (exportedNode0 .exportedName) .toBe ("E1")
   expect (exportedNode0 .localNode) .toBeInstanceOf (X3D .SFNode)
   expect (exportedNode0 .localNode) .toBe (scene .getNamedNode ("N1"))
   expect (exportedNode0 .description) .toBe ("")
   expect (exportedNode0 .getExportedName ()) .toBe (exportedNode0 .exportedName)
   expect (exportedNode0 .getLocalNode ()) .toBe (exportedNode0 .localNode .getValue ())
   expect (exportedNode0 .getDescription ()) .toBe ("")
   expect (exportedNode0 .toString ()) .toBe (`[object ${exportedNode0 .getTypeName ()}]`)

   exportedNode0 .exportedName = undefined
   exportedNode0 .localNode    = undefined

   expect (exportedNode0) .toBeInstanceOf (X3D .X3DExportedNode)
   expect (exportedNode0 .exportedName) .toBe ("E1")
   expect (exportedNode0 .localNode) .toBeInstanceOf (X3D .SFNode)
   expect (exportedNode0 .localNode) .toBe (scene .getNamedNode ("N1"))

   expect (X3D .X3DExportedNode .typeName) .toBe ("X3DExportedNode")
   expect (exportedNode0 .getTypeName ()) .toBe ("X3DExportedNode")
   expect (Object .prototype .toString .call (exportedNode0)) .toBe (`[object X3DExportedNode]`)
   expect (exportedNode0 .toString ()) .toBe (`[object ${exportedNode0 .getTypeName ()}]`)

   const properties = [
      "exportedName",
      "localNode",
      "description",
   ]

   enumerate (properties, exportedNode0);

   const exportedNode1 = scene .exportedNodes [1]

   expect (exportedNode1) .toBeInstanceOf (X3D .X3DExportedNode)
   expect (exportedNode1 .constructor) .toBe (X3D .X3DExportedNode)
   expect (exportedNode1 .exportedName) .toBe ("E2")
   expect (exportedNode1 .localNode) .toBeInstanceOf (X3D .SFNode)
   expect (exportedNode1 .localNode) .toBe (scene .getNamedNode ("N2"))
   expect (exportedNode1 .description) .toBe ("Test Desc")
   expect (exportedNode1 .getExportedName ()) .toBe (exportedNode1 .exportedName)
   expect (exportedNode1 .getLocalNode ()) .toBe (exportedNode1 .localNode .getValue ())
   expect (exportedNode1 .getDescription ()) .toBe ("Test Desc")
   expect (exportedNode1 .toString ()) .toBe (`[object ${exportedNode1 .getTypeName ()}]`)
})
