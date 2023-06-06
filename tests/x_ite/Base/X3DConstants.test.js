const
   X3D    = require ("../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

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
      "X3DBaseNode",
   ]

   for (const InternalNode of InternalNodes)
      expect (Number .isInteger (X3D .X3DConstants [InternalNode])) .toBe (true)
})

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
      expect (Number .isInteger (X3D .X3DConstants [AbstractType])) .toBe (true)
})
