

const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("initial value_changed", async () =>
{
   const scene = await Browser .createX3DFromString (`#X3D V4.0 utf8

PROFILE Interchange
COMPONENT Interpolation : 5

DEF I SplinePositionInterpolator {
   key [0, 1]
   keyValue [5 5 5, 6 6 6]
}

DEF R Transform { }

ROUTE I.value_changed TO R.set_translation
   `);

   await Browser .nextFrame ();

   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [0] .value_changed .equals (new X3D .SFVec3f (5,5,5))) .toBe (true);
   expect (scene .rootNodes [1] .translation .equals (new X3D .SFVec3f (5,5,5))) .toBe (false);
});
