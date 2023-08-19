const
   X3D           = require ("../../X3D"),
   Generator     = X3D .require ("x_ite/InputOutput/Generator"),
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
   const generator = new Generator ({ })

   for (const [first, second] of values)
      expect (generator .FloatFormat (first)) .toBe (second)
})

test ("DoubleFormat", () =>
{
   const generator = new Generator ({ doublePrecision: 7 })

   for (const [first, second] of values)
      expect (generator .DoubleFormat (first)) .toBe (second)
})

test ("names 1", async () =>
{
   const input = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "http://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
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
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "http://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
  <Scene>
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
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D ${latestVersion}//EN" "http://www.web3d.org/specifications/x3d-${latestVersion}.dtd">
<X3D profile='Interchange' version='${latestVersion}' xmlns:xsd='http://www.w3.org/2001/XMLSchema-instance' xsd:noNamespaceSchemaLocation='http://www.web3d.org/specifications/x3d-${latestVersion}.xsd'>
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
      xml  = await Browser .createX3DFromString (input),
      vrml = await Browser .createX3DFromString (xml .toVRMLString ()),
      json = await Browser .createX3DFromString (xml .toJSONString ())

   expect (xml  .toXMLString ()) .toBe (output)
   expect (vrml .toXMLString ()) .toBe (output)
   expect (json .toXMLString ()) .toBe (output)
})
