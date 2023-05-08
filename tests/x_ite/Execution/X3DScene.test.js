const X3D = require ("../../X3D")

test ("properties1", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      profile = Browser .getProfile ("Full"),
      scene   = Browser .createScene (profile)

   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("SCRIPTED")
   expect (scene .profile) .toBe (profile)
   expect (scene .components .length) .toBe (0)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes .length) .toBe (0)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .protos .length) .toBe (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos .length) .toBe (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes .length) .toBe (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
})

test ("properties2", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .createScene (),
      nodes   = new X3D .MFNode (scene .createNode ("WorldInfo"))

   const
      specificationVersion = scene .specificationVersion,
      encoding             = scene .encoding,
      profile              = scene .profile,
      components           = scene .components,
      worldURL             = scene .worldURL,
      rootNodes            = scene .rootNodes,
      protos               = scene .protos,
      externprotos         = scene .externprotos,
      routes               = scene .routes

   scene .specificationVersion = undefined
   scene .encoding             = undefined
   scene .profile              = undefined
   scene .components           = undefined
   scene .worldURL             = undefined
   scene .rootNodes            = nodes
   scene .protos               = undefined
   scene .externprotos         = undefined
   scene .routes               = undefined

   expect (scene .specificationVersion) .toBe (specificationVersion)
   expect (scene .encoding) .toBe (encoding)
   expect (scene .profile) .toBe (profile)
   expect (scene .components) .toBe (components)
   expect (scene .components .length) .toBe (0)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .worldURL) .toBe (worldURL)
   expect (scene .rootNodes) .toBe (rootNodes)
   expect (scene .rootNodes .length) .toBe (1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo")
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .protos) .toBe (protos)
   expect (scene .protos .length) .toBe (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toBe (externprotos)
   expect (scene .externprotos .length) .toBe (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toBe (routes)
   expect (scene .routes .length) .toBe (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
})
