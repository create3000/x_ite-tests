const X3D = require ("../../X3D");

test ("X3DScene.isLive", async () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser;

   expect (Browser .getLive () .getValue ()) .toBe (true);
   expect (Browser .isLive ()) .toBe (true);

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

test ("replaceWorld", async () =>
{
   const
      canvas = X3D .createBrowser (),
      browser = canvas .browser,
      scene = await browser .createX3DFromString (`Transform { }`);

   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform");

   await browser .replaceWorld (scene);

   expect (browser .currentScene) .toBe (scene);
   expect (browser .currentScene .rootNodes) .toHaveLength (1);
   expect (browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform");
});

test ("getBBox/replaceWorld", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      browser = canvas .browser,
      scene   = await browser .createScene (browser .getProfile ("Interactive"));

   const shape = scene .createNode ("Shape");
   const box   = scene .createNode ("Box");

   box   .size     = new X3D .SFVec3f (4,4,4);
   shape .geometry = box;

   const bbox1 = shape .getValue () .getBBox (new X3D .Box3 ());

   expect (bbox1 .isEmpty ()) .toBe (true);

   await browser .replaceWorld (scene);

   const bbox2 = shape .getValue () .getBBox (new X3D .Box3 ());

   expect (bbox2 .isEmpty ()) .toBe (false);
   expect (bbox2 .size .equals (new X3D .Vector3 (4,4,4))) .toBe (true);
});

test ("dispose", () =>
{
   const
      canvas  = X3D .createBrowser (),
      browser = canvas .browser;

   expect (() => browser .dispose ()) .not .toThrow (Error);
});

test ("createX3DFromString2", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser;

   const scene1 = await Browser .createX3DFromString (`Transform { }`);

   expect (scene1 .rootNodes) .toHaveLength (1);
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform");

   const scene2 = await Browser .createX3DFromString (`<Transform/>`);

   expect (scene2 .rootNodes) .toHaveLength (1);
   expect (scene2 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform");
});
