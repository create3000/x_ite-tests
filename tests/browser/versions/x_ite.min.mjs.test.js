import { expect, test } from "vitest";
import X3D from "https://weiputer/x_ite/dist/x_ite.min.mjs";

test .concurrent ("X3D", async () =>
{
   const browser = X3D .createBrowser () .browser;
   const scene   = await browser .createScene (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));

   for (const key in X3D .Namespace)
      expect (X3D [key]) .toBe (X3D .Namespace [key]);

   for (const key in X3D .Fields)
      expect (X3D [key]) .toBe (X3D .Fields [key]);

   for (const ConcreteNode of browser .getConcreteNodes ())
      expect (X3D [ConcreteNode .typeName]) .toBe (ConcreteNode);

   for (const AbstractNode of browser .getAbstractNodes ())
      expect (X3D [AbstractNode .typeName]) .toBe (AbstractNode);

   const values = new Set (Object .values (X3D));

   for (const AbstractNode of browser .getAbstractNodes ())
      expect (values .has (AbstractNode)) .toBe (true);

   expect (Object .hasOwn (X3D .Namespace, "call")) .toBe (false);
   expect (Object .hasOwn (X3D .Namespace, "apply")) .toBe (false);
   expect (Object .hasOwn (X3D .Namespace, "bind")) .toBe (false);
   expect (Object .hasOwn (X3D .Namespace, "toString")) .toBe (false);

   expect (Object .hasOwn (X3D, "add")) .toBe (false);
   expect (Object .hasOwn (X3D, "has")) .toBe (false);
   expect (Object .hasOwn (X3D, "set")) .toBe (false);
   expect (Object .hasOwn (X3D, "get")) .toBe (false);
   expect (Object .hasOwn (X3D, "delete")) .toBe (false);
   expect (Object .hasOwn (X3D, "clear")) .toBe (false);
   expect (Object .hasOwn (X3D, "size")) .toBe (false);
   expect (Object .hasOwn (X3D, "forEach")) .toBe (false);
   expect (Object .hasOwn (X3D, "entries")) .toBe (false);
   expect (Object .hasOwn (X3D, "keys")) .toBe (false);
   expect (Object .hasOwn (X3D, "values")) .toBe (false);
   expect (Object .hasOwn (X3D, "toString")) .toBe (true);

   for (const { typeName } of browser .getConcreteNodes ())
      expect (scene .createNode (typeName) .getNodeTypeName ()) .toBe (typeName);
});
