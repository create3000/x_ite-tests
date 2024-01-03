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
   expect (scene .worldURL) .toMatch (/^data:/)
   expect (scene .baseURL) .toMatch (/^file:\/\//)
   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .rootNodes [0]) .toBe (scene .rootNodes [0])
   expect (scene .protos) .toHaveLength (1)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
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
   expect (executionContext .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
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
   expect (executionContext .toString ()) .toBe (`[object ${executionContext .getTypeName ()}]`)

   const properties = [
      "specificationVersion",
      "encoding",
      "profile",
      "components",
      "units",
      "namedNodes",
      "importedNodes",
      "worldURL",
      "baseURL",
      "rootNodes",
      "protos",
      "externprotos",
      "routes",
   ]

   enumerate (properties, executionContext)
})

test ("createNode", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Full

EXTERNPROTO TimeSensor [
   inputOutput SFBool enabled
]
[ ]

EXTERNPROTO Foo [
   inputOutput SFBool enabled
]
[ ]

PROTO TimeSensor [
   inputOutput SFBool enabled FALSE
]
{ }

PROTO Foo [
   inputOutput SFBool enabled FALSE
]
{ }
`)

   for (const ConcreteNode of Browser .getConcreteNodes ())
   {
      expect (scene .createNode (ConcreteNode .typeName) .getNodeTypeName ()) .toBe (ConcreteNode .typeName)
      expect (scene .createNode (ConcreteNode .typeName) .getValue ()) .toBeInstanceOf (ConcreteNode)
   }

   expect (() => scene .createNode ("Foo")) .toThrow (Error)

   expect (scene .createNode ("TimeSensor") .getNodeTypeName ()) .toBe ("TimeSensor")
   expect (scene .createNode ("TimeSensor") .enabled) .toBe (true)
})

test ("createProto", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

EXTERNPROTO Foo [
   inputOutput SFBool test
   inputOutput MFNode children
]
[ ]

EXTERNPROTO Bah [
   inputOutput SFBool test
   inputOutput MFNode children
]
[ ]

PROTO Foo [
   inputOutput SFBool test TRUE
   inputOutput MFNode children [ ]
]
{
   Group { children IS children }
}
   `)

   expect (scene .createProto ("Foo") .getNodeTypeName ()) .toBe ("Foo")
   expect (scene .createProto ("Foo") .test) .toBe (true)
   expect (scene .createProto ("Bah") .getNodeTypeName ()) .toBe ("Bah")
   expect (scene .createProto ("Bah") .test) .toBe (false)

   expect (() => scene .createProto ("WorldInfo")) .toThrow (Error)
})

test ("addNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group"),
      node2 = scene .createNode ("Switch")

   expect (() => scene .addNamedNode ("Foo", node1)) .not .toThrow (Error)
   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   expect (() => scene .addNamedNode ("Foo", node1)) .toThrow (Error)
   expect (() => scene .addNamedNode ("Bah", node1)) .toThrow (Error)
   expect (() => scene .addNamedNode ("Foo", node2)) .toThrow (Error)

   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   expect (() => scene .addNamedNode ("", node1)) .toThrow (Error)
   expect (() => scene .addNamedNode ("", scene)) .toThrow (Error)

   const
      otherScene = await Browser .createX3DFromString (`PROFILE Full`),
      otherNode1 = otherScene .createNode ("Group")

   expect (() => scene .addNamedNode ("FooBee", otherNode1)) .toThrow (Error)
})

test ("updateNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group"),
      node2 = scene .createNode ("Switch")

   expect (() => scene .updateNamedNode ("Foo", node1)) .not .toThrow (Error)
   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   expect (() => scene .updateNamedNode ("Foo", node1)) .not .toThrow (Error)
   expect (() => scene .updateNamedNode ("Foo", node2)) .not .toThrow (Error)

   expect (scene .getNamedNode ("Foo")) .toBe (node2)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Switch")
   expect (node2 .getNodeName ()) .toBe ("Foo")
   expect (node1 .getNodeName ()) .toBe ("")

   expect (() => scene .updateNamedNode ("", node1)) .toThrow (Error)
   expect (() => scene .updateNamedNode ("", scene)) .toThrow (Error)

   const
      otherScene = await Browser .createX3DFromString (`PROFILE Full`),
      otherNode1 = otherScene .createNode ("Group")

   expect (() => scene .updateNamedNode ("FooBee", otherNode1)) .toThrow (Error)
})

test ("removeNamedNode", async () =>
{
   const
      scene = await Browser .createX3DFromString (`PROFILE Full`),
      node1 = scene .createNode ("Group")

   expect (() => scene .addNamedNode ("Foo", node1)) .not .toThrow (Error)
   expect (scene .getNamedNode ("Foo")) .toBe (node1)
   expect (scene .getNamedNode ("Foo") .getNodeName ()) .toBe ("Foo")
   expect (scene .getNamedNode ("Foo") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Foo")

   expect (() => scene .removeNamedNode ("Foo")) .not .toThrow (Error)
   expect (() => scene .getNamedNode ("Foo")) .toThrow (Error)
   expect (node1 .getNodeName ()) .toBe ("")

   expect (() => scene .addNamedNode ("Bah", node1)) .not .toThrow (Error)
   expect (scene .getNamedNode ("Bah")) .toBe (node1)
   expect (scene .getNamedNode ("Bah") .getNodeName ()) .toBe ("Bah")
   expect (scene .getNamedNode ("Bah") .getNodeTypeName ()) .toBe ("Group")
   expect (node1 .getNodeName ()) .toBe ("Bah")

   expect (() => scene .removeNamedNode ("Bah")) .not .toThrow (Error)
   expect (() => scene .getNamedNode ("Bah")) .toThrow (Error)
   expect (node1 .getNodeName ()) .toBe ("")

   expect (() => scene .removeNamedNode ("Bah")) .not .toThrow (Error)
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

test ("getUniqueName", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF S Shape {
   geometry DEF B Box { }
}
   `)

   expect (scene .getNamedNode ("S") .getNodeName ()) .toBe ("S")
   expect (scene .getNamedNode ("B") .getNodeName ()) .toBe ("B")
   expect (scene .getUniqueName ("S")) .not .toBe ("S")
   expect (scene .getUniqueName ("S")) .toMatch (/^S_\d+$/)
   expect (scene .getUniqueName ("B")) .not .toBe ("B")
   expect (scene .getUniqueName ("B")) .toMatch (/^B_\d+$/)
   expect (scene .getUniqueName ()) .toMatch (/^_\d+$/)

   expect (scene .getNamedNodes ()) .toHaveLength (2)

   for (let i = 0; i < 100; ++ i)
      scene .addNamedNode (scene .getUniqueName (), scene .createNode ("Group"))

   expect (scene .getNamedNodes ()) .toHaveLength (102)

   for (let i = 0; i < 1000; ++ i)
   {
      const r = Math .floor (Math .random () * scene .getNamedNodes () .length)

      scene .removeNamedNode (scene .getNamedNodes () [r] .getNodeName ())
      scene .addNamedNode (scene .getUniqueName (), scene .createNode ("Group"))
   }

   expect (scene .getNamedNodes ()) .toHaveLength (102)
})

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

   expect (() => scene .addImportedNode (inlineNode, "S")) .not .toThrow (Error)
   expect (scene .getImportedNode ("S")) .toBe (node1)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .addImportedNode (inlineNode, "S")) .toThrow (Error)
   expect (() => scene .addImportedNode (inlineNode, "B", "S")) .toThrow (Error)

   expect (scene .getImportedNode ("S")) .toBe (node1)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .removeImportedNode ("S")) .not .toThrow (Error)
   expect (() => scene .addImportedNode (inlineNode, "B", "S")) .not .toThrow (Error)
   expect (scene .getImportedNode ("S")) .toBe (node2)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("B")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Box")
   expect (node2 .getNodeName ()) .toBe ("B")

   expect (() => scene .addImportedNode (inlineNode, "S")) .toThrow (Error)
   expect (() => scene .addImportedNode (inlineNode, "B", "S")) .toThrow (Error)

   expect (scene .getImportedNode ("S")) .toBe (node2)
   expect (scene .getImportedNode ("S") .getNodeName ()) .toBe ("B")
   expect (scene .getImportedNode ("S") .getNodeTypeName ()) .toBe ("Box")
   expect (node2 .getNodeName ()) .toBe ("B")

   expect (() => scene .addImportedNode (inlineNode, "")) .toThrow (Error)
   expect (() => scene .addImportedNode (scene, "S")) .toThrow (Error)

   const otherScene = await Browser .createX3DFromString (`
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

   const otherInlineNode = otherScene .getNamedNode ("I")

   expect (() => scene .addImportedNode (otherInlineNode, "S", "FooBee")) .toThrow (Error)
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

   expect (() => scene .updateImportedNode (inlineNode, "S", "Foo")) .not .toThrow (Error)
   expect (scene .getImportedNode ("Foo")) .toBe (node1)
   expect (scene .getImportedNode ("Foo") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("Foo") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .updateImportedNode (inlineNode, "B", "Foo")) .not .toThrow (Error)

   expect (scene .getImportedNode ("Foo")) .toBe (node2)
   expect (scene .getImportedNode ("Foo") .getNodeName ()) .toBe ("B")
   expect (scene .getImportedNode ("Foo") .getNodeTypeName ()) .toBe ("Box")
   expect (node2 .getNodeName ()) .toBe ("B")

   expect (() => scene .updateImportedNode (inlineNode, "", "Foo")) .toThrow (Error)
   expect (() => scene .updateImportedNode (scene, "S", "Foo")) .toThrow (Error)

   const otherScene = await Browser .createX3DFromString (`
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

   const otherInlineNode = otherScene .getNamedNode ("I")

   expect (() => scene .updateImportedNode (otherInlineNode, "S", "FooBee")) .toThrow (Error)
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

   expect (() => scene .updateImportedNode (inlineNode, "S", "Foo")) .not .toThrow (Error)
   expect (scene .getImportedNode ("Foo")) .toBe (node1)
   expect (scene .getImportedNode ("Foo") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("Foo") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .removeImportedNode ("Foo")) .not .toThrow (Error)
   expect (() => scene .getImportedNode ("Foo")) .toThrow (Error)

   expect (() => scene .updateImportedNode (inlineNode, "S", "Bah")) .not .toThrow (Error)
   expect (scene .getImportedNode ("Bah")) .toBe (node1)
   expect (scene .getImportedNode ("Bah") .getNodeName ()) .toBe ("S")
   expect (scene .getImportedNode ("Bah") .getNodeTypeName ()) .toBe ("Shape")
   expect (node1 .getNodeName ()) .toBe ("S")

   expect (() => scene .removeImportedNode ("Bah")) .not .toThrow (Error)
   expect (() => scene .getImportedNode ("Bah")) .toThrow (Error)
   expect (() => scene .removeImportedNode ("Bah")) .not .toThrow (Error)
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

   expect (() => scene .removeImportedNode ("S")) .not .toThrow (Error)
   expect (scene .getImportedNodes ()) .toHaveLength (1)
   expect (scene .getImportedNodes () [0] .inlineNode) .toBe (inlineNode)
   expect (scene .getImportedNodes () [0] .exportedNode) .toBe (node2)
   expect (scene .getImportedNodes () [0] .exportedName) .toBe ("BE")
   expect (scene .getImportedNodes () [0] .importedName) .toBe ("B")

   expect (() => scene .removeImportedNode ("B")) .not .toThrow (Error)
   expect (scene .getImportedNodes ()) .toHaveLength (0)

   expect (() => scene .addImportedNode (inlineNode, "SE", "Foo")) .not .toThrow (Error)
   expect (() => scene .addImportedNode (inlineNode, "BE", "Bah")) .not .toThrow (Error)

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

test ("get/setRootNodes", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

PROTO Foo [ ]
{
   DEF S Shape {
      geometry DEF B Box { }
   }
   USE B
}

Foo { }
   `)

   const executionContext = scene .getRootNodes () [0] .getValue () .getBody ()

   expect (executionContext .getRootNodes ()) .toHaveLength (2)
   expect (executionContext .getRootNodes () [0]) .toBeInstanceOf (X3D .SFNode)
   expect (executionContext .getRootNodes () [0] .getValue ()) .toBeInstanceOf (Browser .getConcreteNode ("Shape"))
   expect (executionContext .getRootNodes () [0] .getNodeName ()) .toBe ("S")
   expect (executionContext .getRootNodes () [1]) .toBeInstanceOf (X3D .SFNode)
   expect (executionContext .getRootNodes () [1] .getValue ()) .toBeInstanceOf (Browser .getConcreteNode ("Box"))
   expect (executionContext .getRootNodes () [1] .getNodeName ()) .toBe ("B")

   executionContext .setRootNodes (new X3D .MFNode ())

   expect (executionContext .getRootNodes ()) .toHaveLength (2)
   expect (executionContext .getRootNodes () [0]) .toBeInstanceOf (X3D .SFNode)
   expect (executionContext .getRootNodes () [0] .getValue ()) .toBeInstanceOf (Browser .getConcreteNode ("Shape"))
   expect (executionContext .getRootNodes () [0] .getNodeName ()) .toBe ("S")
   expect (executionContext .getRootNodes () [1]) .toBeInstanceOf (X3D .SFNode)
   expect (executionContext .getRootNodes () [1] .getValue ()) .toBeInstanceOf (Browser .getConcreteNode ("Box"))
   expect (executionContext .getRootNodes () [1] .getNodeName ()) .toBe ("B")
})

test ("getLocalNode", async () =>
{
   const scene = await Browser .createX3DFromString (`
DEF I Inline {
   url "data:model/x3d+vrml,
DEF T TextureTransform { }
EXPORT T
   "
}
DEF T Transform { }
IMPORT I.T
IMPORT I.T AS TT
   `);

   expect (scene .getLocalNode ("T")) .toBeInstanceOf (X3D .SFNode);
   expect (scene .getLocalNode ("T") .getNodeTypeName ()) .toBe ("Transform");

   expect (scene .getLocalNode ("TT")) .toBeInstanceOf (X3D .X3DImportedNode);
   expect (scene .getLocalNode ("TT") .inlineNode) .toBe (scene .getNamedNode ("I"));
   expect (scene .getLocalNode ("TT") .exportedName) .toBe ("T");
   expect (scene .getLocalNode ("TT") .importedName) .toBe ("TT");
});

test ("ProtoDeclarationHandling", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

PROTO Foo [ ]
{
   DEF S Shape {
      geometry DEF B Box { }
   }
   USE B
}

Foo { }
   `)

   expect (scene .protos) .toHaveLength (1)
   expect (scene .getProtoDeclarations ()) .toHaveLength (1)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .getProtoDeclarations ()) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .getProtoDeclaration ("Foo")) .toBeInstanceOf (X3D .X3DProtoDeclaration)
   expect (() => scene .getProtoDeclaration ("Bah")) .toThrow (Error)

   const proto = scene .getProtoDeclaration ("Foo")

   expect (() => scene .removeProtoDeclaration ("Foo")) .not .toThrow (Error)
   expect (scene .protos) .toHaveLength (0)
   expect (scene .getProtoDeclarations ()) .toHaveLength (0)
   expect (() => scene .getProtoDeclaration ("Foo")) .toThrow (Error)
   expect (() => scene .removeProtoDeclaration ("Foo")) .not .toThrow (Error)

   expect (() => scene .addProtoDeclaration ("Bah", proto)) .not .toThrow (Error)
   expect (() => scene .addProtoDeclaration ("Bah", proto)) .toThrow (Error)
   expect (() => scene .addProtoDeclaration ("Foo", proto)) .toThrow (Error)
   expect (scene .protos) .toHaveLength (1)
   expect (scene .getProtoDeclarations ()) .toHaveLength (1)
   expect (scene .getProtoDeclaration ("Bah")) .toBe (proto)
   expect (proto .name) .toBe ("Bah")
   expect (() => scene .addProtoDeclaration ("", proto)) .toThrow (Error)
   expect (() => scene .addProtoDeclaration ("FooBah", scene)) .toThrow (Error)

   expect (() => scene .updateProtoDeclaration ("Foo", proto)) .not .toThrow (Error)
   expect (() => scene .getProtoDeclaration ("Bah")) .toThrow (Error)
   expect (scene .protos) .toHaveLength (1)
   expect (scene .getProtoDeclarations ()) .toHaveLength (1)
   expect (scene .getProtoDeclaration ("Foo")) .toBe (proto)
   expect (proto .name) .toBe ("Foo")
   expect (() => scene .updateProtoDeclaration ("", proto)) .toThrow (Error)
   expect (() => scene .updateProtoDeclaration ("FooBah", scene)) .toThrow (Error)

   expect (() => scene .updateProtoDeclaration ("Bah", proto)) .not .toThrow (Error)
   expect (() => scene .getProtoDeclaration ("Foo")) .toThrow (Error)
   expect (scene .protos) .toHaveLength (1)
   expect (scene .getProtoDeclarations ()) .toHaveLength (1)
   expect (scene .getProtoDeclaration ("Bah")) .toBe (proto)
   expect (proto .name) .toBe ("Bah")

   const otherScene = await Browser .createX3DFromString (`
PROFILE Interchange

PROTO Foo [ ]
{
   DEF S Shape {
      geometry DEF B Box { }
   }
   USE B
}

Foo { }
   `)

   const otherProto = otherScene .getProtoDeclaration ("Foo")

   expect (() => scene .addProtoDeclaration ("FooBee", otherProto)) .toThrow (Error)
   expect (() => scene .updateProtoDeclaration ("FooBee", otherProto)) .toThrow (Error)
})

test ("ExternProtoDeclarationHandling", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

EXTERNPROTO Foo [ ]
[ ]

Foo { }
   `)

   expect (scene .externprotos) .toHaveLength (1)
   expect (scene .getExternProtoDeclarations ()) .toHaveLength (1)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .getExternProtoDeclarations ()) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .getExternProtoDeclaration ("Foo")) .toBeInstanceOf (X3D .X3DExternProtoDeclaration)
   expect (() => scene .getExternProtoDeclaration ("Bah")) .toThrow (Error)

   const externproto = scene .getExternProtoDeclaration ("Foo")

   expect (() => scene .removeExternProtoDeclaration ("Foo")) .not .toThrow (Error)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .getExternProtoDeclarations ()) .toHaveLength (0)
   expect (() => scene .getExternProtoDeclaration ("Foo")) .toThrow (Error)
   expect (() => scene .removeExternProtoDeclaration ("Foo")) .not .toThrow (Error)

   expect (() => scene .addExternProtoDeclaration ("Bah", externproto)) .not .toThrow (Error)
   expect (() => scene .addExternProtoDeclaration ("Bah", externproto)) .toThrow (Error)
   expect (() => scene .addExternProtoDeclaration ("Foo", externproto)) .toThrow (Error)
   expect (scene .externprotos) .toHaveLength (1)
   expect (scene .getExternProtoDeclarations ()) .toHaveLength (1)
   expect (scene .getExternProtoDeclaration ("Bah")) .toBe (externproto)
   expect (externproto .name) .toBe ("Bah")
   expect (() => scene .addExternProtoDeclaration ("", externproto)) .toThrow (Error)
   expect (() => scene .addExternProtoDeclaration ("FooBah", scene)) .toThrow (Error)

   expect (() => scene .updateExternProtoDeclaration ("Foo", externproto)) .not .toThrow (Error)
   expect (() => scene .getExternProtoDeclaration ("Bah")) .toThrow (Error)
   expect (scene .externprotos) .toHaveLength (1)
   expect (scene .getExternProtoDeclarations ()) .toHaveLength (1)
   expect (scene .getExternProtoDeclaration ("Foo")) .toBe (externproto)
   expect (externproto .name) .toBe ("Foo")
   expect (() => scene .updateExternProtoDeclaration ("", externproto)) .toThrow (Error)
   expect (() => scene .updateExternProtoDeclaration ("FooBah", scene)) .toThrow (Error)

   expect (() => scene .updateExternProtoDeclaration ("Bah", externproto)) .not .toThrow (Error)
   expect (() => scene .getExternProtoDeclaration ("Foo")) .toThrow (Error)
   expect (scene .externprotos) .toHaveLength (1)
   expect (scene .getExternProtoDeclarations ()) .toHaveLength (1)
   expect (scene .getExternProtoDeclaration ("Bah")) .toBe (externproto)
   expect (externproto .name) .toBe ("Bah")

   const otherScene = await Browser .createX3DFromString (`
PROFILE Interchange

EXTERNPROTO Foo [ ]
[ ]

Foo { }
   `)

   const otherProto = otherScene .getExternProtoDeclaration ("Foo")

   expect (() => scene .addExternProtoDeclaration ("FooBee", otherProto)) .toThrow (Error)
   expect (() => scene .updateExternProtoDeclaration ("FooBee", otherProto)) .toThrow (Error)
})

test ("RouteHandling", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF T1 Transform { }
DEF T2 Transform { }
DEF T3 Transform { }
DEF T4 Transform { }
   `);

   expect (scene .routes) .toHaveLength (0);

   const
      t1 = scene .getNamedNode ("T1"),
      t2 = scene .getNamedNode ("T2"),
      t3 = scene .getNamedNode ("T3");

   scene .addRoute (t1, "translation", t2, "translation");

   expect (scene .routes) .toHaveLength (1);
   expect (scene .routes [0] .sourceNode) .toBe (t1);
   expect (scene .routes [0] .sourceField) .toBe ("translation_changed");
   expect (scene .routes [0] .destinationNode) .toBe (t2);
   expect (scene .routes [0] .destinationField) .toBe ("set_translation");

   const route_t2t3_1 = scene .addRoute (t2, "translation_changed", t3, "set_translation");
;
   expect (scene .routes) .toHaveLength (2);
   expect (scene .routes [1] .sourceNode) .toBe (t2);
   expect (scene .routes [1] .sourceField) .toBe ("translation_changed");
   expect (scene .routes [1] .destinationNode) .toBe (t3);
   expect (scene .routes [1] .destinationField) .toBe ("set_translation");

   const route_t2t3_2 = scene .addRoute (t2, "translation", t3, "translation");

   expect (scene .routes) .toHaveLength (2);
   expect (route_t2t3_1) .toBe (route_t2t3_2);

   const route_t2t3_3 = scene .addRoute (t2, "set_translation", t3, "translation");

   expect (scene .routes) .toHaveLength (2);
   expect (route_t2t3_1) .toBe (route_t2t3_3);

   const route_t2t3_4 = scene .addRoute (t2, "translation", t3, "translation_changed");

   expect (scene .routes) .toHaveLength (2);
   expect (route_t2t3_1) .toBe (route_t2t3_4);

   const route_t2t3_5 = scene .addRoute (t2, "translation_changed", t3, "set_translation");

   expect (scene .routes) .toHaveLength (2);
   expect (route_t2t3_1) .toBe (route_t2t3_5);

   scene .deleteRoute (scene .routes [0]);

   expect (scene .routes) .toHaveLength (1);
   expect (scene .routes [0] .sourceNode) .toBe (t2);
   expect (scene .routes [0] .sourceField) .toBe ("translation_changed");
   expect (scene .routes [0] .destinationNode) .toBe (t3);
   expect (scene .routes [0] .destinationField) .toBe ("set_translation");

   const { sourceNode, sourceField, destinationNode, destinationField } = scene .routes [0];

   scene .deleteRoute (sourceNode, sourceField, destinationNode, destinationField);

   expect (scene .routes) .toHaveLength (0);
   expect (() => scene .deleteRoute (sourceNode, sourceField, destinationNode, destinationField)) .not .toThrow (Error);
   expect (scene .routes) .toHaveLength (0);

   expect (() => scene .addRoute (t1, "translation", t2, "fooBah")) .toThrow (Error);
   expect (scene .routes) .toHaveLength (0);
   expect (() => scene .addRoute (t1, "fooBah", t2, "translation")) .toThrow (Error);
   expect (scene .routes) .toHaveLength (0);
   expect (() => scene .addRoute (t1, "fooBah", t2, "bahFoo")) .toThrow (Error);
   expect (scene .routes) .toHaveLength (0);
});
