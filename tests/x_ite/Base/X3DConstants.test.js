const
   X3D    = require ("../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

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

test ("nodes", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const Type of Browser .getSupportedNodes ())
      expect (Number .isInteger (X3D .X3DConstants [Type .prototype .getTypeName ()])) .toBe (true)
})
