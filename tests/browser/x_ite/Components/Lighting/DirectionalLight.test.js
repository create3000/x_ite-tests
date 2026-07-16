import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("VRML fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#VRML V2.0 utf8
DirectionalLight { }`));

   expect (scene1 .rootNodes [0] .global) .toBe (true);
});
