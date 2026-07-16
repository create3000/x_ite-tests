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
