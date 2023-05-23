const X3D = require ("../../X3D")

test ("properties1", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      profile = Browser .getProfile ("Full"),
      scene   = Browser .createScene (profile)

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .constructor) .toBe (X3D .X3DScene)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("SCRIPTED")
   expect (scene .profile) .toBe (profile)
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

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .specificationVersion) .toBe (specificationVersion)
   expect (scene .encoding) .toBe (encoding)
   expect (scene .profile) .toBe (profile)
   expect (scene .components) .toBe (components)
   expect (scene .components) .toHaveLength (0)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .worldURL) .toBe (worldURL)
   expect (scene .rootNodes) .toBe (rootNodes)
   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo")
   expect (scene .rootNodes [0]) .toBe (scene .rootNodes [0])
   expect (scene .protos) .toBe (protos)
   expect (scene .protos) .toHaveLength (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toBe (externprotos)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toBe (routes)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)

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
      "specificationVersion",
      "encoding",
      "profile",
      "components",
      "units",
      "worldURL",
      "rootNodes",
      "protos",
      "externprotos",
      "routes",
   ]

   enumerate (properties, scene)
})

test ("updateUnit", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .createScene ()

   let angle = scene .getUnit ("angle")

   expect (angle) .toBeInstanceOf (X3D .UnitInfo)
   expect (angle .category) .toBe ("angle")
   expect (angle .name) .toBe ("radian")
   expect (angle .conversionFactor) .toBe (1)
   expect (angle .conversion_factor) .toBe (1)

   let force = scene .getUnit ("force")

   expect (force) .toBeInstanceOf (X3D .UnitInfo)
   expect (force .category) .toBe ("force")
   expect (force .name) .toBe ("newton")
   expect (force .conversionFactor) .toBe (1)
   expect (force .conversion_factor) .toBe (1)

   let length = scene .getUnit ("length")

   expect (length) .toBeInstanceOf (X3D .UnitInfo)
   expect (length .category) .toBe ("length")
   expect (length .name) .toBe ("metre")
   expect (length .conversionFactor) .toBe (1)
   expect (length .conversion_factor) .toBe (1)

   let mass = scene .getUnit ("mass")

   expect (mass) .toBeInstanceOf (X3D .UnitInfo)
   expect (mass .category) .toBe ("mass")
   expect (mass .name) .toBe ("kilogram")
   expect (mass .conversionFactor) .toBe (1)
   expect (mass .conversion_factor) .toBe (1)

   scene .updateUnit ("angle", "testAngle", 123.456)
   scene .updateUnit ("force", "testForce", 234.567)
   scene .updateUnit ("length", "testLength", 345.678)
   scene .updateUnit ("mass", "testMass", 456.789)

   angle = scene .getUnit ("angle")

   expect (angle) .toBeInstanceOf (X3D .UnitInfo)
   expect (angle .category) .toBe ("angle")
   expect (angle .name) .toBe ("testAngle")
   expect (angle .conversionFactor) .toBeCloseTo (123.456)
   expect (angle .conversion_factor) .toBeCloseTo (123.456)

   force = scene .getUnit ("force")

   expect (force) .toBeInstanceOf (X3D .UnitInfo)
   expect (force .category) .toBe ("force")
   expect (force .name) .toBe ("testForce")
   expect (force .conversionFactor) .toBeCloseTo (234.567)
   expect (force .conversion_factor) .toBeCloseTo (234.567)

   length = scene .getUnit ("length")

   expect (length) .toBeInstanceOf (X3D .UnitInfo)
   expect (length .category) .toBe ("length")
   expect (length .name) .toBe ("testLength")
   expect (length .conversionFactor) .toBeCloseTo (345.678)
   expect (length .conversion_factor) .toBeCloseTo (345.678)

   mass = scene .getUnit ("mass")

   expect (mass) .toBeInstanceOf (X3D .UnitInfo)
   expect (mass .category) .toBe ("mass")
   expect (mass .name) .toBe ("testMass")
   expect (mass .conversionFactor) .toBeCloseTo (456.789)
   expect (mass .conversion_factor) .toBeCloseTo (456.789)
})
