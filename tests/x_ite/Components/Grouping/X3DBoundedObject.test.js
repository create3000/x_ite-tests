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

      // Check default bbox.

      expect (() => node .getValue () .getBBox (new X3D .Box3 ())) .not .toThrow (Error);

      // Check custom bbox.

      node .bboxSize   = new X3D .SFVec3f (2, 3, 4);
      node .bboxCenter = new X3D .SFVec3f (5, 6, 7);

      await Browser .nextFrame ();

      const bbox = node .getValue () .getBBox (new X3D .Box3 ());

      expect (bbox .size   .equals (new X3D .Vector3 (2, 3, 4))) .toBe (true);
      expect (bbox .center .equals (new X3D .Vector3 (5, 6, 7))) .toBe (true);
   }
});
