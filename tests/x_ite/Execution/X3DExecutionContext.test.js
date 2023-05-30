const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", async () =>
{
   const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive
COMPONENT Grouping:1
COMPONENT Shape:1

PROTO Test [ ]
{
   Transform {
      children Shape {
         geometry Box { }
      }
   }
}

Test { }
`))

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .constructor) .toBe (X3D .X3DScene)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .encoding) .toBe ("VRML")
   expect (scene .profile .name) .toBe ("Interactive")
   expect (scene .components) .toHaveLength (2)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .components [0] .name) .toBe ("Grouping")
   expect (scene .components [1] .name) .toBe ("Shape")
   expect (scene .units) .toHaveLength (4)
   expect (scene .units) .toBeInstanceOf (X3D .UnitInfoArray)
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .rootNodes [0]) .toBe (scene .rootNodes [0])
   expect (scene .protos) .toHaveLength (1)
   expect (scene .protos [0]) .toBeInstanceOf (X3D .X3DProtoDeclaration)
   expect (scene .protos [0] .name) .toBe ("Test")
   expect (scene .protos [0] .isExternProto) .toBe (false)
   expect (scene .protos [0]) .toBe (scene .protos [0])
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)

   const executionContext = scene .rootNodes [0] .getValue () .getBody ()

   expect (executionContext) .not .toBeInstanceOf (X3D .X3DScene)
   expect (executionContext) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (executionContext .constructor) .toBe (X3D .X3DExecutionContext)
   expect (executionContext .specificationVersion) .toBe (scene .specificationVersion)
   expect (executionContext .encoding) .toBe (scene .encoding)
   expect (executionContext .profile) .toBe (scene .profile)
   expect (executionContext .profile .name) .toBe ("Interactive")
   expect (executionContext .components) .toBe (scene .components)
   expect (executionContext .components) .toHaveLength (2)
   expect (executionContext .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (executionContext .components [0] .name) .toBe ("Grouping")
   expect (executionContext .components [1] .name) .toBe ("Shape")
   expect (executionContext .units) .toHaveLength (4)
   expect (executionContext .units) .toBeInstanceOf (X3D .UnitInfoArray)
   expect (executionContext .worldURL) .toBe (scene .worldURL)
   expect (executionContext .rootNodes) .toHaveLength (1)
   expect (executionContext .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (executionContext .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (executionContext .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (executionContext .rootNodes [0]) .toBe (executionContext .rootNodes [0])
   expect (executionContext .protos) .toHaveLength (0)
   expect (executionContext .externprotos) .toHaveLength (0)
   expect (executionContext .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (executionContext .routes) .toHaveLength (0)
   expect (executionContext .routes) .toBeInstanceOf (X3D .RouteArray)

   const rootNodes = executionContext .rootNodes

   executionContext .rootNodes = new X3D .MFNode ()

   expect (executionContext .rootNodes) .toBe (rootNodes)
   expect (executionContext .rootNodes) .toHaveLength (1)
   expect (executionContext .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (executionContext .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (executionContext .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (executionContext .rootNodes [0]) .toBe (executionContext .rootNodes [0])

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

   enumerate (properties, executionContext)
})

test ("createNode", async () =>
{
   const scene = await Browser .createX3DFromString (`PROFILE Full`)

   for (const Type of Browser .getSupportedNodes ())
      expect (scene .createNode (Type .prototype .getTypeName ()) .getNodeTypeName ()) .toBe (Type .prototype .getTypeName ())
})

test ("createProto", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

PROTO Foo [
   inputOutput MFNode children [ ]
]
{
   Group { children IS children }
}
   `)

   expect (scene .createProto ("Foo") .getNodeTypeName ()) .toBe ("Foo")
})

test ("addNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node  = scene .createNode ("Group")

   scene .addNamedNode ("Foo", node)

   expect (scene .getNamedNode ("Foo")) .toBe (node)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")

   try
   {
      scene .addNamedNode ("Foo", node)
      throw false;
   }
   catch (e)
   {
      if (e === false)
         throw new Error ("addNamedNode throw Error test failed!")
   }
})
