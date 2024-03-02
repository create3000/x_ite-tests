const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("constructor", () =>
{
   const
      scene         = Browser .currentScene,
      exportedNodes = scene .exportedNodes

   expect (exportedNodes) .toHaveLength (0)
   expect (exportedNodes) .toBeInstanceOf (X3D .ExportedNodesArray)
   expect (exportedNodes .constructor) .toBe (X3D .ExportedNodesArray)
})

test ("filter", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF E1 Group { }
DEF E2 Switch { }

EXPORT E1
EXPORT E2
      `)

   const exportedNodes = scene .exportedNodes

   const a = exportedNodes .filter (e => e .exportedName === "E1")

   expect (a) .not .toBe (exportedNodes)
   expect (a) .toBeInstanceOf (X3D .ExportedNodesArray)
   expect (a) .toHaveLength (1)

   expect (a [0] .exportedName) .toBe ("E1")
})

test ("toString", () =>
{
   const
      scene         = Browser .currentScene,
      exportedNodes = scene .exportedNodes

   expect (X3D .ExportedNodesArray .typeName) .toBe ("ExportedNodesArray")
   expect (exportedNodes .getTypeName ()) .toBe ("ExportedNodesArray")
   expect (Object .prototype .toString .call (exportedNodes)) .toBe (`[object ExportedNodesArray]`)
   expect (exportedNodes .toString ()) .toBe (`[object ${exportedNodes .getTypeName ()}]`)
})
