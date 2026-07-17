import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

test .concurrent ("KelpForestMain.x3d", async () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser;

   const kelp = "https://www.web3d.org/x3d/content/examples/X3dForWebAuthors/KelpForestExhibit/KelpForestMain.x3d";

   await Browser .loadURL (new X3D .MFString (kelp));

   const scene = Browser .currentScene;

   expect (scene .externprotos) .toHaveLength (2);
   expect (scene .rootNodes) .toHaveLength (7);
});

test .concurrent ("resize", async () =>
{
   const
      body    = document .querySelector ("body"),
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser;

   body .append (canvas);

   expect (Browser .getViewport () [2]) .not .toBe (1234);
   expect (Browser .getViewport () [3]) .not .toBe (123);

   await Browser .resize (1234, 123);

   expect (Browser .getViewport () [2]) .toBe (1234);
   expect (Browser .getViewport () [3]) .toBe (123);

   Browser .setBrowserOption ("ContentScale", 2);

   await Browser .resize (1000, 500);

   expect (Browser .getViewport () [2]) .toBe (1000 * 2);
   expect (Browser .getViewport () [3]) .toBe (500 * 2);

   Browser .dispose ();
});
