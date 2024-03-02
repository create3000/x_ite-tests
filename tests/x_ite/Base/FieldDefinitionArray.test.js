const X3D = require ("../../X3D")

const
   canvas           = X3D .createBrowser (),
   Browser          = canvas .browser,
   scene            = Browser .currentScene,
   node             = scene .createNode ("WorldInfo"),
   fieldDefinitions = node .getFieldDefinitions ()

test ("index", () =>
{
   for (let i = 0; i < fieldDefinitions .length; ++ i)
      expect (fieldDefinitions [i]) .toBeInstanceOf (X3D .X3DFieldDefinition);
})

test ("spread", () =>
{
   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (fieldDefinitions .constructor) .toBe (X3D .FieldDefinitionArray)

   const a = [... fieldDefinitions]

   expect (a) .toHaveLength (fieldDefinitions .length)

   for (const [i, v] of a .entries ())
      expect (v) .toBe (fieldDefinitions [i])
})

test ("filter", () =>
{
   const a = fieldDefinitions .filter (f => f .name .includes ("i"))

   expect (a) .not .toBe (fieldDefinitions)
   expect (a) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (a) .toHaveLength (2)
})

test ("toString", () =>
{
   expect (X3D .FieldDefinitionArray .typeName) .toBe ("FieldDefinitionArray")
   expect (fieldDefinitions .getTypeName ()) .toBe ("FieldDefinitionArray")
   expect (Object .prototype .toString .call (fieldDefinitions)) .toBe (`[object FieldDefinitionArray]`)
   expect (fieldDefinitions .toString ()) .toBe (`[object ${fieldDefinitions .getTypeName ()}]`)
})
