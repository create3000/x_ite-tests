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
      expect (typeof ConcreteNode .componentInfo .name) .toBe ("string")
      expect (typeof ConcreteNode .containerField) .toBe ("string")
      expect (ConcreteNode .specificationRange) .toBeInstanceOf (Array)
      expect (() => ConcreteNode .specificationRange .sort ()) .toThrow (Error)
      expect (ConcreteNode .fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)
      expect (node .getNodeTypeName ()) .toBe (ConcreteNode .typeName)
      expect (node .getNodeTypeName ()) .toBe (node .getValue () .getTypeName ())
      expect (node .getFieldDefinitions ()) .toBeInstanceOf (X3D .FieldDefinitionArray)
      expect (node .getFieldDefinitions ()) .toBe (node .getValue () .getFieldDefinitions ())
      expect (node .getValue () .getTypeName ()) .toBe (ConcreteNode .typeName)
      expect (node .getValue () .getComponentName ()) .toBe (ConcreteNode .componentInfo .name)
      expect (node .getValue () .getContainerField ()) .toBe (ConcreteNode .containerField)
      expect (node .getValue () .getSpecificationRange ()) .toBe (ConcreteNode .specificationRange)
      expect (node .getValue () .getFieldDefinitions ()) .toBeInstanceOf (X3D .FieldDefinitionArray)
      enumerate (["typeName", "componentInfo", "containerField", "specificationRange", "fieldDefinitions"], ConcreteNode)
   }
})

test ("abstract-nodes", async () =>
{
   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const AbstractNode of Browser .getAbstractNodes ())
   {
      expect (typeof AbstractNode .typeName) .toBe ("string")

      if (AbstractNode .typeName === "X3DPrototypeInstance")
      {
         expect (typeof AbstractNode .componentInfo .name) .toBe ("string")
         enumerate (["typeName", "componentInfo", "containerField", "specificationRange"], AbstractNode)
      }
      else
      {
         expect (typeof AbstractNode .componentInfo .name) .toBe ("string")
         enumerate (["typeName", "componentInfo"], AbstractNode)
      }
   }
})

test ("private/cloneCount", () =>
{
   const
      set1 = scene .createNode ("MetadataSet"),
      set2 = scene .createNode ("MetadataSet"),
      dbl  = scene .createNode ("MetadataDouble")

   set1 .value .push (dbl)

   expect (set1 .getValue () .isPrivate ()) .toBe (false)
   expect (dbl .getValue () .getCloneCount ()) .toBe (1)

   set1 .getValue () .setPrivate (true)
   expect (set1 .getValue () .isPrivate ()) .toBe (true)
   expect (dbl .getValue () .getCloneCount ()) .toBe (0)

   set1 .getValue () .setPrivate (false)
   expect (set1 .getValue () .isPrivate ()) .toBe (false)
   expect (dbl .getValue () .getCloneCount ()) .toBe (1)

   set2 .value .push (dbl)
   expect (dbl .getValue () .getCloneCount ()) .toBe (2)

   set1 .value .length = 0
   expect (dbl .getValue () .getCloneCount ()) .toBe (1)

   set1 .metadata = dbl
   expect (dbl .getValue () .getCloneCount ()) .toBe (2)

   set1 .metadata = null
   expect (dbl .getValue () .getCloneCount ()) .toBe (1)

   set2 .value .length = 0
   expect (dbl .getValue () .getCloneCount ()) .toBe (0)

   Browser .currentScene .rootNodes .push (dbl)
   expect (dbl .getValue () .getCloneCount ()) .toBe (1)

   Browser .currentScene .rootNodes .length = 0
   expect (dbl .getValue () .getCloneCount ()) .toBe (0)
})
