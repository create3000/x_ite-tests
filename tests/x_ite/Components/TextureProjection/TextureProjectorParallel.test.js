const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("legacy fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V4.0 utf8
TextureProjectorParallel { }`))

   expect (scene1 .rootNodes [0] .upVector .equals (new X3D .SFVec3f (0,0,1))) .toBe (true);
});
