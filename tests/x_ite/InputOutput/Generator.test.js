const
   X3D           = require ("../../X3D"),
   VRMLGenerator = X3D .VRMLGenerator,
   Browser       = X3D .createBrowser () .browser,
   latestVersion = Browser .currentScene .specificationVersion

const values = [
   [NaN, "NaN"],
   [Infinity, "Infinity"],
   [-Infinity, "-Infinity"],
   [0, "0"],
   [0.00000123456789, "1.234568e-6"],
   [0.0000123456789, "1.234568e-5"],
   [0.000123456789, "0.0001234568"],
   [0.00123456789, "0.001234568"],
   [0.0123456789, "0.01234568"],
   [0.123456789, "0.1234568"],
   [1.23456789, "1.234568"],
   [0.00000123, "1.23e-6"],
   [0.0000123, "1.23e-5"],
   [0.000123, "0.000123"],
   [0.00123, "0.00123"],
   [0.0123, "0.0123"],
   [0.123, "0.123"],
   [1.123, "1.123"],
   [12.123, "12.123"],
   [123.123, "123.123"],
   [1234.123, "1234.123"],
   [12345.123, "12345.12"],
   [123456.123, "123456.1"],
   [1234567.123, "1234567"],
   [12345678.123, "1.234568e7"],
   [123456789.123, "1.234568e8"],
   [1234567890.123, "1.234568e9"],
   [12345678901.123, "1.234568e10"],
   [123456789012.123, "1.234568e11"],
   [-0, "-0"],
   [-0.00000123, "-1.23e-6"],
   [-0.0000123, "-1.23e-5"],
   [-0.000123, "-0.000123"],
   [-0.00123, "-0.00123"],
   [-0.0123, "-0.0123"],
   [-0.123, "-0.123"],
   [-1.123, "-1.123"],
   [-12.123, "-12.123"],
   [-123.123, "-123.123"],
   [-1234.123, "-1234.123"],
   [-12345.123, "-12345.12"],
   [-123456.123, "-123456.1"],
   [-1234567.123, "-1234567"],
   [-12345678.123, "-1.234568e7"],
   [-123456789.123, "-1.234568e8"],
   [-1234567890.123, "-1.234568e9"],
   [-12345678901.123, "-1.234568e10"],
   [-123456789012.123, "-1.234568e11"],
];

test ("FloatFormat", () =>
{
   const generator = new VRMLGenerator ({ })

   for (const [first, second] of values)
      expect (generator .FloatFormat (first)) .toBe (second)
})

test ("DoubleFormat", () =>
{
   const generator = new VRMLGenerator ({ doublePrecision: 7 })

   for (const [first, second] of values)
      expect (generator .DoubleFormat (first)) .toBe (second)
})

test ("names 1", async () =>
{
   const input = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "https://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
  <Scene>
    <Group DEF='x_4'/>
    <Group DEF='x_1'/>
    <Group DEF='x_8'/>
    <Group DEF='x_3'/>
    <ROUTE fromNode='x_4' fromField='children_changed' toNode='x_1' toField='set_children'/>
    <ROUTE fromNode='x_4' fromField='children_changed' toNode='x_8' toField='set_children'/>
    <ROUTE fromNode='x_4' fromField='children_changed' toNode='x_3' toField='set_children'/>
  </Scene>
</X3D>
`

   const
      xml  = await Browser .createX3DFromString (input),
      vrml = await Browser .createX3DFromString (xml .toVRMLString ()),
      json = await Browser .createX3DFromString (xml .toJSONString ())

   expect (xml  .toXMLString ()) .toBe (input)
   expect (vrml .toXMLString ()) .toBe (input)
   expect (json .toXMLString ()) .toBe (input)
})

test ("names 2", async () =>
{
   const input = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "https://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
  <Scene>
    <Group DEF='_99'/>
    <Group DEF='X_99'/>
    <Group DEF='_4'/>
    <Group DEF='_1'/>
    <Group DEF='_8'/>
    <Group DEF='_3'/>
    <ROUTE fromNode='_4' fromField='children_changed' toNode='_1' toField='set_children'/>
    <ROUTE fromNode='_4' fromField='children_changed' toNode='_8' toField='set_children'/>
    <ROUTE fromNode='_4' fromField='children_changed' toNode='_3' toField='set_children'/>
  </Scene>
</X3D>
`

const output = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "https://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
  <Scene>
    <Group/>
    <Group DEF='X_99'/>
    <Group DEF='_4'/>
    <Group DEF='_1'/>
    <Group DEF='_8'/>
    <Group DEF='_3'/>
    <ROUTE fromNode='_4' fromField='children_changed' toNode='_1' toField='set_children'/>
    <ROUTE fromNode='_4' fromField='children_changed' toNode='_8' toField='set_children'/>
    <ROUTE fromNode='_4' fromField='children_changed' toNode='_3' toField='set_children'/>
  </Scene>
</X3D>
`

   const
      xml  = await Browser .createX3DFromString (input),
      vrml = await Browser .createX3DFromString (xml .toVRMLString ()),
      json = await Browser .createX3DFromString (xml .toJSONString ())

   expect (xml  .toXMLString ()) .toBe (output)
   expect (vrml .toXMLString ()) .toBe (output)
   expect (json .toXMLString ()) .toBe (output)
})

test ("names 3", async () =>
{
   const scene = await Browser .createScene (Browser .getProfile ("Interchange"))

   const
      g1 = scene .createNode ("Group"),
      g2 = scene .createNode ("Group"),
      g3 = scene .createNode ("Group"),
      g4 = scene .createNode ("Group")

   scene .rootNodes .push (g1, g2, g3, g4)
   scene .addRoute (g1, "children", g2, "children")
   scene .addRoute (g1, "children", g3, "children")
   scene .addRoute (g1, "children", g4, "children")

   const output = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "https://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='https://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
  <Scene>
    <Group DEF='_1'/>
    <Group DEF='_2'/>
    <Group DEF='_3'/>
    <Group DEF='_4'/>
    <ROUTE fromNode='_1' fromField='children_changed' toNode='_2' toField='set_children'/>
    <ROUTE fromNode='_1' fromField='children_changed' toNode='_3' toField='set_children'/>
    <ROUTE fromNode='_1' fromField='children_changed' toNode='_4' toField='set_children'/>
  </Scene>
</X3D>
`

   const
      xml  = scene .toXMLString (),
      vrml = (await Browser .createX3DFromString (scene .toVRMLString ())) .toXMLString (),
      json = (await Browser .createX3DFromString (scene .toJSONString ())) .toXMLString ()

   expect (xml)  .toBe (output)
   expect (vrml) .toBe (output)
   expect (json) .toBe (output)
})

test ("exported node without name", async () =>
{
   const
      scene1 = await Browser .createScene (Browser .getProfile ("Full")),
      node   = scene1 .createNode ("WorldInfo");

   scene1 .rootNodes .push (node);
   scene1 .addExportedNode ("Export", node);

   expect (scene1 .rootNodes)     .toHaveLength (1);
   expect (scene1 .exportedNodes) .toHaveLength (1);

   const scene2 = await Browser .createX3DFromString (scene1 .toXMLString ());

   expect (scene2 .rootNodes)     .toHaveLength (1);
   expect (scene2 .exportedNodes) .toHaveLength (1);
});

test ("imported names", async () =>
{
   const scene1 = await Browser .createX3DFromString (`
DEF I Inline {
   url "data:model/x3d+vrml,
DEF T Transform { }
EXPORT T
   "
}
DEF T Transform { }
IMPORT I.T
   `);

   expect (scene1 .rootNodes)     .toHaveLength (2);
   expect (scene1 .namedNodes)    .toHaveLength (2);
   expect (scene1 .importedNodes) .toHaveLength (1);

   expect (scene1 .getLocalNode ("T")) .toBe (scene1 .importedNodes [0]);
   expect (scene1 .getLocalNode ("T")) .toBeInstanceOf (X3D .X3DImportedNode);
   expect (scene1 .importedNodes [0] .importedName) .toBe ("T");

   const scene2 = await Browser .createX3DFromString (scene1 .toXMLString ());

   expect (scene2 .rootNodes)     .toHaveLength (2);
   expect (scene2 .namedNodes)    .toHaveLength (2);
   expect (scene2 .importedNodes) .toHaveLength (1);

   expect (scene2 .getLocalNode ("T")) .toBe (scene2 .importedNodes [0]);
   expect (scene2 .getLocalNode ("T")) .toBeInstanceOf (X3D .X3DImportedNode);
   expect (scene2 .importedNodes [0] .importedName) .toBe ("T");
});


test ("hidden routes", async () =>
{
   const scene = await Browser .createX3DFromString (`
DEF T1 Transform { }
   `);

   const x3d  = scene .toXMLString ();
   const x3dv = scene .toVRMLString ();
   const json = scene .toJSONString ();

   expect (x3d  .includes ("Transform")) .toBe (true);
   expect (x3dv .includes ("Transform")) .toBe (true);
   expect (json .includes ("Transform")) .toBe (true);

   const t1 = scene .getNamedNode ("T1");
   const t2 = scene .createNode ("Transform");
   const t3 = scene .createNode ("Transform");

   scene .addNamedNode ("T3", t3);

   expect (scene .namedNodes) .toHaveLength (2);
   expect (t3 .getNodeName ()) .toBe ("T3");

   scene .addRoute (t1, "translation", t2, "translation");
   scene .addRoute (t2, "rotation", t1, "rotation");

   scene .addRoute (t1, "translation", t3, "translation");
   scene .addRoute (t3, "rotation", t1, "rotation");

   expect (scene .toXMLString ()) .toBe (x3d);
   expect (scene .toVRMLString () .trimEnd ()) .toBe (x3dv .trimEnd ());
   expect (scene .toJSONString ()) .toBe (json);
});
