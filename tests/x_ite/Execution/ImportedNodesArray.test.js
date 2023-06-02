const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("constructor", () =>
{
   const
      scene         = Browser .currentScene,
      importedNodes = scene .importedNodes

   expect (importedNodes) .toHaveLength (0)
   expect (importedNodes) .toBeInstanceOf (X3D .ImportedNodesArray)
   expect (importedNodes .constructor) .toBe (X3D .ImportedNodesArray)
})

test ("filter", async () =>
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

   const importedNodes = scene .importedNodes

   const a = importedNodes .filter (i => i .importedName === "I1")

   expect (a) .not .toBe (importedNodes)
   expect (a) .toBeInstanceOf (X3D .ImportedNodesArray)
   expect (a) .toHaveLength (1)

   expect (a [0] .importedName) .toBe ("I1")
})

test ("toString", () =>
{
   const
      scene         = Browser .currentScene,
      importedNodes = scene .importedNodes

   expect (importedNodes .toString ()) .toBe (`[object ${importedNodes .getTypeName ()}]`)
})
