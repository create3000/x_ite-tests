const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene

test ("getType", () =>
{
   const node = scene .createNode ("MetadataSet") .getValue ()

   expect (node .getType ()) .toBeInstanceOf (Array)
   expect (() => node .getType () .reverse ()) .toThrow (Error)
})

test ("static-properties", async () =>
{
   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const ConcreteNode of Browser .getConcreteNodes ())
   {
      const node = Browser .currentScene .createNode (ConcreteNode .typeName);

      expect (typeof ConcreteNode .typeName) .toBe ("string")
      expect (typeof ConcreteNode .componentName) .toBe ("string")
      expect (typeof ConcreteNode .containerField) .toBe ("string")
      expect (ConcreteNode .specificationRange) .toBeInstanceOf (Array)
      expect (() => ConcreteNode .specificationRange .sort ()) .toThrow (Error)
      expect (ConcreteNode .fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)
      expect (node .getNodeTypeName ()) .toBe (ConcreteNode .typeName)
      expect (node .getNodeTypeName ()) .toBe (node .getValue () .getTypeName ())
      expect (node .getFieldDefinitions ()) .toBeInstanceOf (X3D .FieldDefinitionArray)
      expect (node .getFieldDefinitions ()) .toBe (node .getValue () .getFieldDefinitions ())
      expect (node .getValue () .getTypeName ()) .toBe (ConcreteNode .typeName)
      expect (typeof node .getValue () .getTypeName ()) .toBe ("string")
      expect (typeof node .getValue () .getComponentName ()) .toBe ("string")
      expect (node .getValue () .getSpecificationRange ()) .toBeInstanceOf (Array)
      expect (node .getValue () .getFieldDefinitions ()) .toBeInstanceOf (X3D .FieldDefinitionArray)
   }
})
