const
   X3D     = require ("../../X3D"),
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test ("properties1", async () =>
{
   const
      profile = Browser .getProfile ("Full"),
      scene   = await Browser .createScene (profile)

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .constructor) .toBe (X3D .X3DScene)
   expect (scene .specificationVersion) .toMatch (/^\d+\.\d+$/)
   expect (scene .specificationVersion) .toBe (X3D .LATEST_VERSION)
   expect (scene .encoding) .toBe ("SCRIPTED")
   expect (scene .profile) .toBe (profile)
   expect (scene .components) .toHaveLength (0)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .worldURL) .toMatch (/^file:\/\/\/.*$/)
   expect (scene .namedNodes) .toHaveLength (0)
   expect (scene .namedNodes) .toBeInstanceOf (X3D .NamedNodesArray)
   expect (scene .importedNodes) .toHaveLength (0)
   expect (scene .importedNodes) .toBeInstanceOf (X3D .ImportedNodesArray)
   expect (scene .exportedNodes) .toHaveLength (0)
   expect (scene .exportedNodes) .toBeInstanceOf (X3D .ExportedNodesArray)
   expect (scene .rootNodes) .toHaveLength (0)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .protos) .toHaveLength (0)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .externprotos) .toHaveLength (0)
   expect (scene .externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)

   expect (X3D .X3DScene .typeName) .toBe ("X3DScene")
   expect (scene .getTypeName ()) .toBe ("X3DScene")
   expect (Object .prototype .toString .call (scene)) .toBe (`[object X3DScene]`)
   expect (scene .toString ()) .toBe (`[object ${scene .getTypeName ()}]`)
})

test ("properties2", async () =>
{
   const
      scene = await Browser .createScene (),
      nodes = new X3D .MFNode (scene .createNode ("WorldInfo"))

   const
      specificationVersion = scene .specificationVersion,
      encoding             = scene .encoding,
      profile              = scene .profile,
      components           = scene .components,
      worldURL             = scene .worldURL,
      rootNodes            = scene .rootNodes,
      namedNodes           = scene .namedNodes,
      importedNodes        = scene .importedNodes,
      exportedNodes        = scene .exportedNodes,
      protos               = scene .protos,
      externprotos         = scene .externprotos,
      routes               = scene .routes

   scene .isScene              = undefined
   scene .specificationVersion = undefined
   scene .encoding             = undefined
   scene .profile              = undefined
   scene .components           = undefined
   scene .worldURL             = undefined
   scene .namedNodes           = undefined
   scene .importedNodes        = undefined
   scene .exportedNodes        = undefined
   scene .rootNodes            = nodes
   scene .protos               = undefined
   scene .externprotos         = undefined
   scene .routes               = undefined

   expect (scene) .toBeInstanceOf (X3D .X3DScene)
   expect (scene) .toBeInstanceOf (X3D .X3DExecutionContext)
   expect (scene .isScene) .toBe (true)
   expect (scene .getLocalScene ()) .toBe (scene)
   expect (scene .specificationVersion) .toBe (specificationVersion)
   expect (scene .encoding) .toBe (encoding)
   expect (scene .profile) .toBe (profile)
   expect (scene .components) .toBe (components)
   expect (scene .components) .toHaveLength (0)
   expect (scene .components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (scene .worldURL) .toBe (worldURL)
   expect (scene .baseURL) .toBe (worldURL)
   expect (scene .namedNodes) .toBe (namedNodes)
   expect (scene .namedNodes) .toHaveLength (0)
   expect (scene .namedNodes) .toBeInstanceOf (X3D .NamedNodesArray)
   expect (scene .importedNodes) .toBe (importedNodes)
   expect (scene .importedNodes) .toHaveLength (0)
   expect (scene .importedNodes) .toBeInstanceOf (X3D .ImportedNodesArray)
   expect (scene .exportedNodes) .toBe (exportedNodes)
   expect (scene .exportedNodes) .toHaveLength (0)
   expect (scene .exportedNodes) .toBeInstanceOf (X3D .ExportedNodesArray)
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

   const properties = [
      "isScene",
      "specificationVersion",
      "encoding",
      "profile",
      "components",
      "units",
      "namedNodes",
      "importedNodes",
      "exportedNodes",
      "worldURL",
      "baseURL",
      "rootNodes",
      "protos",
      "externprotos",
      "routes",
   ]

   enumerate (properties, scene)
});

test ("hasComponent", async () =>
{
   const scene1 = await Browser .createX3DFromString (`#X3D V4.1 utf8
COMPONENT X_ITE : 1
COMPONENT WebXR : 1
   `);

   for (const component of Browser .supportedComponents)
      expect (scene1 .hasComponent (component .name)) .toBe (true);

   expect (scene1 .hasComponent (Browser .getComponent ("Geometry3D", 3))) .toBe (true);
   expect (scene1 .hasComponent (Browser .getComponent ("Geometry3D", 4))) .toBe (true);

   const scene2 = await Browser .createX3DFromString (`#X3D V4.1 utf8
PROFILE Interchange
   `);

   expect (scene2 .hasComponent (Browser .getComponent ("Geometry3D", 1))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Geometry3D", 2))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Geometry3D", 3))) .toBe (false);

   const scene3 = await Browser .createX3DFromString (`#X3D V4.1 utf8
PROFILE Interchange
COMPONENT Geometry3D : 3
   `);

   expect (scene3 .hasComponent (Browser .getComponent ("Geometry3D", 1))) .toBe (true);
   expect (scene3 .hasComponent (Browser .getComponent ("Geometry3D", 2))) .toBe (true);
   expect (scene3 .hasComponent (Browser .getComponent ("Geometry3D", 3))) .toBe (true);

   const scene4 = await Browser .createX3DFromString (`#X3D V4.1 utf8
PROFILE Core
COMPONENT Geometry3D : 2
   `);

   expect (scene4 .hasComponent (Browser .getComponent ("Geometry3D", 1))) .toBe (true);
   expect (scene4 .hasComponent (Browser .getComponent ("Geometry3D", 2))) .toBe (true);
   expect (scene4 .hasComponent (Browser .getComponent ("Geometry3D", 3))) .toBe (false);
});

test ("addComponent", async () =>
{
   const scene1 = await Browser .createScene (Browser .getProfile ("Core"));

   expect (scene1 .getComponents ()) .toHaveLength (0);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 3))) .toBe (false);

   scene1 .addComponent (Browser .getComponent ("Shape", 3));

   expect (scene1 .getComponents ()) .toHaveLength (1);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 3))) .toBe (true);
   expect (() => scene1 .addComponent (Browser .getComponent ("Shape", 1))) .toThrow (Error);
   expect (() => scene1 .addComponent (Browser .getComponent ("Shape", 2))) .toThrow (Error);
   expect (() => scene1 .addComponent (Browser .getComponent ("Shape", 3))) .toThrow (Error);
   expect (() => scene1 .addComponent (Browser .getComponent ("Shape", 4))) .toThrow (Error);
});

test ("updateComponent", async () =>
{
   const scene1 = await Browser .createScene (Browser .getProfile ("Core"));

   expect (scene1 .getComponents ()) .toHaveLength (0);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (false);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (false);

   scene1 .updateComponent (Browser .getComponent ("Shape", 1));

   expect (scene1 .getComponents ()) .toHaveLength (1);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (true);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (false);

   scene1 .updateComponent (Browser .getComponent ("Shape", 2));

   expect (scene1 .getComponents ()) .toHaveLength (1);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (true);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (true);

   scene1 .updateComponent (Browser .getComponent ("Shape", 1));

   expect (scene1 .getComponents ()) .toHaveLength (1);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (true);
   expect (scene1 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (false);

   const scene2 = await Browser .createScene (Browser .getProfile ("Immersive"));

   expect (scene2 .getComponents ()) .toHaveLength (0);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 3))) .toBe (false);

   scene2 .updateComponent (Browser .getComponent ("Shape", 3));

   expect (scene2 .getComponents ()) .toHaveLength (1);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 3))) .toBe (true);

   scene2 .updateComponent (Browser .getComponent ("Shape", 2));

   expect (scene2 .getComponents ()) .toHaveLength (1);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 1))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 2))) .toBe (true);
   expect (scene2 .hasComponent (Browser .getComponent ("Shape", 3))) .toBe (false);

   scene2 .removeComponent ("Shape");

   expect (scene2 .getComponents ()) .toHaveLength (0);
});

test ("updateUnit", async () =>
{
   const scene = await Browser .createScene ()

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

test ("metadata", async () =>
{
   const scene = await Browser .createScene (Browser .getProfile ("Interchange"));

   expect (scene .getMetaDatas ()) .toHaveLength (0);

   scene .addMetaData ("foo", "foo1")
   expect (scene .getMetaDatas ()) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toEqual (["foo1"])

   scene .addMetaData ("foo", "foo2")
   expect (scene .getMetaDatas ()) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toEqual (["foo1", "foo2"])

   expect (scene .getMetaDatas ()) .not .toBe (scene .getMetaDatas ());
   expect (scene .getMetaData ("foo")) .not .toBe (scene .getMetaData ("foo"));

   scene .removeMetaData ("foo");
   expect (scene .getMetaDatas ()) .toHaveLength (0);

   scene .setMetaData ("foo", "foo1")
   expect (scene .getMetaDatas ()) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toEqual (["foo1"])

   scene .setMetaData ("bah", "bah1")
   expect (scene .getMetaDatas ()) .toHaveLength (2);
   expect (scene .getMetaData ("bah")) .toHaveLength (1);
   expect (scene .getMetaData ("bah")) .toEqual (["bah1"])

   scene .addMetaData ("foo", "foo2")
   expect (scene .getMetaDatas ()) .toHaveLength (3);
   expect (scene .getMetaData ("foo")) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toEqual (["foo1", "foo2"])

   scene .setMetaData ("foo", "foo1")
   expect (scene .getMetaDatas ()) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toEqual (["foo1"])

   scene .removeMetaData ("foo");
   expect (scene .getMetaDatas ()) .toHaveLength (1);

   scene .removeMetaData ("bah");
   expect (scene .getMetaDatas ()) .toHaveLength (0);

   expect (scene .getMetaData ("foo")) .toBe (undefined);
   expect (scene .getMetaData ("bah")) .toBe (undefined);

   scene .setMetaData ("foo", ["foo1", "foo2"])
   expect (scene .getMetaDatas ()) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toEqual (["foo1", "foo2"])

   scene .setMetaData ("bah", ["bah1", "bah2"])
   expect (scene .getMetaDatas ()) .toHaveLength (4);
   expect (scene .getMetaData ("bah")) .toHaveLength (2);
   expect (scene .getMetaData ("bah")) .toEqual (["bah1", "bah2"]);

   scene .removeMetaData ("foo");
   expect (scene .getMetaDatas ()) .toHaveLength (2);

   scene .removeMetaData ("bah");
   expect (scene .getMetaDatas ()) .toHaveLength (0);

   scene .setMetaData ("foo", [123, true])
   expect (scene .getMetaDatas ()) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toHaveLength (2);
   expect (scene .getMetaData ("foo")) .toEqual (["123", "true"]);

   scene .setMetaData ("foo", 123.456)
   expect (scene .getMetaDatas ()) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toHaveLength (1);
   expect (scene .getMetaData ("foo")) .toEqual (["123.456"]);

   scene .removeMetaData ("foo");
   expect (scene .getMetaDatas ()) .toHaveLength (0);

   scene .addMetaData ("foo1", "111");
   scene .addMetaData ("foo2", "222");
   scene .addMetaData ("foo3", "333");
   scene .addMetaData ("foo4", "444");
   scene .addMetaData ("foo5", "555");

   expect (scene .getMetaDatas ()) .toEqual ( [
      ["foo1", "111"],
      ["foo2", "222"],
      ["foo3", "333"],
      ["foo4", "444"],
      ["foo5", "555"],
   ]);

   scene .setMetaData ("foo3", "999");

   expect (scene .getMetaDatas ()) .toEqual ( [
      ["foo1", "111"],
      ["foo2", "222"],
      ["foo3", "999"],
      ["foo4", "444"],
      ["foo5", "555"],
   ]);

   scene .setMetaData ("foo6", "666");

   expect (scene .getMetaDatas ()) .toEqual ( [
      ["foo1", "111"],
      ["foo2", "222"],
      ["foo3", "999"],
      ["foo4", "444"],
      ["foo5", "555"],
      ["foo6", "666"],
   ]);

   scene .setMetaData ("foo1", "aaa");

   expect (scene .getMetaDatas ()) .toEqual ( [
      ["foo1", "aaa"],
      ["foo2", "222"],
      ["foo3", "999"],
      ["foo4", "444"],
      ["foo5", "555"],
      ["foo6", "666"],
   ]);
});
