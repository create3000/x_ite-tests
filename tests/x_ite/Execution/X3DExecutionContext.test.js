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

   expect (() => scene .createNode ("Foo")) .toThrow (Error)
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
   expect (() => scene .createProto ("WorldInfo")) .toThrow (Error)
})

test ("addNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group"),
      node2 = scene .createNode ("Switch")

   scene .addNamedNode ("Foo", node1)

   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   expect (() => scene .addNamedNode ("Foo", node1)) .toThrow (Error);
   expect (() => scene .addNamedNode ("Foo", node2)) .toThrow (Error);

   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")
})

test ("updateNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group"),
      node2 = scene .createNode ("Switch")

   scene .updateNamedNode ("Foo", node1)

   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   expect (() => scene .updateNamedNode ("Foo", node1)) .not .toThrow (Error);
   expect (() => scene .updateNamedNode ("Foo", node2)) .not .toThrow (Error);

   expect (scene .getNamedNode ("Foo")) .toBe (node2)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Switch")
   expect (node2 .getNodeName ()) .toBe ("Foo")
   expect (node1 .getNodeName ()) .toBe ("")
})

test ("removeNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group")

   scene .addNamedNode ("Foo", node1)

   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   scene .removeNamedNode ("Foo")

   expect (() => scene .getNamedNode ("Foo")) .toThrow (Error);
   expect (node1 .getNodeName ()) .toBe ("")

   scene .addNamedNode ("Bah", node1)

   expect (scene .getNamedNode ("Bah")) .toBe (node1)
   expect (scene .getNamedNode ("Bah") .getNodeName ()) .toBe ("Bah")
   expect (scene .getNamedNode ("Bah") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Bah")

   scene .removeNamedNode ("Bah")

   expect (() => scene .getNamedNode ("Bah")) .toThrow (Error);
   expect (node1 .getNodeName ()) .toBe ("")
})

test ("getNamedNodes", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group"),
      node2 = scene .createNode ("Switch")

   scene .addNamedNode ("Foo", node1)
   scene .addNamedNode ("Bah", node2)

   expect (scene .getNamedNodes ()) .toHaveLength (2)
   expect (scene .getNamedNodes () [0]) .toBe (node1)
   expect (scene .getNamedNodes () [1]) .toBe (node2)

   scene .removeNamedNode ("Foo")

   expect (scene .getNamedNodes ()) .toHaveLength (1)
   expect (scene .getNamedNodes () [0]) .toBe (node2)

   scene .removeNamedNode ("Bah")

   expect (scene .getNamedNodes ()) .toHaveLength (0)

   scene .addNamedNode ("Foo", node1)
   scene .addNamedNode ("Bah", node2)

   expect (scene .getNamedNodes ()) .toHaveLength (2)
   expect (scene .getNamedNodes () [0]) .toBe (node1)
   expect (scene .getNamedNodes () [1]) .toBe (node2)
})

const sleep = delay => new Promise (resolve => setTimeout (resolve, delay))

test ("addImportedNode", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
DEF S Shape {
   geometry DEF B Box { }
}
EXPORT S
EXPORT B
"
}
   `)

   await sleep ()

   const
      inlineNode = scene .getNamedNode ("I"),
      node1      = inlineNode .getValue () .getInternalScene () .getNamedNode ("S"),
      node2      = inlineNode .getValue () .getInternalScene () .getNamedNode ("B")

   scene .addImportedNode (inlineNode, "S")

   expect (scene .getImportedNode ("S")) .toBe (node1)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .addImportedNode (inlineNode, "S")) .toThrow (Error);
   expect (() => scene .addImportedNode (inlineNode, "B", "S")) .toThrow (Error);

   expect (scene .getImportedNode ("S")) .toBe (node1)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   scene .removeImportedNode ("S")

   scene .addImportedNode (inlineNode, "B", "S")

   expect (scene .getImportedNode ("S")) .toBe (node2)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("B")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Box")
   expect (node2 .getNodeName ()) .toBe ("B")

   expect (() => scene .addImportedNode (inlineNode, "S")) .toThrow (Error);
   expect (() => scene .addImportedNode (inlineNode, "B", "S")) .toThrow (Error);

   expect (scene .getImportedNode ("S")) .toBe (node2)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("B")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Box")
   expect (node2 .getNodeName ()) .toBe ("B")
})

test ("updateImportedNode", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
DEF S Shape {
   geometry DEF B Box { }
}
EXPORT S
EXPORT B
"
}
   `)

   await sleep ()

   const
      inlineNode = scene .getNamedNode ("I"),
      node1      = inlineNode .getValue () .getInternalScene () .getNamedNode ("S"),
      node2      = inlineNode .getValue () .getInternalScene () .getNamedNode ("B")

   scene .updateImportedNode (inlineNode, "S", "Foo")

   expect (scene .getImportedNode ("Foo")) .toBe (node1)
   expect (scene .getImportedNode ("Foo") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("Foo") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .updateImportedNode (inlineNode, "B", "Foo")) .not .toThrow (Error);

   expect (scene .getImportedNode ("Foo")) .toBe (node2)
   expect (scene .getImportedNode ("Foo") .getNodeName ()) .toBe ("B")
   expect (scene .getImportedNode ("Foo") .getNodeTypeName ()) .toBe ("Box")
   expect (node2 .getNodeName ()) .toBe ("B")
})

test ("removeImportedNode", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
DEF S Shape {
   geometry DEF B Box { }
}
EXPORT S
EXPORT B
"
}
   `)

   await sleep ()

   const
      inlineNode = scene .getNamedNode ("I"),
      node1      = inlineNode .getValue () .getInternalScene () .getNamedNode ("S")

   scene .updateImportedNode (inlineNode, "S", "Foo")

   expect (scene .getImportedNode ("Foo")) .toBe (node1)
   expect (scene .getImportedNode ("Foo") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("Foo") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   scene .removeImportedNode ("Foo")

   expect (() => scene .getImportedNode ("Foo")) .toThrow (Error);

   scene .updateImportedNode (inlineNode, "S", "Bah")

   expect (scene .getImportedNode ("Bah")) .toBe (node1)
   expect (scene .getImportedNode ("Bah") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("Bah") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   scene .removeImportedNode ("Bah")

   expect (() => scene .getImportedNode ("Bah")) .toThrow (Error);
})

test ("getImportedNodes", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
DEF S Shape {
   geometry DEF B Box { }
}
EXPORT S AS SE
EXPORT B AS BE
"
}
IMPORT I.SE AS S
IMPORT I.BE AS B
   `)

   await sleep ()

   const
      inlineNode = scene .getNamedNode ("I"),
      node1      = inlineNode .getValue () .getInternalScene () .getNamedNode ("S"),
      node2      = inlineNode .getValue () .getInternalScene () .getNamedNode ("B")

   expect (scene .getImportedNodes ()) .toHaveLength (2)
   expect (scene .getImportedNodes () [0] .inlineNode) .toBe (inlineNode)
   expect (scene .getImportedNodes () [0] .exportedNode) .toBe (node1)
   expect (scene .getImportedNodes () [0] .exportedName) .toBe ("SE")
   expect (scene .getImportedNodes () [0] .importedName) .toBe ("S")
   expect (scene .getImportedNodes () [1] .inlineNode) .toBe (inlineNode)
   expect (scene .getImportedNodes () [1] .exportedNode) .toBe (node2)
   expect (scene .getImportedNodes () [1] .exportedName) .toBe ("BE")
   expect (scene .getImportedNodes () [1] .importedName) .toBe ("B")

   scene .removeImportedNode ("S")

   expect (scene .getImportedNodes ()) .toHaveLength (1)
   expect (scene .getImportedNodes () [0] .inlineNode) .toBe (inlineNode)
   expect (scene .getImportedNodes () [0] .exportedNode) .toBe (node2)
   expect (scene .getImportedNodes () [0] .exportedName) .toBe ("BE")
   expect (scene .getImportedNodes () [0] .importedName) .toBe ("B")

   scene .removeImportedNode ("B")

   expect (scene .getImportedNodes ()) .toHaveLength (0)

   scene .addImportedNode (inlineNode, "SE", "Foo")
   scene .addImportedNode (inlineNode, "BE", "Bah")

   expect (scene .getImportedNodes ()) .toHaveLength (2)
   expect (scene .getImportedNodes () [0] .inlineNode) .toBe (inlineNode)
   expect (scene .getImportedNodes () [0] .exportedNode) .toBe (node1)
   expect (scene .getImportedNodes () [0] .exportedName) .toBe ("SE")
   expect (scene .getImportedNodes () [0] .importedName) .toBe ("Foo")
   expect (scene .getImportedNodes () [1] .inlineNode) .toBe (inlineNode)
   expect (scene .getImportedNodes () [1] .exportedNode) .toBe (node2)
   expect (scene .getImportedNodes () [1] .exportedName) .toBe ("BE")
   expect (scene .getImportedNodes () [1] .importedName) .toBe ("Bah")
})
