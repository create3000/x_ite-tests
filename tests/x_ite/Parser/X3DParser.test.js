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
      latestVersion = Browser .createScene () .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `statements.x3d`))))

   const orig = await fetch (path .join (__dirname, "files", "X3D", `statements.x3d`)) .then (r => r .text ())

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style: style }),
         x3dv = scene .toVRMLString ({ style: style }),
         x3dj = scene .toJSONString ({ style: style })

      const encodings = ["XML", "XML", "VRML", "JSON"]

      Browser .baseURL = scene .worldURL

      for (const [i, file] of [orig, x3d, x3dv, x3dj] .entries ())
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

         expect (scene .toXMLString ()) .toBe (orig)
         expect (scene .toXMLString  ({ style: style })) .toBe (x3d)
         expect (scene .toVRMLString ({ style: style })) .toBe (x3dv)
         expect (scene .toJSONString ({ style: style })) .toBe (x3dj)
      }
   }
})

test ("fields.x3d", async () =>
{
   const
      latestVersion = Browser .createScene () .specificationVersion,
      scene         = await Browser .createX3DFromURL (new X3D .MFString (url .pathToFileURL (path .join (__dirname, "files", "X3D", `fields.x3d`))))

   const orig = await fetch (path .join (__dirname, "files", "X3D", `fields.x3d`)) .then (r => r .text ())

   for (const style of ["TIDY", "COMPACT", "SMALL", "CLEAN"])
   {
      const
         x3d  = scene .toXMLString  ({ style: style }),
         x3dv = scene .toVRMLString ({ style: style }),
         x3dj = scene .toJSONString ({ style: style })

      const encodings = ["XML", "XML", "VRML", "JSON"]

      Browser .baseURL = scene .worldURL

      for (const [i, file] of [orig, x3d, x3dv, x3dj] .entries ())
      {
         const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d,${file}`))

         expect (scene .encoding) .toBe (encodings [i])

         if (i)
            expect (scene .specificationVersion) .toBe (latestVersion)

         expect (scene .toXMLString ()) .toBe (orig)
         expect (scene .toXMLString  ({ style: style })) .toBe (x3d)
         expect (scene .toVRMLString ({ style: style })) .toBe (x3dv)
         expect (scene .toJSONString ({ style: style })) .toBe (x3dj)
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
      scene3 = await Browser .createX3DFromString (scene1 .toJSONString ())

   expect (scene1 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene2 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)
   expect (scene3 .rootNodes) .toHaveLength (Browser .getConcreteNodes () .length)

   for (const [i, node] of scene1 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene2 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)

   for (const [i, node] of scene3 .rootNodes .entries ())
      expect (node .getNodeTypeName ()) .toBe (Browser .getConcreteNodes () [i] .typeName)
})

test ("initializableReference.x3dv", async () =>
{
   const
      orig  = await fetch (path .join (__dirname, "files", "X3D", `initializableReference.x3dv`)) .then (r => r .text ()) .then (t => t .replace (/V\d+\.\d+\.\d+/, "V" + Browser .version)),
      scene = await Browser .createX3DFromString (orig),
      x3d   = await Browser .createX3DFromString (scene .toXMLString ()),
      x3dj  = await Browser .createX3DFromString (scene .toJSONString ()),
      x3dv  = await Browser .createX3DFromString (scene .toVRMLString ())

   expect (x3d  .toVRMLString ()) .toBe (orig)
   expect (x3dj .toVRMLString ()) .toBe (orig)
   expect (x3dv .toVRMLString ()) .toBe (orig)
})

test ("doubleFields.x3d", async () =>
{
   const
      orig  = await fetch (path .join (__dirname, "files", "X3D", `doubleFields.x3d`)) .then (r => r .text ()),
      scene = await Browser .createX3DFromString (orig),
      x3d   = await Browser .createX3DFromString (scene .toXMLString ()),
      x3dj  = await Browser .createX3DFromString (scene .toJSONString ()),
      x3dv  = await Browser .createX3DFromString (scene .toVRMLString ())

   expect (x3d  .toXMLString ()) .toBe (orig)
   expect (x3dj .toXMLString ()) .toBe (orig)
   expect (x3dv .toXMLString ()) .toBe (orig)
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
      scene4 = await Browser .createX3DFromString (scene1 .toJSONString ());

   for (const scene of [scene1, scene2, scene3, scene4])
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
      scene4 = await Browser .createX3DFromString (scene1 .toJSONString ());

   for (const scene of [scene1, scene2, scene3, scene4])
   {
      expect (scene .rootNodes) .toHaveLength (3);
      expect (scene .importedNodes) .toHaveLength (2);
      expect (scene .routes) .toHaveLength (2);

      expect (scene .importedNodes [0]) .toBe (scene .getImportedNodes () .get (scene .importedNodes [0] .importedName));
      expect (scene .importedNodes [1]) .toBe (scene .getImportedNodes () .get (scene .importedNodes [1] .importedName));

      expect (scene .importedNodes [0] .importedName) .not .toBe ("Box");
      expect (scene .importedNodes [1] .importedName) .toBe ("Box");

      expect (scene .routes [0] .sourceNode) .toBe (scene .importedNodes [0]);
      expect (scene .routes [1] .sourceNode) .toBe (scene .importedNodes [1]);

      expect (scene .routes [0] .destinationNode) .toBe (scene .getNamedNode ("T"));
      expect (scene .routes [1] .destinationNode) .toBe (scene .getNamedNode ("T"));
   }
});
