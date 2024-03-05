const X3D = require ("../../../X3D");

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("get/set/removeMetaData basic types", () =>
{
   const node = Browser .currentScene .createNode ("WorldInfo");

   // Set

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
   expect (node .metadata .value [0] .value [1] .name) .toBe ("double");
   expect (node .metadata .value [0] .value [1] .value .equals (new X3D .MFDouble (123.456))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/integer", 123);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [2] .name) .toBe ("integer");
   expect (node .metadata .value [0] .value [2] .value .equals (new X3D .MFInt32 (123))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/string", "abc");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [3] .name) .toBe ("string");
   expect (node .metadata .value [0] .value [3] .value .equals (new X3D .MFString ("abc"))) .toBe (true);

   // Get

   const
      [boolean] = node .getValue () .getMetaData ("Sunrize/Test/boolean"),
      [double]  = node .getValue () .getMetaData ("Sunrize/Test/double"),
      [integer] = node .getValue () .getMetaData ("Sunrize/Test/integer"),
      [string]  = node .getValue () .getMetaData ("Sunrize/Test/string");

   expect (boolean) .toBe (true);
   expect (double)  .toBe (123.456);
   expect (integer) .toBe (123);
   expect (string)  .toBe ("abc");

   // Remove

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("boolean");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/boolean");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("double");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFDouble (123.456))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/double");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("integer");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFInt32 (123))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/integer");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("string");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFString ("abc"))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/string");

   expect (node .metadata) .toBe (null);

   //
   // Arrays
   //

   // Set

   node .getValue () .setMetaData ("Sunrize/Test/booleans", [true, false, true]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("booleans");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true, false, true))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/doubles", [123.456, 234.567, 345.678]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [1] .name) .toBe ("doubles");
   expect (node .metadata .value [0] .value [1] .value .equals (new X3D .MFDouble (123.456, 234.567, 345.678))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/integers", [123, 234, 345]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [2] .name) .toBe ("integers");
   expect (node .metadata .value [0] .value [2] .value .equals (new X3D .MFInt32 (123, 234, 345))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/strings", ["abc", "bcd", "cde"]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [3] .name) .toBe ("strings");
   expect (node .metadata .value [0] .value [3] .value .equals (new X3D .MFString ("abc", "bcd", "cde"))) .toBe (true);

   // Get

   const
      booleans = node .getValue () .getMetaData ("Sunrize/Test/booleans"),
      doubles  = node .getValue () .getMetaData ("Sunrize/Test/doubles"),
      integers = node .getValue () .getMetaData ("Sunrize/Test/integers"),
      strings  = node .getValue () .getMetaData ("Sunrize/Test/strings");

   expect (booleans) .toEqual ([true, false, true]);
   expect (doubles)  .toEqual ([123.456, 234.567, 345.678]);
   expect (integers) .toEqual ([123, 234, 345]);
   expect (strings)  .toEqual (["abc", "bcd", "cde"]);

   // Remove

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("booleans");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true, false, true))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/booleans");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("doubles");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFDouble (123.456, 234.567, 345.678))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/doubles");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("integers");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFInt32 (123, 234, 345))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/integers");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("strings");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFString ("abc", "bcd", "cde"))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/strings");

   expect (node .metadata) .toBe (null);

   // Override

   node .getValue () .setMetaData ("Sunrize/Test/override", true);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("override");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/override", 123);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("override");
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFInt32 (123))) .toBe (true);

   // Remove

   node .getValue () .removeMetaData ("Sunrize/Test");

   expect (node .metadata) .toBe (null);
});

test ("get/set/removeMetaData fields", () =>
{
   const node = Browser .currentScene .createNode ("WorldInfo");

   const
      img = new X3D .SFImage (2,1,3, new X3D .MFInt32 (1,2)),
      vec = new X3D .SFVec3f (1,2,3);

   node .getValue () .setMetaData ("Sunrize/SFImage", img);
   node .getValue () .setMetaData ("Sunrize/SFVec3f", vec);
   node .getValue () .setMetaData ("Sunrize/MFBool",  new X3D .MFBool (true, false, true));
   node .getValue () .setMetaData ("Sunrize/MFImage", new X3D .MFImage (img, img));
   node .getValue () .setMetaData ("Sunrize/MFVec3f", new X3D .MFVec3f (vec, vec));

   expect (node .metadata ?.value [0] ?.value ?.equals (new X3D .MFInt32 (2,1,3,1,2))) .toBe (true);
   expect (node .metadata ?.value [1] ?.value ?.equals (new X3D .MFFloat (1,2,3))) .toBe (true);
   expect (node .metadata ?.value [2] ?.value ?.equals (new X3D .MFBool (true, false, true))) .toBe (true);
   expect (node .metadata ?.value [3] ?.value ?.equals (new X3D .MFInt32 (2,1,3,1,2, 2,1,3,1,2))) .toBe (true);
   expect (node .metadata ?.value [4] ?.value ?.equals (new X3D .MFFloat (1,2,3, 1,2,3))) .toBe (true);

   let f;

   f = node .getValue () .getMetaData ("Sunrize/SFImage", new X3D .SFImage ());
   expect (f .equals (img)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFVec3f", new X3D .SFVec3f ());
   expect (f .equals (vec)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFBool", new X3D .MFBool ());
   expect (f .equals (new X3D .MFBool (true, false, true))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFImage", new X3D .MFImage ());
   expect (f .equals (new X3D .MFImage (img, img))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFVec3f", new X3D .MFVec3f ());
   expect (f .equals (new X3D .MFVec3f (vec, vec))) .toBe (true);
});
