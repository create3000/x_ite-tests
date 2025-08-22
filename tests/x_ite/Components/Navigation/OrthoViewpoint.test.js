const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("legacy fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V4.0 utf8
OrthoViewpoint { }`))

   expect (scene1 .rootNodes [0] .fieldOfView) .toBeInstanceOf (X3D .MFFloat);
   expect (scene1 .rootNodes [0] .fieldOfView .equals (new X3D .MFFloat (-1, -1, 1, 1))) .toBe (true);
});
