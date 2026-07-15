import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const canvas  = X3D .createBrowser ();
const browser = canvas .browser;
const scene   = browser .currentScene;

test ("nodes", async () =>
{
   await browser .loadComponents (browser .getProfile ("Full"), browser .getComponent ("X_ITE"));

   for (const ConcreteNode of browser .concreteNodes)
      expect (new ConcreteNode (scene)) .toBeInstanceOf (ConcreteNode);

   for (const ConcreteNode of browser .concreteNodes)
   {
      const node = scene .createNode (ConcreteNode .typeName);

      expect (node .getNodeTypeName ()) .toBe (ConcreteNode .typeName);

      for (const type of node .getNodeType ())
         expect (typeof type) .toBe ("number");
   }

   scene .dispose ();
   browser .dispose ();
});
