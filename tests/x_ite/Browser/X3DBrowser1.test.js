const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .constructor) .toBe (X3D .X3DBrowser)
   expect (Browser .name) .toBe ("X_ITE")
   expect (Browser .version) .toMatch (/^\d+\.\d+\.\d+$/)
   expect (Browser .currentSpeed) .toBe (0)
   expect (Browser .currentFrameRate) .toBe (60)
   expect (Browser .description) .toBe ("")
   expect (Browser .supportedProfiles) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (Browser .supportedComponents) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (Browser .currentScene) .toBeInstanceOf (X3D .X3DScene)

   Browser .name                = undefined
   Browser .version             = undefined
   Browser .currentSpeed        = undefined
   Browser .currentFrameRate    = undefined
   Browser .description         = "test"
   Browser .supportedProfiles   = undefined
   Browser .supportedComponents = undefined
   Browser .currentScene        = undefined

   expect (Browser .name) .toBe ("X_ITE")
   expect (Browser .version) .toMatch (/^\d+\.\d+\.\d+$/)
   expect (Browser .providerURL) .toMatch (/^https:\/\//)
   expect (Browser .providerUrl) .toMatch (Browser .providerURL)
   expect (Browser .currentSpeed) .toBe (0)
   expect (Browser .currentFrameRate) .toBe (60)
   expect (Browser .description) .toBe ("test")
   expect (Browser .supportedProfiles) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (Browser .supportedComponents) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (Browser .concreteNodes) .toBeInstanceOf (X3D .ConcreteNodesArray)
   expect (Browser .abstractNodes) .toBeInstanceOf (X3D .AbstractNodesArray)
   expect (Browser .currentScene) .toBeInstanceOf (X3D .X3DScene)
   expect (Browser .toString ()) .toBe (`[object ${Browser .getTypeName ()}]`)

   const properties = [
      "name",
      "version",
      "providerURL",
      "currentSpeed",
      "currentFrameRate",
      "description",
      "supportedProfiles",
      "supportedComponents",
      "concreteNodes",
      "abstractNodes",
      "baseURL",
      "currentScene",
   ]

   enumerate (properties, Browser)
})

test ("vrml-properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
   expect (Browser .getName ()) .toBe (Browser .name)
   expect (Browser .getVersion ()) .toBe (Browser .version)
   expect (Browser .getCurrentSpeed ()) .toBe (Browser .currentSpeed)
   expect (Browser .getCurrentFrameRate ()) .toBe (Browser .currentFrameRate)
   expect (Browser .getDescription ()) .toBe (Browser .description)
   expect (Browser .getWorldURL ()) .toBe (Browser .currentScene .worldURL)

   Browser .setDescription ("test-description")

   expect (Browser .getDescription ()) .toBe ("test-description")
   expect (Browser .description) .toBe ("test-description")
})

test ("getProfile", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const profiles = [
      "CADInterchange",
      "Core",
      "Full",
      "Immersive",
      "Interactive",
      "Interchange",
      "MedicalInterchange",
      "MPEG-4",
   ]

   for (const name of profiles)
      expect (Browser .getProfile (name) .name) .toBe (name)
})

test ("getComponent", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const components = [
      "CADGeometry",
      "Core",
      "CubeMapTexturing",
      "DIS",
      "EnvironmentalEffects",
      "EnvironmentalSensor",
      "EventUtilities",
      "Followers",
      "Geometry2D",
      "Geometry3D",
      "Geospatial",
      "Grouping",
      "HAnim",
      "Interpolation",
      "KeyDeviceSensor",
      "Layering",
      "Layout",
      "Lighting",
      "Navigation",
      "Networking",
      "NURBS",
      "ParticleSystems",
      "Picking",
      "PointingDeviceSensor",
      "Rendering",
      "RigidBodyPhysics",
      "Scripting",
      "Shaders",
      "Shape",
      "Sound",
      "Text",
      "TextureProjector",
      "Texturing",
      "Texturing3D",
      "Time",
      "VolumeRendering",
   ]

   const legacy = [
      ["H-Anim", "HAnim"],
   ]

   for (const name of components)
      expect (Browser .getComponent (name) .name) .toBe (name)

   for (const [name, value] of legacy)
      expect (Browser .getComponent (name) .name) .toBe (value)
})

test ("createScene", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .createScene ()

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("SCRIPTED")
   expect (scene .profile) .toBe (null)
   expect (scene .components) .toHaveLength (0)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes) .toHaveLength (0)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .protos) .toHaveLength (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
})

test ("createScene2", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .createScene (Browser .getProfile ("Interactive"), Browser .getComponent ("HAnim"), Browser .getComponent ("Picking"))

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("SCRIPTED")
   expect (scene .profile) .toBeInstanceOf (X3D .ProfileInfo)
   expect (scene .profile .name) .toBe ("Interactive")
   expect (scene .components) .toHaveLength (2)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .components [0]) .toBeInstanceOf (X3D .ComponentInfo)
   expect (scene .components [0] .name) .toBe ("HAnim")
   expect (scene .components [1]) .toBeInstanceOf (X3D .ComponentInfo)
   expect (scene .components [1] .name) .toBe ("Picking")
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes) .toHaveLength (0)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .protos) .toHaveLength (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
})

test ("createX3DFromURL", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive
COMPONENT Geometry2D:1

Transform {
   children Shape {
      geometry DEF R Rectangle2D { }
   }
}`))

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("VRML")
   expect (scene .profile .name) .toBe ("Interactive")
   expect (scene .components) .toHaveLength (1)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .components [0] .name) .toBe ("Geometry2D")
   expect (scene .worldURL) .toMatch (/^data:/)
   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene .rootNodes [0]) .toBe (scene .rootNodes [0])
   expect (scene .protos) .toHaveLength (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
   expect (scene .getNamedNode ("R") .getNodeTypeName ()) .toBe ("Rectangle2D")
})

test ("createX3DFromURL2", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene1  = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

Transform { }
Shape { }
Box { }
`))

   expect (scene1 .rootNodes) .toHaveLength (3)
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene1 .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene1 .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

   const scene2 = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "loadURL.x3d"))))

   expect (scene2 .rootNodes) .toHaveLength (3)
   expect (scene2 .rootNodes [0] .getNodeTypeName ()) .toBe ("Arc2D")
   expect (scene2 .rootNodes [1] .getNodeTypeName ()) .toBe ("GeoTransform")
   expect (scene2 .rootNodes [2] .getNodeTypeName ()) .toBe ("HAnimJoint")
})

test ("createVrmlFromURL", () => new Promise ((resolve, reject) =>
{
   const
      canvas    = X3D .createBrowser (),
      Browser   = canvas .browser,
      scene     = Browser .currentScene,
      transform = scene .createNode ("Transform")

   Browser .createVrmlFromURL (new X3D .MFString (`data:model/x3d+vrml,
Transform { }
Shape { }
Box { }`), transform, "children")

   transform .addFieldCallback ("children", "test", () =>
   {
      try
      {
         expect (transform .children) .toHaveLength (3)
         expect (transform .children) .toBeInstanceOf (X3D .MFNode)
         expect (transform .children [0]) .toBeInstanceOf (X3D .SFNode)
         expect (transform .children [0] .getNodeTypeName ()) .toBe ("Transform")
         expect (transform .children [0]) .toBe (transform .children [0])
         expect (transform .children [1]) .toBeInstanceOf (X3D .SFNode)
         expect (transform .children [1] .getNodeTypeName ()) .toBe ("Shape")
         expect (transform .children [1]) .toBe (transform .children [1])
         expect (transform .children [2]) .toBeInstanceOf (X3D .SFNode)
         expect (transform .children [2] .getNodeTypeName ()) .toBe ("Box")
         expect (transform .children [2]) .toBe (transform .children [2])

         resolve ()
      }
      catch (error)
      {
         reject (error .message)
      }
   })
}))

test ("createX3DFromString", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromString (`
PROFILE Interactive
COMPONENT NURBS:1

Transform {
   children Shape {
      geometry DEF R NurbsCurve { }
   }
}`)

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("VRML")
   expect (scene .profile .name) .toBe ("Interactive")
   expect (scene .components) .toHaveLength (1)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .components [0] .name) .toBe ("NURBS")
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene .rootNodes [0]) .toBe (scene .rootNodes [0])
   expect (scene .protos) .toHaveLength (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
   expect (scene .getNamedNode ("R") .getNodeTypeName ()) .toBe ("NurbsCurve")
})

test ("createX3DFromString2", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   const scene1 = await Browser .createX3DFromString (`
PROFILE Interactive

Transform { }
Shape { }
Box { }
`)

   expect (scene1 .rootNodes) .toHaveLength (3)
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene1 .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (scene1 .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")
})

test ("createVrmlFromString", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      nodes   = Browser .createVrmlFromString (`
Transform {
   children Shape {
      geometry DEF R Box { }
   }
}
Group { }
Script { }`)

   expect (nodes) .toHaveLength (3)
   expect (nodes) .toBeInstanceOf (X3D .MFNode)
   expect (nodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (nodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (nodes [0]) .toBe (nodes [0])
   expect (nodes [0] .children) .toHaveLength (1)
   expect (nodes [0] .children [0] .getNodeTypeName ()) .toBe ("Shape")
   expect (nodes [0] .children [0] .geometry .getNodeTypeName ()) .toBe ("Box")
   expect (nodes [1]) .toBeInstanceOf (X3D .SFNode)
   expect (nodes [1] .getNodeTypeName ()) .toBe ("Group")
   expect (nodes [1]) .toBe (nodes [1])
   expect (nodes [2]) .toBeInstanceOf (X3D .SFNode)
   expect (nodes [2] .getNodeTypeName ()) .toBe ("Script")
   expect (nodes [2]) .toBe (nodes [2])
})

test ("replaceWorld", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromString (`
PROFILE Interactive

Transform { }
Shape { }
Box { }
`)

   Browser .replaceWorld (scene)

   expect (Browser .currentScene) .toBe (scene)
   expect (Browser .currentScene .rootNodes) .toHaveLength (3)

   Browser .replaceWorld (null)

   expect (Browser .currentScene) .not .toBe (scene)
   expect (Browser .currentScene .rootNodes) .toHaveLength (0)
})

test ("vrml-replaceWorld", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromString (`
PROFILE Interactive

Transform { }
Shape { }
Box { }
`)

   Browser .replaceWorld (scene .rootNodes)

   expect (Browser .currentScene .rootNodes) .toHaveLength (3)

   for (const [i, node] of Browser .currentScene .rootNodes .entries ())
      expect (node) .toBe (scene .rootNodes [i])
})

test ("loadURL", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

Transform { }
Shape { }
Box { }
`))

   expect (Browser .currentScene .rootNodes) .toHaveLength (3)
   expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("Shape")
   expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("Box")

   await Browser .loadURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "loadURL.x3d"))))

   expect (Browser .currentScene .rootNodes) .toHaveLength (3)
   expect (Browser .currentScene .rootNodes [0] .getNodeTypeName ()) .toBe ("Arc2D")
   expect (Browser .currentScene .rootNodes [1] .getNodeTypeName ()) .toBe ("GeoTransform")
   expect (Browser .currentScene .rootNodes [2] .getNodeTypeName ()) .toBe ("HAnimJoint")
})

test ("addRoute/deleteRoute", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   await Browser .loadURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF T TimeSensor { }
DEF I PositionInterpolator { }
DEF X Transform { }
`))

   const scene = Browser .currentScene

   expect (scene .rootNodes) .toHaveLength (3)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("TimeSensor")
   expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("PositionInterpolator")
   expect (scene .rootNodes [2] .getNodeTypeName ()) .toBe ("Transform")

   Browser .addRoute (scene .rootNodes [0], "fraction_changed", scene .rootNodes [1], "set_fraction")

   expect (scene .routes) .toHaveLength (1)
   expect (scene .routes [0] .sourceNode) .toBe (scene .rootNodes [0])
   expect (scene .routes [0] .sourceField) .toBe ("fraction_changed")
   expect (scene .routes [0] .destinationNode) .toBe (scene .rootNodes [1])
   expect (scene .routes [0] .destinationField) .toBe ("set_fraction")

   Browser .addRoute (scene .rootNodes [1], "value_changed", scene .rootNodes [2], "translation")

   expect (scene .routes) .toHaveLength (2)
   expect (scene .routes [0] .sourceNode) .toBe (scene .rootNodes [0])
   expect (scene .routes [0] .sourceField) .toBe ("fraction_changed")
   expect (scene .routes [0] .destinationNode) .toBe (scene .rootNodes [1])
   expect (scene .routes [0] .destinationField) .toBe ("set_fraction")
   expect (scene .routes [1] .sourceNode) .toBe (scene .rootNodes [1])
   expect (scene .routes [1] .sourceField) .toBe ("value_changed")
   expect (scene .routes [1] .destinationNode) .toBe (scene .rootNodes [2])
   expect (scene .routes [1] .destinationField) .toBe ("translation")

   Browser .deleteRoute (scene .rootNodes [0], "fraction_changed", scene .rootNodes [1], "set_fraction")

   expect (scene .routes) .toHaveLength (1)
   expect (scene .routes [0] .sourceNode) .toBe (scene .rootNodes [1])
   expect (scene .routes [0] .sourceField) .toBe ("value_changed")
   expect (scene .routes [0] .destinationNode) .toBe (scene .rootNodes [2])
   expect (scene .routes [0] .destinationField) .toBe ("translation")

   Browser .deleteRoute (scene .rootNodes [1], "value_changed", scene .rootNodes [2], "translation")

   expect (scene .routes) .toHaveLength (0)
})
