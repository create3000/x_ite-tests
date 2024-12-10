const
   path = require ("path"),
   url  = require ("url"),
   $    = require ("jquery"),
   X3D  = require ("../../X3D");

test ("X3DScene.isLive", async () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser;

   const scene1 = await Browser .createX3DFromString ("");

   expect (scene1 .isLive ()) .toBe (true);

   Browser .endUpdate ();

   const scene2 = await Browser .createX3DFromString ("");

   expect (scene1 .isLive ()) .toBe (false);
   expect (scene2 .isLive ()) .toBe (false);

   Browser .beginUpdate ();

   expect (scene1 .isLive ()) .toBe (true);
   expect (scene2 .isLive ()) .toBe (true);
});
