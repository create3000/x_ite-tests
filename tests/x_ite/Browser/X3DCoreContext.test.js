const X3D = require ("../../X3D")

test ("getBrowserProperty", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser .getBrowserProperty ("ABSTRACT_NODES")) .toBe (true)
   expect (Browser .getBrowserProperty ("CONCRETE_NODES")) .toBe (true)
   expect (Browser .getBrowserProperty ("EXTERNAL_INTERACTIONS")) .toBe (true)
   expect (Browser .getBrowserProperty ("PROTOTYPE_CREATE")) .toBe (true)
   expect (Browser .getBrowserProperty ("DOM_IMPORT")) .toBe (true)
   expect (Browser .getBrowserProperty ("XML_ENCODING")) .toBe (true)
   expect (Browser .getBrowserProperty ("CLASSIC_VRML_ENCODING")) .toBe (true)
   expect (Browser .getBrowserProperty ("BINARY_ENCODING")) .toBe (false)
})

test ("getBrowserOption", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser .getBrowserOption ("Antialiased")) .toBe (true)
   expect (Browser .getBrowserOption ("Dashboard")) .toBe (true)
   expect (Browser .getBrowserOption ("Rubberband")) .toBe (true)
   expect (Browser .getBrowserOption ("EnableInlineViewpoints")) .toBe (true)
   expect (Browser .getBrowserOption ("MotionBlur")) .toBe (false)
   expect (Browser .getBrowserOption ("PrimitiveQuality")) .toBe ("MEDIUM")
   expect (Browser .getBrowserOption ("QualityWhenMoving")) .toBe ("SAME")
   expect (Browser .getBrowserOption ("Shading")) .toBe ("GOURAUD")
   expect (Browser .getBrowserOption ("SplashScreen")) .toBe (true)
   expect (Browser .getBrowserOption ("TextureQuality")) .toBe ("MEDIUM")

   expect (Browser .getBrowserOption ("Cache")) .toBe (true)
   expect (Browser .getBrowserOption ("ContentScale")) .toBe (1)
   expect (Browser .getBrowserOption ("ContextMenu")) .toBe (true)
   expect (Browser .getBrowserOption ("Debug")) .toBe (false)
   expect (Browser .getBrowserOption ("Gravity")) .toBe (9.80665)
   expect (Browser .getBrowserOption ("LogarithmicDepthBuffer")) .toBe (false)
   expect (Browser .getBrowserOption ("Multisampling")) .toBe (4)
   expect (Browser .getBrowserOption ("Notifications")) .toBe (true)
   expect (Browser .getBrowserOption ("StraightenHorizon")) .toBe (true)
   expect (Browser .getBrowserOption ("Timings")) .toBe (false)
})
