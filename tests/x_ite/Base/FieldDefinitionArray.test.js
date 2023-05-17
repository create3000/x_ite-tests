const X3D = require ("../../X3D")

const
   canvas           = X3D .createBrowser (),
   Browser          = canvas .browser,
   scene            = Browser .currentScene,
   node             = scene .createNode ("WorldInfo"),
   fieldDefinitions = node .getFieldDefinitions ()

test ("spread", () =>
{
   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)

   const a = [... fieldDefinitions]

   expect (a) .toHaveLength (fieldDefinitions .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (fieldDefinitions [i])
})
