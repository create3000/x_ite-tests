const X3D = require ("../../X3D")

test ("spread", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .currentScene,
      node    = scene .createNode ("WorldInfo")

   const fieldDefinitions = node .getFieldDefinitions ()

   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)

   const a = [... fieldDefinitions]

   expect (a) .toHaveLength (fieldDefinitions .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (fieldDefinitions [i])
})
