const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("get/setMetaData", () =>
{
   const node = Browser .currentScene .createNode ("WorldInfo");

   node .getValue () .setMetaData ("Sunrize/Test/boolean", true);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("boolean");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/double", 123.456);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("boolean");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);
   expect (node .metadata .value [0] .value [1] .name) .toBe ("double");
   expect (node .metadata .value [0] .value [1] .value .equals (new X3D .MFDouble (123.456))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/boolean");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("double");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFDouble (123.456))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/double", 123.456);

   expect (node .metadata) .toBe (null);
});
