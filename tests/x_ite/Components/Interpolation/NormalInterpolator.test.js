

const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("initial value_changed", async () =>
{
   const scene = await Browser .createX3DFromString (`#X3D V4.0 utf8

PROFILE Interchange
COMPONENT Interpolation : 5

NormalInterpolator {
   key [0, 1]
   keyValue [5 5 5, 6 6 6, 7 7 7, 8 8 8]
}
   `);

   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .value_changed .equals (new X3D .MFVec3f (new X3D .SFVec3f(5,5,5), new X3D .SFVec3f(6,6,6)))) .toBe (true);
});
