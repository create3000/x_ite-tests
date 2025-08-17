const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
PROFILE Interchange

DEF E1 Group { }
DEF E2 Switch { }

EXPORT E1
EXPORT E2
   "
}

IMPORT I.E1 AS I1
IMPORT I.E2 AS I2 DESCRIPTION "Test Desc"
   `)

   await sleep ();

   const importedNode0 = scene .importedNodes [0]

   expect (importedNode0) .toBeInstanceOf (X3D .X3DImportedNode)
   expect (importedNode0 .constructor) .toBe (X3D .X3DImportedNode)
   expect (importedNode0 .inlineNode) .toBe (scene .getNamedNode ("I"))
   expect (importedNode0 .exportedName) .toBe ("E1")
   expect (importedNode0 .exportedNode) .toBeInstanceOf (X3D .SFNode)
   expect (importedNode0 .exportedNode .getNodeTypeName ()) .toBe ("Group")
   expect (importedNode0 .importedName) .toBe ("I1")
   expect (importedNode0 .description) .toBe ("")
   expect (importedNode0 .getInlineNode ()) .toBe (importedNode0 .inlineNode .getValue ())
   expect (importedNode0 .getExportedName ()) .toBe (importedNode0 .exportedName)
   expect (importedNode0 .getExportedNode ()) .toBe (importedNode0 .exportedNode .getValue ())
   expect (importedNode0 .getImportedName ()) .toBe (importedNode0 .importedName)
   expect (importedNode0 .getDescription ()) .toBe ("")

   expect (X3D .X3DImportedNode .typeName) .toBe ("X3DImportedNode")
   expect (importedNode0 .getTypeName ()) .toBe ("X3DImportedNode")
   expect (Object .prototype .toString .call (importedNode0)) .toBe (`[object X3DImportedNode]`)
   expect (importedNode0 .toString ()) .toBe (`[object ${importedNode0 .getTypeName ()}]`)

   importedNode0 .inlineNode   = undefined
   importedNode0 .exportedName = undefined
   importedNode0 .exportedNode = undefined
   importedNode0 .importedName = undefined

   expect (importedNode0) .toBeInstanceOf (X3D .X3DImportedNode)
   expect (importedNode0 .inlineNode) .toBe (scene .getNamedNode ("I"))
   expect (importedNode0 .exportedName) .toBe ("E1")
   expect (importedNode0 .exportedNode) .toBeInstanceOf (X3D .SFNode)
   expect (importedNode0 .exportedNode .getNodeTypeName ()) .toBe ("Group")
   expect (importedNode0 .importedName) .toBe ("I1")

   const properties = [
      "inlineNode",
      "exportedName",
      "exportedNode",
      "importedName",
      "description",
   ]

   enumerate (properties, importedNode0)

   const importedNode1 = scene .importedNodes [1]

   expect (importedNode1) .toBeInstanceOf (X3D .X3DImportedNode)
   expect (importedNode1 .constructor) .toBe (X3D .X3DImportedNode)
   expect (importedNode1 .inlineNode) .toBe (scene .getNamedNode ("I"))
   expect (importedNode1 .exportedName) .toBe ("E2")
   expect (importedNode1 .exportedNode) .toBeInstanceOf (X3D .SFNode)
   expect (importedNode1 .exportedNode .getNodeTypeName ()) .toBe ("Switch")
   expect (importedNode1 .importedName) .toBe ("I2")
   expect (importedNode1 .description) .toBe ("Test Desc")
   expect (importedNode1 .getInlineNode ()) .toBe (importedNode1 .inlineNode .getValue ())
   expect (importedNode1 .getExportedName ()) .toBe (importedNode1 .exportedName)
   expect (importedNode1 .getExportedNode ()) .toBe (importedNode1 .exportedNode .getValue ())
   expect (importedNode1 .getImportedName ()) .toBe (importedNode1 .importedName)
   expect (importedNode1 .getDescription ()) .toBe ("Test Desc")
})
