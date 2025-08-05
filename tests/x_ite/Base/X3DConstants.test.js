const
   X3D    = require ("../../X3D"),
   Fields = X3D .Fields

test ("events", () =>
{
   expect (Number .isInteger (X3D .X3DConstants .CONNECTION_ERROR)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .BROWSER_EVENT)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .INITIALIZED_EVENT)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .SHUTDOWN_EVENT)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .INITIALIZED_ERROR)) .toBe (true)
})

test ("load-state", () =>
{
   expect (Number .isInteger (X3D .X3DConstants .NOT_STARTED_STATE)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .IN_PROGRESS_STATE)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .COMPLETE_STATE)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .FAILED_STATE)) .toBe (true)
})

test ("access-types", () =>
{
   expect (Number .isInteger (X3D .X3DConstants .initializeOnly)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .inputOnly)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .outputOnly)) .toBe (true)
   expect (Number .isInteger (X3D .X3DConstants .inputOutput)) .toBe (true)

   expect (X3D .X3DConstants .initializeOnly) .toBe (0b001)
   expect (X3D .X3DConstants .inputOnly)      .toBe (0b010)
   expect (X3D .X3DConstants .outputOnly)     .toBe (0b100)
   expect (X3D .X3DConstants .inputOutput)    .toBe (0b111)
})

test ("fields", () =>
{
   for (const Field of Object .keys (Fields))
      expect (Number .isInteger (X3D .X3DConstants [Field])) .toBe (true)

   expect (Object .keys (Fields) .filter (f => f .startsWith ("SF")) .length)
      .toBe (Object .keys (Fields) .filter (f => f .startsWith ("MF")) .length)

   expect (Object .keys (X3D .X3DConstants) .filter (f => f .match (/^(?:SF|MF|VrmlMatrix)/)) .length)
      .toBe (Object .keys (Fields) .length)
})

test ("internal-nodes", () =>
{
   const InternalNodes = [
      "X3DBrowser",
      "X3DWorld",
      "X3DScene",
      "X3DExecutionContext",
      "X3DExternProtoDeclaration",
      "X3DProtoDeclaration",
      "X3DProtoDeclarationNode",
   ];

   for (const InternalNode of InternalNodes)
      expect (Number .isInteger (X3D .X3DConstants [InternalNode])) .toBe (true);
});

test ("concrete-nodes", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const ConcreteNode of Browser .getConcreteNodes ())
      expect (Number .isInteger (X3D .X3DConstants [ConcreteNode .typeName])) .toBe (true)
})

test ("abstract-nodes", async () =>
{
   for (const AbstractType of Object .keys (X3D .X3DConstants) .filter (f => f .startsWith ("X3D")))
      expect (Number .isInteger (X3D .X3DConstants [AbstractType])) .toBe (true);
});

test ("reverse mapping", async () =>
{
   for (const [key, value] of Object .entries (X3D .X3DConstants))
   {
      expect (Number .isInteger (value)) .toBe (true);
      expect (X3D .X3DConstants [value]) .toBe (key);
   }
});

test ("toString", () =>
{
   expect (Object .prototype .toString .call (X3D .X3DConstants)) .toBe (`[object X3DConstants]`)
   expect (X3D .X3DConstants .toString ()) .toBe (`[object X3DConstants]`)
})
