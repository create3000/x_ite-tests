const X3D = require ("../../../X3D");

const
   canvas    = X3D .createBrowser (),
   Browser   = canvas .browser,
   reference = "test reference";

Browser .setBrowserOption ("MetadataReference", reference)

test ("get/set/removeMetaData basic types", () =>
{
   const node = Browser .currentScene .createNode ("WorldInfo");

   // Set

   node .getValue () .setMetaData ("Sunrize/Test/boolean", true);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("boolean");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/double", 123.456);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [1] .name) .toBe ("double");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [1] .value .equals (new X3D .MFDouble (123.456))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/integer", 123);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [2] .name) .toBe ("integer");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [2] .value .equals (new X3D .MFInt32 (123))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/string", "abc");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [3] .name) .toBe ("string");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
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
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("boolean");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/boolean");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("double");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFDouble (123.456))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/double");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("integer");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFInt32 (123))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/integer");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("string");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
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
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("booleans");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true, false, true))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/doubles", [123.456, 234.567, 345.678]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [1] .name) .toBe ("doubles");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [1] .value .equals (new X3D .MFDouble (123.456, 234.567, 345.678))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/integers", [123, 234, 345]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [2] .name) .toBe ("integers");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [2] .value .equals (new X3D .MFInt32 (123, 234, 345))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/strings", ["abc", "bcd", "cde"]);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [3] .name) .toBe ("strings");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
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
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (4);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("booleans");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true, false, true))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/booleans");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (3);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("doubles");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFDouble (123.456, 234.567, 345.678))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/doubles");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (2);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("integers");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFInt32 (123, 234, 345))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/integers");

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("strings");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFString ("abc", "bcd", "cde"))) .toBe (true);

   node .getValue () .removeMetaData ("Sunrize/Test/strings");

   expect (node .metadata) .toBe (null);

   // Override

   node .getValue () .setMetaData ("Sunrize/Test/override", true);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("override");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFBool (true))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Test/override", 123);

   expect (node .metadata) .toBeInstanceOf (X3D .SFNode);
   expect (node .metadata .name) .toBe ("Sunrize");
   expect (node .metadata .reference) .toBe (reference);
   expect (node .metadata .value) .toHaveLength (1);
   expect (node .metadata .value [0] .name) .toBe ("Test");
   expect (node .metadata .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value) .toHaveLength (1);
   expect (node .metadata .value [0] .value [0] .name) .toBe ("override");
   expect (node .metadata .value [0] .value [0] .reference) .toBe (reference);
   expect (node .metadata .value [0] .value [0] .value .equals (new X3D .MFInt32 (123))) .toBe (true);

   // Remove

   node .getValue () .removeMetaData ("Sunrize/Test");

   expect (node .metadata) .toBe (null);

   // Set and remove

   node .getValue () .setMetaData ("Sunrize/Test/foo", 123);
   node .getValue () .setMetaData ("Sunrize/foo", 234);

   node .getValue () .removeMetaData ("Sunrize/Test/bah");

   expect (node .metadata ?.value) .toHaveLength (2);
   expect (node .metadata ?.value [0] ?.value) .toHaveLength (1);

   node .getValue () .removeMetaData ("Sunrize/foo");

   expect (node .metadata ?.value) .toHaveLength (1);
   expect (node .metadata ?.value [0] ?.value) .toHaveLength (1);

   node .getValue () .removeMetaData ("Sunrize/Test/foo");

   expect (node .metadata) .toBe (null);
});

test ("get/set/removeMetaData fields", () =>
{
   const node = Browser .currentScene .createNode ("WorldInfo");

   const
      img  = new X3D .SFImage (2,1,3, new X3D .MFInt32 (1,2)),
      vec  = new X3D .SFVec3f (1,2,3),
      dvec = new X3D .SFVec4d (1,2,3,4);

   let f;

   f = node .getValue () .getMetaData ("Sunrize/SFBool", new X3D .SFBool (true));
   expect (f .equals (true)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFFloat", new X3D .SFFloat (123));
   expect (f .equals (123)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFImage", img .copy ());
   expect (f .equals (img)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFString", new X3D .SFString ("abc"));
   expect (f .equals ("abc")) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFVec3f", new X3D .SFVec3f (... vec));
   expect (f .equals (vec)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFVec4d", new X3D .SFVec4d (... dvec));
   expect (f .equals (dvec)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFBool", new X3D .MFBool (true, false, true));
   expect (f .equals (new X3D .MFBool (true, false, true))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFImage", new X3D .MFImage (img, img));
   expect (f .equals (new X3D .MFImage (img, img))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFString", new X3D .MFString ("abc", "bcd"));
   expect (f .equals (new X3D .MFString ("abc", "bcd"))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFVec3f", new X3D .MFVec3f (vec, vec));
   expect (f .equals (new X3D .MFVec3f (vec, vec))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFVec4d", new X3D .MFVec4d (dvec, dvec));
   expect (f .equals (new X3D .MFVec4d (dvec, dvec))) .toBe (true);

   expect (node .metadata) .toBe (null);

   node .getValue () .setMetaData ("Sunrize/SFBool",   new X3D .SFBool (true));
   node .getValue () .setMetaData ("Sunrize/SFFloat",  new X3D .SFFloat (123));
   node .getValue () .setMetaData ("Sunrize/SFImage",  img);
   node .getValue () .setMetaData ("Sunrize/SFString", new X3D .SFString ("abc"));
   node .getValue () .setMetaData ("Sunrize/SFVec3f",  vec);
   node .getValue () .setMetaData ("Sunrize/SFVec4d",  dvec);
   node .getValue () .setMetaData ("Sunrize/MFBool",   new X3D .MFBool (true, false, true));
   node .getValue () .setMetaData ("Sunrize/MFImage",  new X3D .MFImage (img, img));
   node .getValue () .setMetaData ("Sunrize/MFString", new X3D .MFString ("abc", "bcd"));
   node .getValue () .setMetaData ("Sunrize/MFVec3f",  new X3D .MFVec3f (vec, vec));
   node .getValue () .setMetaData ("Sunrize/MFVec4d",  new X3D .MFVec4d (dvec, dvec));

   let i = 0;
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFBool (true))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFFloat (123))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFInt32 (2,1,3,1,2))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFString ("abc"))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFFloat (1,2,3))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFDouble (1,2,3,4))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFBool (true, false, true))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFInt32 (2,1,3,1,2, 2,1,3,1,2))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFString ("abc", "bcd"))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFFloat (1,2,3, 1,2,3))) .toBe (true);
   expect (node .metadata ?.value [i ++] ?.value ?.equals (new X3D .MFDouble (1,2,3,4, 1,2,3,4))) .toBe (true);

   f = node .getValue () .getMetaData ("Sunrize/SFBool", new X3D .SFBool ());
   expect (f .equals (true)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFFloat", new X3D .SFFloat ());
   expect (f .equals (123)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFImage", new X3D .SFImage ());
   expect (f .equals (img)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFString", new X3D .SFString ());
   expect (f .equals ("abc")) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFVec3f", new X3D .SFVec3f ());
   expect (f .equals (vec)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/SFVec4d", new X3D .SFVec4d ());
   expect (f .equals (dvec)) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFBool", new X3D .MFBool ());
   expect (f .equals (new X3D .MFBool (true, false, true))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFImage", new X3D .MFImage ());
   expect (f .equals (new X3D .MFImage (img, img))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFString", new X3D .MFString ());
   expect (f .equals (new X3D .MFString ("abc", "bcd"))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFVec3f", new X3D .MFVec3f ());
   expect (f .equals (new X3D .MFVec3f (vec, vec))) .toBe (true);
   f = node .getValue () .getMetaData ("Sunrize/MFVec4d", new X3D .MFVec4d ());
   expect (f .equals (new X3D .MFVec4d (dvec, dvec))) .toBe (true);
});

test ("get/set/removeMetaData numbers", () =>
{
   const node = Browser .currentScene .createNode ("WorldInfo");

   let v;

   v = node .getValue () .getMetaData ("Sunrize/Color3", new X3D .Color3 (0.1,0.2,0.3));
   expect (v .equals (new X3D .Color3 (0.1,0.2,0.3))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Color3", new X3D .Color3 (0.2,0.3,0.4));
   v = node .getValue () .getMetaData ("Sunrize/Color3", new X3D .Color3 ());
   expect (v .equals (new X3D .Color3 (0.2,0.3,0.4))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Color4", new X3D .Color4 (0.1,0.2,0.3,0.4));
   expect (v .equals (new X3D .Color4 (0.1,0.2,0.3,0.4))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Color4", new X3D .Color4 (0.2,0.3,0.4,0.5));
   v = node .getValue () .getMetaData ("Sunrize/Color4", new X3D .Color4 ());
   expect (v .equals (new X3D .Color4 (0.2,0.3,0.4,0.5))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Complex", new X3D .Complex (1,2));
   expect (v .equals (new X3D .Complex (1,2))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Complex", new X3D .Complex (2,3));
   v = node .getValue () .getMetaData ("Sunrize/Complex", new X3D .Complex ());
   expect (v .equals (new X3D .Complex (2,3))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Matrix2", new X3D .Matrix2 (1,2,3,4));
   expect (v .equals (new X3D .Matrix2 (1,2,3,4))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Matrix2", new X3D .Matrix2 (2,3,4,5));
   v = node .getValue () .getMetaData ("Sunrize/Matrix2", new X3D .Matrix2 ());
   expect (v .equals (new X3D .Matrix4 (2,3,4,5))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Matrix3", new X3D .Matrix3 (1,2,3,4,5,6,7,8,9));
   expect (v .equals (new X3D .Matrix3 (1,2,3,4,5,6,7,8,9))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Matrix3", new X3D .Matrix3 (2,3,4,5,6,7,8,9,0));
   v = node .getValue () .getMetaData ("Sunrize/Matrix3", new X3D .Matrix3 ());
   expect (v .equals (new X3D .Matrix4 (2,3,4,5,6,7,8,9,0))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Matrix4", new X3D .Matrix4 (1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6));
   expect (v .equals (new X3D .Matrix4 (1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Matrix4", new X3D .Matrix4 (2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7));
   v = node .getValue () .getMetaData ("Sunrize/Matrix4", new X3D .Matrix4 ());
   expect (v .equals (new X3D .Matrix4 (2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Quaternion", new X3D .Quaternion (1,2,3,4));
   expect (v .equals (new X3D .Quaternion (1,2,3,4))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Quaternion", new X3D .Quaternion (2,3,4,5));
   v = node .getValue () .getMetaData ("Sunrize/Quaternion", new X3D .Quaternion ());
   expect (v .equals (new X3D .Quaternion (2,3,4,5))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Rotation4", new X3D .Rotation4 (1,2,3,4));
   expect (v .equals (new X3D .Rotation4 (1,2,3,4))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Rotation4", new X3D .Rotation4 (2,3,4,5));
   v = node .getValue () .getMetaData ("Sunrize/Rotation4", new X3D .Rotation4 ());
   expect (v .equals (new X3D .Rotation4 (2,3,4,5))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Vector2", new X3D .Vector2 (1,2));
   expect (v .equals (new X3D .Vector2 (1,2))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Vector2", new X3D .Vector2 (2,3));
   v = node .getValue () .getMetaData ("Sunrize/Vector2", new X3D .Vector2 ());
   expect (v .equals (new X3D .Vector2 (2,3))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Vector3", new X3D .Vector3 (1,2,3));
   expect (v .equals (new X3D .Vector3 (1,2,3))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Vector3", new X3D .Vector3 (2,3,4));
   v = node .getValue () .getMetaData ("Sunrize/Vector3", new X3D .Vector3 ());
   expect (v .equals (new X3D .Vector3 (2,3,4))) .toBe (true);

   v = node .getValue () .getMetaData ("Sunrize/Vector4", new X3D .Vector4 (1,2,3,4));
   expect (v .equals (new X3D .Vector4 (1,2,3,4))) .toBe (true);

   node .getValue () .setMetaData ("Sunrize/Vector4", new X3D .Vector4 (2,3,4,5));
   v = node .getValue () .getMetaData ("Sunrize/Vector4", new X3D .Vector4 ());
   expect (v .equals (new X3D .Vector4 (2,3,4,5))) .toBe (true);
});
