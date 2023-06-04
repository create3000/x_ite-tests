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

test ("concrete-nodes", async () =>
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
      expect (node .getValue () .getComponentName ()) .toBe (ConcreteNode .componentName)
      expect (node .getValue () .getContainerField ()) .toBe (ConcreteNode .containerField)
      expect (node .getValue () .getSpecificationRange ()) .toBe (ConcreteNode .specificationRange)
      expect (node .getValue () .getFieldDefinitions ()) .toBeInstanceOf (X3D .FieldDefinitionArray)
   }
})

test ("abstract-nodes", async () =>
{
   const internal = new Set ([
      "X3DBrowser",
      "X3DWorld",
      "X3DScene",
      "X3DExecutionContext",
      "X3DExternProtoDeclaration",
      "X3DProtoDeclaration",
      "X3DProtoDeclarationNode",
   ])

   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const AbstractNode of Browser .getAbstractNodes ())
   {
      expect (typeof AbstractNode .typeName) .toBe ("string")

      if (internal .has (AbstractNode .typeName))
         continue;

      expect (typeof AbstractNode .componentName) .toBe ("string")
   }
})
