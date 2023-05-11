const X3D = require ("../../X3D")

test ("nodes", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadComponents (Browser .getProfile ("Full"))

   for (const Type of Browser .getSupportedNodes ())
      expect (Number .isInteger (X3D .X3DConstants [Type .prototype .getTypeName ()])) .toBe (true)
})
