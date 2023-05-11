const
   X3D    = require ("../../X3D"),
   Fields = X3D .require ("x_ite/Fields")

test ("nodes", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const Type of Browser .getSupportedNodes ())
      expect (Number .isInteger (X3D .X3DConstants [Type .prototype .getTypeName ()])) .toBe (true)
})

test ("fields", () =>
{
   for (const Field of Object .keys (Fields))
      expect (Number .isInteger (X3D .X3DConstants [Field])) .toBe (true)
})
