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
   expect (scene .components .length) .toBe (0)
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes .length) .toBe (0)
   expect (scene .protos .length) .toBe (0)
   expect (scene .externprotos .length) .toBe (0)
   expect (scene .routes .length) .toBe (0)
})
