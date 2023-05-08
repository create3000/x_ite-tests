const X3D = require ("../../X3D")

test ("properties", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser

   expect (Browser .name) .toBe ("X_ITE")
   expect (Browser .version) .toMatch (/^\d+\.\d+\.\d+$/)
   expect (Browser .currentSpeed) .toBe (0)
   expect (Browser .currentFrameRate) .toBeCloseTo (0)
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
   expect (Browser .currentFrameRate) .toBeCloseTo (0)
   expect (Browser .description) .toBe ("test")
   expect (Browser .supportedProfiles) .toBeInstanceOf (X3D .ProfileInfoArray)
   expect (Browser .supportedComponents) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (Browser .currentScene) .toBeInstanceOf (X3D .X3DScene)
})

test ("createScene", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .createScene ()

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
