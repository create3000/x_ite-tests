const
   X3D    = require ("../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .currentScene,
      node    = scene .createNode ("WorldInfo")

   const fieldDefinitions = node .getFieldDefinitions ()

   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (fieldDefinitions) .toHaveLength (3)

   expect (fieldDefinitions [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (fieldDefinitions [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (fieldDefinitions [0] .name) .toBe ("metadata")
   expect (fieldDefinitions [0] .value) .toBeInstanceOf (Fields .SFNode)

   expect (fieldDefinitions [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly)
   expect (fieldDefinitions [1] .dataType) .toBe (X3D .X3DConstants .SFString)
   expect (fieldDefinitions [1] .name) .toBe ("title")
   expect (fieldDefinitions [1] .value) .toBeInstanceOf (Fields .SFString)

   expect (fieldDefinitions [2] .accessType) .toBe (X3D .X3DConstants .initializeOnly)
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

   expect (fieldDefinitions [0]) .toEqual ({
      accessType: X3D .X3DConstants .inputOutput,
      dataType: X3D .X3DConstants .SFNode,
      name: "metadata",
   })
})
