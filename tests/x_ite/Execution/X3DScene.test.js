const X3D = require ("../../X3D")

test ("constructor", () =>
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
