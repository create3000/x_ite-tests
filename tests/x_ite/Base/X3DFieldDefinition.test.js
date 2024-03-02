const
   X3D    = require ("../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

const
   canvas           = X3D .createBrowser (),
   Browser          = canvas .browser,
   scene            = Browser .currentScene,
   node             = scene .createNode ("WorldInfo"),
   fieldDefinitions = node .getFieldDefinitions ()

test ("properties", () =>
{
   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (fieldDefinitions .constructor) .toBe (X3D .FieldDefinitionArray)
   expect (fieldDefinitions) .toHaveLength (3)

   expect (fieldDefinitions [0]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (fieldDefinitions [0] .constructor) .toBe (X3D .X3DFieldDefinition)
   expect (fieldDefinitions [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (fieldDefinitions [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (fieldDefinitions [0] .name) .toBe ("metadata")
   expect (fieldDefinitions [0] .value) .toBeInstanceOf (Fields .SFNode)

   expect (fieldDefinitions [1]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (fieldDefinitions [1] .constructor) .toBe (X3D .X3DFieldDefinition)
   expect (fieldDefinitions [1] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (fieldDefinitions [1] .dataType) .toBe (X3D .X3DConstants .SFString)
   expect (fieldDefinitions [1] .name) .toBe ("title")
   expect (fieldDefinitions [1] .value) .toBeInstanceOf (Fields .SFString)

   expect (fieldDefinitions [2]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (fieldDefinitions [2] .constructor) .toBe (X3D .X3DFieldDefinition)
   expect (fieldDefinitions [2] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (fieldDefinitions [2] .dataType) .toBe (X3D .X3DConstants .MFString)
   expect (fieldDefinitions [2] .name) .toBe ("info")
   expect (fieldDefinitions [2] .value) .toBeInstanceOf (Fields .MFString)

   fieldDefinitions [0] .accessType = undefined
   fieldDefinitions [0] .dataType = undefined
   fieldDefinitions [0] .name = undefined
   fieldDefinitions [0] .value = undefined

   expect (fieldDefinitions [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (fieldDefinitions [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (fieldDefinitions [0] .name) .toBe ("metadata")
   expect (fieldDefinitions [0] .value) .toBeInstanceOf (Fields .SFNode)

   const properties = [
      "accessType",
      "dataType",
      "name",
   ]

   enumerate (properties, fieldDefinitions [0])
})

test ("toString", () =>
{
   expect (X3D .X3DFieldDefinition .typeName) .toBe ("X3DFieldDefinition")
   expect (fieldDefinitions [0] .getTypeName ()) .toBe ("X3DFieldDefinition")
   expect (Object .prototype .toString .call (fieldDefinitions [0])) .toBe (`[object X3DFieldDefinition]`)
   expect (fieldDefinitions [0] .toString ()) .toBe (`[object ${fieldDefinitions [0] .getTypeName ()}]`)
})
