const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("getBBox", async () =>
{
   await Browser .loadComponents (Browser .getProfile ("Full"), Browser .getComponent ("X_ITE"));

   for (const ConcreteNode of Browser .getConcreteNodes ())
   {
      const node = Browser .currentScene .createNode (ConcreteNode .typeName);

      if (!node .getNodeType () .includes (X3D .X3DConstants .X3DBoundedObject))
         continue;

      console .log (node .getNodeTypeName ());

      expect (() => node .getValue () .getBBox (new X3D .Box3 ())) .not .toThrow (Error);
   }
});
