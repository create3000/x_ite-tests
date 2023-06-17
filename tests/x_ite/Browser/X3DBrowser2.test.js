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

   Browser .addSupportedComponent (Test)

   expect (() => Browser .getComponent ("Test", 1)) .not .toThrow (Error)

   const scene = await Browser .createX3DFromString (`
COMPONENT Test:1

TestNode { }
   `)

   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("TestNode")
   expect (X3D .X3DConstants .TestNode) .toBeGreaterThan (0)
   expect (scene .rootNodes [0] .getNodeType () .includes (X3D .X3DConstants .TestNode)) .toBe (true)
})
