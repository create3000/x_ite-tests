import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("Removed fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.3 utf8
ParticleSystem {
   colorRamp Color { }
   texCoordRamp TextureCoordinate { }
}`));

   expect (scene1 .rootNodes [0] .colorRamp .getNodeTypeName ()) .toBe ("Color");
   expect (scene1 .rootNodes [0] .texCoordRamp .getNodeTypeName ()) .toBe ("TextureCoordinate");
   expect (scene1 .rootNodes [0] .color .getNodeTypeName ()) .toBe ("Color");
   expect (scene1 .rootNodes [0] .texCoord .getNodeTypeName ()) .toBe ("TextureCoordinate");
});
