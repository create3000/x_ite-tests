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

   expect (scene1 .getLive () .getValue  ()) .toBe (true);

   Browser .endUpdate ();

   const scene2 = await Browser .createX3DFromString ("");

   expect (scene1 .getLive () .getValue ()) .toBe (false);
   expect (scene2 .getLive () .getValue ()) .toBe (false);

   Browser .beginUpdate ();

   expect (scene1 .getLive () .getValue ()) .toBe (true);
   expect (scene2 .getLive () .getValue ()) .toBe (true);

   scene1 .setLive (false);
   scene2 .setLive (false);

   expect (scene1 .getLive () .getValue ()) .toBe (false);
   expect (scene2 .getLive () .getValue ()) .toBe (false);

   scene1 .setLive (true);
   scene2 .setLive (true);

   expect (scene1 .getLive () .getValue ()) .toBe (true);
   expect (scene2 .getLive () .getValue ()) .toBe (true);

   Browser .endUpdate ();

   expect (scene1 .getLive () .getValue ()) .toBe (false);
   expect (scene2 .getLive () .getValue ()) .toBe (false);

   scene1 .dispose ();
   scene2 .dispose ();

   Browser .beginUpdate ();

   expect (scene1 .getLive () .getValue ()) .toBe (false);
   expect (scene2 .getLive () .getValue ()) .toBe (false);
});

test ("blob URL", async () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser;

   const
      blob = new Blob (["PROFILE Interchange Transform { }"], { type: "model/x3d+vrml" }),
      url  = URL .createObjectURL (blob);

   const scene = await Browser .createX3DFromURL (new X3D .MFString (url));

   expect (scene .profile .name) .toBe ("Interchange");
   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform");
});
