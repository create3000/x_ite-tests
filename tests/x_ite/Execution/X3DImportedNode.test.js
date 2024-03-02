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
IMPORT I.E2 AS I2
   `)

   await sleep ();

   const importedNode = scene .importedNodes [0]

   expect (importedNode) .toBeInstanceOf (X3D .X3DImportedNode)
   expect (importedNode .constructor) .toBe (X3D .X3DImportedNode)
   expect (importedNode .inlineNode) .toBe (scene .getNamedNode ("I"))
   expect (importedNode .exportedName) .toBe ("E1")
   expect (importedNode .exportedNode) .toBeInstanceOf (X3D .SFNode)
   expect (importedNode .exportedNode .getNodeTypeName ()) .toBe ("Group")
   expect (importedNode .importedName) .toBe ("I1")
   expect (importedNode .getInlineNode ()) .toBe (importedNode .inlineNode .getValue ())
   expect (importedNode .getExportedName ()) .toBe (importedNode .exportedName)
   expect (importedNode .getExportedNode ()) .toBe (importedNode .exportedNode .getValue ())
   expect (importedNode .getImportedName ()) .toBe (importedNode .importedName)

   expect (X3D .X3DImportedNode .typeName) .toBe ("X3DImportedNode")
   expect (importedNode .getTypeName ()) .toBe ("X3DImportedNode")
   expect (Object .prototype .toString .call (importedNode)) .toBe (`[object X3DImportedNode]`)
   expect (importedNode .toString ()) .toBe (`[object ${importedNode .getTypeName ()}]`)

   importedNode .inlineNode   = undefined
   importedNode .exportedName = undefined
   importedNode .exportedNode = undefined
   importedNode .importedName = undefined

   expect (importedNode) .toBeInstanceOf (X3D .X3DImportedNode)
   expect (importedNode .inlineNode) .toBe (scene .getNamedNode ("I"))
   expect (importedNode .exportedName) .toBe ("E1")
   expect (importedNode .exportedNode) .toBeInstanceOf (X3D .SFNode)
   expect (importedNode .exportedNode .getNodeTypeName ()) .toBe ("Group")
   expect (importedNode .importedName) .toBe ("I1")

   const properties = [
      "inlineNode",
      "exportedName",
      "exportedNode",
      "importedName",
   ]

   enumerate (properties, importedNode)
})
