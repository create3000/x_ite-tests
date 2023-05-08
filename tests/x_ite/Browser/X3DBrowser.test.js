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
