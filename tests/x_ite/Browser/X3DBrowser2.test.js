const
   path = require ("path"),
   url  = require ("url")

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

test ("getRenderingProperty", () =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser .getRenderingProperty ("Shading")) .toBe ("GOURAUD")
   expect (Browser .getRenderingProperty ("MaxTextureSize")) .toBeGreaterThanOrEqual (128)
   expect (Browser .getRenderingProperty ("TextureUnits")) .toBeGreaterThanOrEqual (8)
   expect (Browser .getRenderingProperty ("MaxLights")) .toBeGreaterThanOrEqual (8)
   expect (Browser .getRenderingProperty ("Antialiased")) .toBe (true)
   expect (Browser .getRenderingProperty ("ColorDepth")) .toBe (32)
   expect (Browser .getRenderingProperty ("TextureMemory")) .toBe (NaN)
   expect (Browser .getRenderingProperty ("ContentScale")) .toBe (1)
   expect (Browser .getRenderingProperty ("MaxSamples")) .toBeGreaterThanOrEqual (1)
   expect (Browser .getRenderingProperty ("Multisampling")) .toBeGreaterThanOrEqual (1)
   expect (Browser .getRenderingProperty ("LogarithmicDepthBuffer")) .toBe (false)
})

test ("INITIALIZED_EVENT", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   Browser .loadURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF T TimeSensor { }
DEF I PositionInterpolator { }
DEF X Transform { }
`))

   Browser .addBrowserCallback ("test", (event) =>
   {
      try
      {
         if (event !== X3D .X3DConstants .INITIALIZED_EVENT)
            return;

         const scene = Browser .currentScene

         expect (scene .rootNodes) .toHaveLength (3)
         expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("TimeSensor")
         expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("PositionInterpolator")
         expect (scene .rootNodes [2] .getNodeTypeName ()) .toBe ("Transform")

         Browser .removeBrowserCallback ("test")

         expect (Browser .getBrowserCallbacks () .size) .toBe (0)

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   expect (Browser .getBrowserCallbacks () .size) .toBe (1)
}))

test ("SHUTDOWN_EVENT", () => new Promise ((resolve, reject) =>
{
   const
      canvas = X3D .createBrowser (),
      Browser = canvas .browser,
      initialScene = Browser .currentScene

   Browser .loadURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF T TimeSensor { }
DEF I PositionInterpolator { }
DEF X Transform { }
`))

   Browser .addBrowserCallback ("test", (event) =>
   {
      try
      {
         if (event !== X3D .X3DConstants .SHUTDOWN_EVENT)
            return;

         const scene = Browser .currentScene

         expect (scene) .toBe (initialScene)
         expect (scene .rootNodes) .toHaveLength (0)

         Browser .removeBrowserCallback ("test")

         expect (Browser .getBrowserCallbacks () .size) .toBe (0)

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   expect (Browser .getBrowserCallbacks () .size) .toBe (1)
}))
