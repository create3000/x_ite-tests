

const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("initial value_changed", async () =>
{
   const scene = await Browser .createX3DFromString (`#X3D V4.0 utf8

PROFILE Interchange
COMPONENT Interpolation : 5

DEF I CoordinateInterpolator {
   key [0, 1]
   keyValue [5 5 5, 6 6 6, 7 7 7, 8 8 8]
}

DEF R Coordinate { }

ROUTE I.value_changed TO R.set_point
   `);

   await Browser .nextFrame ();

   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [0] .value_changed .equals (new X3D .MFVec3f (new X3D .SFVec3f(5,5,5), new X3D .SFVec3f(6,6,6)))) .toBe (true);
   expect (scene .rootNodes [1] .point .equals (new X3D .MFVec3f (new X3D .SFVec3f(5,5,5), new X3D .SFVec3f(6,6,6)))) .toBe (false);
});
