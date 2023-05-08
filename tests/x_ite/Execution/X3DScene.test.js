const X3D = require ("../../X3D")

test ("properties1", () =>
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

test ("properties2", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .createScene (),
      nodes   = new X3D .MFNode (scene .createNode ("WorldInfo"))

   scene .specificationVersion = undefined
   scene .encoding             = undefined
   scene .profile              = undefined
   scene .components           = undefined
   scene .worldURL             = undefined
   scene .rootNodes            = nodes
   scene .protos               = undefined
   scene .externprotos         = undefined
   scene .routes               = undefined

   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("SCRIPTED")
   expect (scene .profile) .toBe (null)
   expect (scene .components .length) .toBe (0)
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes .length) .toBe (1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo")
   expect (scene .protos .length) .toBe (0)
   expect (scene .externprotos .length) .toBe (0)
   expect (scene .routes .length) .toBe (0)
})
