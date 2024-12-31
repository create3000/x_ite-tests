const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("statements.x3d", async () =>
{
   const
      latestVersion = (await Browser .createScene ()) .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `statements.x3d`))))

   const orig = await fetch (path .join (__dirname, "files", "X3D", `statements.x3d`)) .then (r => r .text ())

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style }),
         x3dv = scene .toVRMLString ({ style }),
         x3dj = scene .toJSONString ({ style }),
         html = scene .toXMLString ({ style, closingTags: true });

      const encodings = ["XML", "XML", "VRML", "JSON", "XML"]

      Browser .baseURL = scene .worldURL

      for (const [i, file] of [orig, x3d, x3dv, x3dj, html] .entries ())
      {
         const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

         expect (scene .encoding) .toBe (encodings [i])

         if (i)
            expect (scene .specificationVersion) .toBe (latestVersion)

         expect (scene .getNamedNode ("Transform") .rotation .angle) .toBeCloseTo (Math .PI / 4)
         expect (scene .getNamedNode ("Box") .size .x) .toBeCloseTo (4)
         expect (scene .getNamedNode ("Box") .size .y) .toBeCloseTo (4)
         expect (scene .getNamedNode ("Box") .size .z) .toBeCloseTo (4)
         expect (scene .getNamedNode ("Emitter") .mass) .toBeCloseTo (2)
         expect (scene .getNamedNode ("Force") .force .y) .toBeCloseTo (-10)

         const externprotoInProto = scene .protos [0] .getBody () .rootNodes [1];

         expect (externprotoInProto .getValue () .getProtoNode () .isExternProto) .toBe (true);
         expect (externprotoInProto .getValue () .getProtoNode () .checkLoadState ()) .toBe (X3D .X3DConstants .COMPLETE_STATE);
         expect (externprotoInProto .getNodeTypeName ()) .toBe ("Foo");
         expect ([... externprotoInProto .translation]) .toEqual ([0, 3, 0]);

         expect (scene .toXMLString ()) .toBe (orig)
         expect (scene .toXMLString  ({ style })) .toBe (x3d)
         expect (scene .toVRMLString ({ style })) .toBe (x3dv)
         expect (scene .toJSONString ({ style })) .toBe (x3dj)
      }
   }
});

test ("fields.x3d", async () =>
{
   const
      latestVersion = (await Browser .createScene ()) .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `fields.x3d`))))

   const orig = await fetch (path .join (__dirname, "files", "X3D", `fields.x3d`)) .then (r => r .text ())

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style }),
         x3dv = scene .toVRMLString ({ style }),
         x3dj = scene .toJSONString ({ style }),
         html = scene .toXMLString ({ style, closingTags: true });

      const encodings = ["XML", "XML", "VRML", "JSON", "XML"]

      Browser .baseURL = scene .worldURL

      for (const [i, file] of [orig, x3d, x3dv, x3dj, html] .entries ())
      {
         const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

         expect (scene .encoding) .toBe (encodings [i])

         if (i)
            expect (scene .specificationVersion) .toBe (latestVersion)

         expect (scene .toXMLString ()) .toBe (orig)
         expect (scene .toXMLString  ({ style })) .toBe (x3d)
         expect (scene .toVRMLString ({ style })) .toBe (x3dv)
         expect (scene .toJSONString ({ style })) .toBe (x3dj)
      }
   }
})

test ("nodes", async () =>
{
   await Browser .loadComponents (Browser .getProfile ("Full"))

   const string = `PROFILE Full

   ${[...Browser .getConcreteNodes ()] .map (ConcreteNode => ConcreteNode .typeName + "{ }") .join ("\n")}
   `

   const
      scene1 = await Browser .createX3DFromString (string),
      scene2 = await Browser .createX3DFromString (scene1 .toXMLString ()),
      scene3 = await Browser .createX3DFromString (scene1 .toJSONString ()),
      scene4 = await Browser .createX3DFromString (scene1 .toXMLString ({ closingTags: true }))

   expect (scene1 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene2 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene3 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene4 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)

   for (const [i, node] of scene1 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene2 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene3 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene4 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)
});

test ("initializableReference.x3dv", async () =>
{
   const
      orig  = await fetch (path .join (__dirname, "files", "X3D", `initializableReference.x3dv`)) .then (r => r .text ()) .then (t => t .replace (/V\d+\.\d+\.\d+/, "V" + Browser .version)),
      scene = await Browser .createX3DFromString (orig),
      x3d   = await Browser .createX3DFromString (scene .toXMLString ()),
      x3dj  = await Browser .createX3DFromString (scene .toJSONString ()),
      x3dv  = await Browser .createX3DFromString (scene .toVRMLString ()),
      html  = await Browser .createX3DFromString (scene .toXMLString ({ closingTags: true }));

   expect (x3d  .toVRMLString ()) .toBe (orig);
   expect (x3dj .toVRMLString ()) .toBe (orig);
   expect (x3dv .toVRMLString ()) .toBe (orig);
   expect (html .toVRMLString ()) .toBe (orig);
})

test ("doubleFields.x3d", async () =>
{
   const
      orig  = await fetch (path .join (__dirname, "files", "X3D", `doubleFields.x3d`)) .then (r => r .text ()),
      scene = await Browser .createX3DFromString (orig),
      x3d   = await Browser .createX3DFromString (scene .toXMLString ()),
      x3dj  = await Browser .createX3DFromString (scene .toJSONString ()),
      x3dv  = await Browser .createX3DFromString (scene .toVRMLString ()),
      html  = await Browser .createX3DFromString (scene .toXMLString ({ closingTags: true }));

   expect (x3d  .toXMLString ()) .toBe (orig);
   expect (x3dj .toXMLString ()) .toBe (orig);
   expect (x3dv .toXMLString ()) .toBe (orig);
   expect (html .toXMLString ()) .toBe (orig);
})

test ("base64-with-bom", async () =>
{
   const
      data  = await fetch (path .join (__dirname, "files", "X3D", `base64-with-bom.url`)) .then (r => r .text ()),
      scene = await Browser .createX3DFromURL (new X3D .MFString (data))

   expect (scene .rootNodes) .toHaveLength (27)
})

test ("bom.txt", async () =>
{
   const
      text  = await fetch (path .join (__dirname, "files", "X3D", `bom.txt`)) .then (r => r .text ()),
      scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,${atob (text)}`))

   expect (scene .rootNodes) .toHaveLength (27)
})

test ("unknowns.x3dv", async () =>
{
   const scene = await Browser .createX3DFromURL (new X3D .MFString (path .join (__dirname, "files", "X3D", `unknowns.x3dv`)));

   expect (scene .rootNodes) .toHaveLength (2);
})

test ("proto-import-routes.x3dv", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (path .join (__dirname, "files", "X3D", `proto-import-routes.x3d`)));

   const
      scene2 = await Browser .createX3DFromString (scene1 .toXMLString ()),
      scene3 = await Browser .createX3DFromString (scene1 .toVRMLString ()),
      scene4 = await Browser .createX3DFromString (scene1 .toJSONString ()),
      scene5 = await Browser .createX3DFromString (scene1 .toXMLString ({ closingTags: true }));

   for (const scene of [scene1, scene2, scene3, scene4, scene5])
   {
      expect (scene .protos) .toHaveLength (1);
      expect (scene .rootNodes) .toHaveLength (1);

      const node = scene .rootNodes [0];

      expect (node .getNodeTypeName ()) .toBe ("Test");

      const body = node .getValue () .getBody ();

      expect (body) .toBeInstanceOf (X3D .X3DExecutionContext);
      expect (body .rootNodes) .toHaveLength (3);
      expect (body .routes) .toHaveLength (2)

      expect (body .routes [0] .sourceNode) .toBeInstanceOf (X3D .SFNode)
      expect (typeof body .routes [0] .sourceField) .toBe ("string")
      expect (body .routes [0] .destinationNode) .toBeInstanceOf (X3D .SFNode)
      expect (typeof body .routes [0] .destinationField) .toBe ("string")

      expect (body .routes [0] .getSourceNode ()) .toBeInstanceOf (X3D .X3DNode)
      expect (typeof body .routes [0] .getSourceField ()) .toBe ("string")
      expect (body .routes [0] .getDestinationNode ()) .toBeInstanceOf (X3D .X3DNode)
      expect (typeof body .routes [0] .getDestinationField ()) .toBe ("string")

      expect (body .routes [0] .getSourceNode ()) .toBe (body .routes [0] .sourceNode .getValue ())
      expect (body .routes [0] .getSourceField ()) .toBe (body .routes [0] .sourceField)
      expect (body .routes [0] .getDestinationNode ()) .toBe (body .routes [0] .destinationNode .getValue ())
      expect (body .routes [0] .getDestinationField ()) .toBe (body .routes [0] .destinationField)

      expect (body .routes [0] .sourceNode .getNodeTypeName ()) .toBe ("TimeSensor")
      expect (body .routes [0] .sourceField) .toBe ("fraction_changed")
      expect (body .routes [0] .destinationNode .getNodeTypeName ()) .toBe ("OrientationInterpolator")
      expect (body .routes [0] .destinationField) .toBe ("set_fraction")

      expect (body .routes [1] .sourceNode) .toBeInstanceOf (X3D .SFNode)
      expect (typeof body .routes [1] .sourceField) .toBe ("string")
      expect (body .routes [1] .destinationNode) .toBeInstanceOf (X3D .X3DImportedNode)
      expect (typeof body .routes [1] .destinationField) .toBe ("string")

      expect (body .routes [1] .getSourceNode ()) .toBeInstanceOf (X3D .X3DNode)
      expect (typeof body .routes [1] .getSourceField ()) .toBe ("string")
      expect (body .routes [1] .getDestinationNode ()) .toBeInstanceOf (X3D .X3DImportedNode)
      expect (typeof body .routes [1] .getDestinationField ()) .toBe ("string")

      expect (body .routes [1] .getSourceNode ()) .toBe (body .routes [1] .sourceNode .getValue ())
      expect (body .routes [1] .getSourceField ()) .toBe (body .routes [1] .sourceField)
      expect (body .routes [1] .getDestinationNode ()) .toBe (body .routes [1] .destinationNode)
      expect (body .routes [1] .getDestinationField ()) .toBe (body .routes [1] .destinationField)

      expect (body .routes [1] .sourceNode .getNodeTypeName ()) .toBe ("OrientationInterpolator")
      expect (body .routes [1] .sourceField) .toBe ("value_changed")
      expect (body .routes [1] .destinationNode .inlineNode) .toBeInstanceOf (X3D .SFNode)
      expect (body .routes [1] .destinationNode .inlineNode .getNodeTypeName ()) .toBe ("Inline")
      expect (body .routes [1] .destinationNode .exportedName) .toBe ("Box")
      expect (body .routes [1] .destinationNode .importedName) .toBe ("ImportedBox")
      expect (body .routes [1] .destinationNode .getInlineNode ()) .toBe (body .routes [1] .destinationNode .inlineNode .getValue ())
      expect (body .routes [1] .destinationNode .getExportedName ()) .toBe (body .routes [1] .destinationNode .exportedName)
      expect (body .routes [1] .destinationNode .getImportedName ()) .toBe (body .routes [1] .destinationNode .importedName)
      expect (body .routes [1] .destinationField) .toBe ("set_rotation")
   }
});

test ("double-import.x3dv", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (path .join (__dirname, "files", "X3D", `double-import.x3dv`)));

   const
      scene2 = await Browser .createX3DFromString (scene1 .toXMLString ()),
      scene3 = await Browser .createX3DFromString (scene1 .toVRMLString ()),
      scene4 = await Browser .createX3DFromString (scene1 .toJSONString ()),
      scene5 = await Browser .createX3DFromString (scene1 .toXMLString ({ closingTags: true }));

   for (const scene of [scene1, scene2, scene3, scene4, scene5])
   {
      expect (scene .rootNodes) .toHaveLength (5);
      expect (scene .namedNodes) .toHaveLength (5);
      expect (scene .importedNodes) .toHaveLength (2);
      expect (scene .routes) .toHaveLength (4);

      expect (scene .importedNodes [0]) .toBe (scene .getImportedNodes () .get (scene .importedNodes [0] .importedName));
      expect (scene .importedNodes [1]) .toBe (scene .getImportedNodes () .get (scene .importedNodes [1] .importedName));

      expect (scene .importedNodes [0] .importedName) .toMatch (/^Box_\d+$/);
      expect (scene .importedNodes [1] .importedName) .toMatch (/^Box_\d+$/);

      expect (scene .getNamedNode ("Box") .getNodeName ()) .toBe ("Box");
      expect (scene .getNamedNode ("Box") .getNodeTypeName ()) .toBe ("Transform");

      expect (scene .routes [0] .sourceNode) .toBe (scene .importedNodes [0]);
      expect (scene .routes [1] .sourceNode) .toBe (scene .importedNodes [1]);
      expect (scene .routes [2] .sourceNode) .toBeInstanceOf (X3D .SFNode);
      expect (scene .routes [2] .sourceNode .getNodeName ()) .toMatch (/^Box_\d+$/);
      expect (scene .routes [3] .sourceNode) .toBe (scene .getNamedNode ("Box"));

      expect (scene .routes [0] .destinationNode) .toBe (scene .getNamedNode ("T"));
      expect (scene .routes [1] .destinationNode) .toBe (scene .getNamedNode ("T"));
      expect (scene .routes [2] .destinationNode) .toBe (scene .getNamedNode ("T"));
      expect (scene .routes [3] .destinationNode) .toBe (scene .getNamedNode ("T"));
   }
});

test ("proto-with-filled-node-fields.x3d", async () =>
{
   const
      latestVersion = (await Browser .createScene ()) .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `proto-with-filled-node-fields.x3d`))));

   const orig = await fetch (path .join (__dirname, "files", "X3D", `proto-with-filled-node-fields.x3d`)) .then (r => r .text ());

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style }),
         x3dv = scene .toVRMLString ({ style }),
         x3dj = scene .toJSONString ({ style }),
         html = scene .toXMLString ({ style, closingTags: true });

      const encodings = ["XML", "XML", "VRML", "JSON", "XML"];

      Browser .baseURL = scene .worldURL;

      for (const [i, file] of [orig, x3d, x3dv, x3dj, html] .entries ())
      {
         const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`));

         expect (scene .encoding) .toBe (encodings [i]);

         if (i)
            expect (scene .specificationVersion) .toBe (latestVersion);

         expect (scene .getNamedNode ("Default") .child) .not .toBe (null);
         expect (scene .getNamedNode ("Default") .children) .not .toHaveLength (0);
         expect (scene .getNamedNode ("NULL") .child) .toBe (null);
         expect (scene .getNamedNode ("NULL") .children) .toHaveLength (0);

         expect (scene .toXMLString ()) .toBe (orig);
         expect (scene .toXMLString  ({ style })) .toBe (x3d);
         expect (scene .toVRMLString ({ style })) .toBe (x3dv);
         expect (scene .toJSONString ({ style })) .toBe (x3dj);
      }
   }
});

test ("comments", async () =>
{
   const scene = await Browser .createX3DFromString (`#X3D V4.0 utf8
# comment 1

# comment
PROFILE
# comment
Interchange
# comment

COMPONENT
# comment
Core
# comment
:
# comment
1

# comment
UNIT
# comment
angle
# comment
degree
# comment
0.017453292519943295

# comment
META
# comment
"key"
# comment
"value"

# comment
EXTERNPROTO
# comment
TestEx
# comment
[
# comment
]
# comment
[
# comment
]

# comment
PROTO
# comment
Test
# comment
[
# comment
]
# comment
{
# comment
}

# comment
Switch {
# comment
whichChoice
# comment
1
# comment
}

# comment
Transform
# comment 2
{
# comment 3
translation
# comment 4
1
# comment 5
2
# comment 6
3
# comment 7
}

# comment 8
DEF
# comment 8
Name
# comment 8
Transform { }

# comment
Coordinate
# comment
{
# comment
point
# comment
[
# comment
]
# comment
}

# comment
Coordinate
# comment
{
# comment
point
# comment
0
# comment
0
# comment
0
# comment
}

# comment
Coordinate
{
# comment
point
# comment
[
# comment
0
# comment
0
# comment
0
# comment
,
# comment
1
# comment
1
# comment
1
# comment
]
# comment
}

# comment
DEF
# comment
I
# comment
Inline
# comment
{
# comment
load
# comment
FALSE
# comment
}

# comment
IMPORT
# comment
I
# comment
.
# comment
ExportName
# comment
AS
# comment
ImportName

# comment
EXPORT
# comment
Name
# comment
AS
# comment
ExportName

# comment
ROUTE
# comment
Name
# comment
.
# comment
translation
# comment
TO
# comment
Name
# comment
.
# comment
scale

# comment

# comment 9`);

   expect (scene .getMetaDatas () .size) .toBe (1);
   expect (scene .rootNodes) .toHaveLength (7);
   expect (scene .importedNodes) .toHaveLength (1);
   expect (scene .exportedNodes) .toHaveLength (1);
   expect (scene .routes) .toHaveLength (1);
});

test ("string escape sequences", async () =>
{
   const scene = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", "escape-sequences.x3dv"))));

   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .string [0]) .toBe ("\\\"\\");
   expect (scene .rootNodes [0] .string [1]) .toBe ("\\\\\\a\\\"\"");
   expect (scene .rootNodes [0] .string [2]) .toBe ("\\\\\"\\\\");
});

test ("null", async () =>
{
   const scene1 = await Browser .createX3DFromString (`
PROTO T [
   inputOutput SFNode node DEF G Group { }
   inputOutput MFNode nodes USE G
] { }
Group {
   children [ NULL, NULL ]
}
NULL
NULL
T { }
T {
   node NULL
   nodes NULL
}
   `);

   const vrml = scene1 .toVRMLString ();

   expect (vrml .match (/\bNULL\b/g)) .toHaveLength (6);

   const
      scene2 = await Browser .createX3DFromString (scene1 .toXMLString ()),
      scene3 = await Browser .createX3DFromString (scene1 .toVRMLString ()),
      scene4 = await Browser .createX3DFromString (scene1 .toJSONString ()),
      scene5 = await Browser .createX3DFromString (scene1 .toXMLString ({ closingTags: true }));

   for (const scene of [scene1, scene2, scene3, scene4, scene5])
   {
      expect (scene .rootNodes) .toHaveLength (5);
      expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Group");
      expect (scene .rootNodes [0] .children) .toHaveLength (2);
      expect (scene .rootNodes [0] .children [0]) .toBe (null);
      expect (scene .rootNodes [0] .children [1]) .toBe (null);
      expect (scene .rootNodes [1]) .toBe (null);
      expect (scene .rootNodes [2]) .toBe (null);
      expect (scene .rootNodes [3] .getNodeTypeName ()) .toBe ("T");
      expect (scene .rootNodes [3] .node .getNodeTypeName ()) .toBe ("Group");
      expect (scene .rootNodes [3] .node) .toBe (scene .getNamedNode ("G"));
      expect (scene .rootNodes [3] .nodes) .toHaveLength (1);
      expect (scene .rootNodes [3] .nodes [0] .getNodeTypeName ()) .toBe ("Group");
      expect (scene .rootNodes [3] .nodes [0]) .toBe (scene .getNamedNode ("G"));
      expect (scene .rootNodes [4] .getNodeTypeName ()) .toBe ("T");
      expect (scene .rootNodes [4] .node) .toBe (null);
      expect (scene .rootNodes [4] .nodes) .toHaveLength (1);
      expect (scene .rootNodes [4] .nodes [0]) .toBe (null);
      expect (scene .toVRMLString ()) .toBe (vrml);
   }
});
