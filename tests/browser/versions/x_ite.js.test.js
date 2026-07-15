import { expect, test } from "vitest";
import "https://weiputer/x_ite/dist/x_ite.js";

test ("X3D", async () =>
{
   const browser = X3D .createBrowser () .browser;

   for (const key in X3D .Namespace)
      expect (X3D [key]) .toBe (X3D .Namespace [key]);

   for (const key in X3D .Fields)
      expect (X3D [key]) .toBe (X3D .Fields [key]);

   for (const ConcreteNode of browser .getConcreteNodes ())
      expect (X3D [ConcreteNode .typeName]) .toBe (ConcreteNode);

   const values = new Set (Object .values (X3D));

   for (const AbstractNode of browser .getAbstractNodes ())
      expect (values .has (AbstractNode)) .toBe (true);

   expect (X3D .Namespace .hasOwnProperty ("call")) .toBe (false);
   expect (X3D .Namespace .hasOwnProperty ("apply")) .toBe (false);
   expect (X3D .Namespace .hasOwnProperty ("bind")) .toBe (false);
   expect (X3D .Namespace .hasOwnProperty ("toString")) .toBe (false);

   expect (X3D .hasOwnProperty ("add")) .toBe (false);
   expect (X3D .hasOwnProperty ("has")) .toBe (false);
   expect (X3D .hasOwnProperty ("set")) .toBe (false);
   expect (X3D .hasOwnProperty ("get")) .toBe (false);
   expect (X3D .hasOwnProperty ("delete")) .toBe (false);
   expect (X3D .hasOwnProperty ("clear")) .toBe (false);
   expect (X3D .hasOwnProperty ("size")) .toBe (false);
   expect (X3D .hasOwnProperty ("forEach")) .toBe (false);
   expect (X3D .hasOwnProperty ("entries")) .toBe (false);
   expect (X3D .hasOwnProperty ("keys")) .toBe (false);
   expect (X3D .hasOwnProperty ("values")) .toBe (false);
   expect (X3D .hasOwnProperty ("toString")) .toBe (true);
});
