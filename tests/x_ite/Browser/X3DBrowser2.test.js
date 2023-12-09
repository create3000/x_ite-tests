const
   path = require ("path"),
   url  = require ("url"),
   $    = require ("jquery")

const X3D = window .X3D = require ("../../X3D")

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
   expect (Browser .getBrowserOption ("OrderIndependentTransparency")) .toBe (false)
   expect (Browser .getBrowserOption ("StraightenHorizon")) .toBe (true)
   expect (Browser .getBrowserOption ("Timings")) .toBe (false)
})

test ("getRenderingProperty", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser;

   expect (Browser .getRenderingProperty ("Shading")) .toBe ("GOURAUD")
   expect (Browser .getRenderingProperty ("MaxTextureSize")) .toBeGreaterThanOrEqual (128)
   expect (Browser .getRenderingProperty ("TextureUnits")) .toBeGreaterThanOrEqual (8)
   expect (Browser .getRenderingProperty ("MaxLights")) .toBeGreaterThanOrEqual (8)
   expect (Browser .getRenderingProperty ("Antialiased")) .toBe (true)
   expect (Browser .getRenderingProperty ("ColorDepth")) .toBeGreaterThanOrEqual (32)
   expect (Browser .getRenderingProperty ("TextureMemory")) .toBe (NaN)
   expect (Browser .getRenderingProperty ("ContentScale")) .toBe (1)
   expect (Browser .getRenderingProperty ("MaxSamples")) .toBeGreaterThanOrEqual (1)
   expect (Browser .getRenderingProperty ("Multisampling")) .toBeGreaterThanOrEqual (1)
   expect (Browser .getRenderingProperty ("LogarithmicDepthBuffer")) .toBe (false)
})

test ("INITIALIZED_EVENT 2", () => new Promise ((resolve, reject) =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser;

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

test ("SHUTDOWN_EVENT 2", () => new Promise ((resolve, reject) =>
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


test ("INITIALIZED_EVENT 3", () => new Promise ((resolve, reject) =>
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

   Browser .addBrowserCallback ("test", X3D .X3DConstants .INITIALIZED_EVENT, (event) =>
   {
      try
      {
         const scene = Browser .currentScene

         expect (scene .rootNodes) .toHaveLength (3)
         expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("TimeSensor")
         expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("PositionInterpolator")
         expect (scene .rootNodes [2] .getNodeTypeName ()) .toBe ("Transform")

         Browser .removeBrowserCallback ("test", X3D .X3DConstants .INITIALIZED_EVENT)

         expect (Browser .getBrowserCallbacks (X3D .X3DConstants .INITIALIZED_EVENT) .size) .toBe (0)

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   expect (Browser .getBrowserCallbacks (X3D .X3DConstants .INITIALIZED_EVENT) .size) .toBe (1)
}))

test ("SHUTDOWN_EVENT 3", () => new Promise ((resolve, reject) =>
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

   Browser .addBrowserCallback ("test", X3D .X3DConstants .SHUTDOWN_EVENT, (event) =>
   {
      try
      {
         const scene = Browser .currentScene

         expect (scene) .toBe (initialScene)
         expect (scene .rootNodes) .toHaveLength (0)

         Browser .removeBrowserCallback ("test", X3D .X3DConstants .SHUTDOWN_EVENT)

         expect (Browser .getBrowserCallbacks (X3D .X3DConstants .SHUTDOWN_EVENT) .size) .toBe (0)

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })

   expect (Browser .getBrowserCallbacks (X3D .X3DConstants .SHUTDOWN_EVENT) .size) .toBe (1)
}))


test ("importDocument", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const scene1 = await Browser .importDocument ($.parseXML (`
<X3D>
   <Scene>
      <Transform/>
      <Shape/>
      <Box/>
   </Scene>
</X3D>`))

   expect (scene1 .rootNodes) .toHaveLength (3)
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene1 .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene1 .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

   const scene2 = await Browser .importDocument (`
<X3D>
   <Scene>
      <Transform/>
      <Shape/>
      <Box/>
   </Scene>
</X3D>`)

   expect (scene2 .rootNodes) .toHaveLength (3)
   expect (scene2 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene2 .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene2 .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

   const scene3 = await Browser .importDocument (`<Transform/>`)

   expect (scene3 .rootNodes) .toHaveLength (1)
   expect (scene3 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
})

test ("importJS", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const scene1 = await Browser .importJS ({ "X3D": {
      "encoding": "UTF-8",
      "@profile": "Interchange",
      "@version": "4.0",
      "Scene": {
         "-children": [
            { "Transform": { } },
            { "Shape": { } },
            { "Box": { } }
         ]
      }
   }})

   expect (scene1 .rootNodes) .toHaveLength (3)
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene1 .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene1 .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

   const scene2 = await Browser .importJS (`{ "X3D": {
      "encoding": "UTF-8",
      "@profile": "Interchange",
      "@version": "4.0",
      "Scene": {
         "-children": [
            { "Transform": { } },
            { "Shape": { } },
            { "Box": { } }
         ]
      }
   }}`)

   expect (scene2 .rootNodes) .toHaveLength (3)
   expect (scene2 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene2 .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene2 .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")
})

test ("VRML", async () =>
{
   const typeNames = [
      "Anchor",
      "Appearance",
      "AudioClip",
      "Background",
      "Billboard",
      "Box",
      "Collision",
      "Color",
      "ColorInterpolator",
      "Cone",
      "Coordinate",
      "CoordinateInterpolator",
      "Cylinder",
      "CylinderSensor",
      "DirectionalLight",
      "ElevationGrid",
      "Extrusion",
      "Fog",
      "FontStyle",
      "Group",
      "ImageTexture",
      "IndexedFaceSet",
      "IndexedLineSet",
      "Inline",
      "LOD",
      "Material",
      "MovieTexture",
      "NavigationInfo",
      "Normal",
      "NormalInterpolator",
      "OrientationInterpolator",
      "PixelTexture",
      "PlaneSensor",
      "PointLight",
      "PointSet",
      "PositionInterpolator",
      "ProximitySensor",
      "ScalarInterpolator",
      "Script",
      "Shape",
      "Sound",
      "Sphere",
      "SphereSensor",
      "SpotLight",
      "Switch",
      "Text",
      "TextureCoordinate",
      "TextureTransform",
      "TimeSensor",
      "TouchSensor",
      "Transform",
      "Viewpoint",
      "VisibilitySensor",
      "WorldInfo",
   ]

   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromString (`#VRML V2.0 utf8

${typeNames .map (n => `${n}{}`) .join ("\n")}
`)

   expect (scene .encoding) .toBe ("VRML")

   for (const [i, typeName] of typeNames .entries ())
      expect (scene .rootNodes [i] .getNodeTypeName ()) .toBe (typeName)
})

test ("Profile/Component Handling", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      Test    = new X3D .ComponentInfo ("Test", 1, "Test Component", url .pathToFileURL (path .join (__dirname, "files", "TestComponent.js")), true, [ ])

   expect (() => Browser .getSupportedComponent ("Test")) .toThrow (Error)
   expect (() => Browser .getComponent ("Test", 1))       .toThrow (Error)
   expect (() => Browser .getConcreteNode ("TestNode"))   .toThrow (Error)

   Browser .addSupportedComponent (Test)

   expect (() => Browser .getSupportedComponent ("Test")) .not .toThrow (Error)
   expect (() => Browser .getComponent ("Test", 1))       .not .toThrow (Error)

   const scene = await Browser .createX3DFromString (`
COMPONENT Test:1

TestNode { }
   `)

   expect (() => Browser .getConcreteNode ("TestNode")) .not .toThrow (Error)
   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("TestNode")
   expect (X3D .X3DConstants .TestNode) .toBeGreaterThan (0)
   expect (scene .rootNodes [0] .getNodeType () .includes (X3D .X3DConstants .TestNode)) .toBe (true)
   expect (scene .rootNodes [0] .test) .toBe ("TestValue")
})

test ("baseURL - createX3DFromString - depreciated", () => new Promise (async (resolve, reject) =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   Browser .baseURL = url .pathToFileURL (path .join (__dirname, "files/"))

   const scene = await Browser .createX3DFromString (`
PROFILE Core
COMPONENT Networking : 1

DEF I Inline {
   url "box.x3d"
}
DEF L LoadSensor {
   children USE I
}
   `)

   expect (scene .rootNodes) .toHaveLength (2)

   scene .getNamedNode ("L") .addFieldCallback ("loadTime", "test", (arg) =>
   {
      try
      {
         const I = scene .getNamedNode ("I")

         expect (typeof arg) .toBe ("number");
         expect (I .getValue () .getInternalScene () .rootNodes) .toHaveLength (1)
         expect (I .getValue () .getInternalScene () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })
}))

test ("baseURL - createX3DFromString", () => new Promise (async (resolve, reject) =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   Browser .baseURL = url .pathToFileURL (path .join (__dirname, "files/"))

   const scene = await Browser .createX3DFromString (`
PROFILE Core
COMPONENT Networking : 1

DEF I Inline {
   url "box.x3d"
}
DEF L LoadSensor {
   children USE I
}
   `)

   expect (scene .rootNodes) .toHaveLength (2)

   scene .getNamedNode ("L") .getField ("loadTime") .addFieldCallback ("test", (arg) =>
   {
      try
      {
         const I = scene .getNamedNode ("I")

         expect (typeof arg) .toBe ("number");
         expect (I .getValue () .getInternalScene () .rootNodes) .toHaveLength (1)
         expect (I .getValue () .getInternalScene () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })
}))

test ("baseURL - createVrmlFromString", () => new Promise (async (resolve, reject) =>
{
   try
   {

   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   Browser .baseURL = url .pathToFileURL (path .join (__dirname, "files/"))

   const rootNodes = Browser .createVrmlFromString (`
DEF I Inline {
   url "box.x3d"
}
   `)

   expect (rootNodes) .toHaveLength (1)

   rootNodes [0] .getValue () ._loadState .addFieldCallback ("test", (loadState) =>
   {
      try
      {
         expect (typeof loadState) .toBe ("number");

         if (loadState !== X3D .X3DConstants .COMPLETE_STATE)
            return

         const I = rootNodes [0]

         expect (I .getValue () .getInternalScene () .rootNodes) .toHaveLength (1)
         expect (I .getValue () .getInternalScene () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })
}
catch (error)
{
   reject (error .message)
}
}))

test ("baseURL - loadURL", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   Browser .baseURL = url .pathToFileURL (path .join (__dirname, "files/"))

   await Browser .loadURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Core
COMPONENT Networking : 1

DEF I Inline {
   url "box.x3d"
}
DEF L LoadSensor {
   children USE I
}
   `))

   const scene = Browser .currentScene

   expect (scene .worldURL) .toMatch (/^data:/)
   expect (scene .baseURL) .toMatch (/^file:\/\//)
   expect (scene .rootNodes) .toHaveLength (2)

   const I = scene .getNamedNode ("I")

   expect (I .getValue () .getInternalScene () .rootNodes) .toHaveLength (1)
   expect (I .getValue () .getInternalScene () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
})

test ("blob URL", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const
      response = await fetch (url .pathToFileURL (path .join (__dirname, "files", "box-with-wrong-texture.x3d"))),
      blob     = await response .blob ()

   await Browser .loadURL (new X3D .MFString (URL .createObjectURL (blob)));

   expect (Browser .currentScene .worldURL) .toMatch (/^blob:/)
   expect (Browser .currentScene .baseURL) .toMatch (/^file:\/\//)
   expect (Browser .currentScene .rootNodes) .toHaveLength (1)
   expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
})
