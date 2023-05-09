const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser) .toBeInstanceOf (X3D .X3DBrowser)
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
   expect (Browser .currentSpeed) .toBe (0)
   expect (Browser .currentFrameRate) .toBe (60)
   expect (Browser .description) .toBe ("test")
   expect (Browser .supportedProfiles) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (Browser .supportedComponents) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (Browser .currentScene) .toBeInstanceOf (X3D .X3DScene)

   function enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   }

   const properties = [
      "name",
      "version",
      "providerUrl",
      "currentSpeed",
      "currentFrameRate",
      "description",
      "supportedProfiles",
      "supportedComponents",
      "baseURL",
      "currentScene",
   ]

   enumerate (properties, Browser)
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
      "Shaders",
      "Rendering",
      "RigidBodyPhysics",
      "Scripting",
      "Shape",
      "Sound",
      "Text",
      "Texturing",
      "Texturing3D",
      "Time",
      "VolumeRendering",
   ]

   const legacy = [
      "H-Anim",
   ]

   for (const name of [... components, ... legacy])
      expect (Browser .getComponent (name) .name) .toBe (name)
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

test ("createX3DFromURL", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive
COMPONENT Shape:1

Transform {
   children Shape {
      geometry Box { }
   }
}`))

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("VRML")
   expect (scene .profile .name) .toBe ("Interactive")
   expect (scene .components) .toHaveLength (1)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .components [0] .name) .toBe ("Shape")
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
})
