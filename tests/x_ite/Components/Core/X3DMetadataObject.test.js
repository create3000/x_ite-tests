const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("containerField-3.3", async () =>
{
   const scene1 = await Browser .createX3DFromString (/* xml */ `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.3//EN" "http://www.web3d.org/specifications/x3d-3.3.dtd">
<X3D profile='Core' version='3.3'>
   <Scene>
      <WorldInfo>
         <MetadataSet>
            <MetadataBoolean containerField='value'/>
            <MetadataDouble  containerField='value'/>
            <MetadataFloat   containerField='value'/>
            <MetadataInteger containerField='value'/>
            <MetadataSet     containerField='value'/>
            <MetadataString  containerField='value'/>
         </MetadataSet>
      </WorldInfo>
   </Scene>
</X3D>
   `);

   expect (scene1 .specificationVersion) .toBe ("3.3");
   expect (scene1 .rootNodes) .toHaveLength (1);
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo");
   expect (scene1 .rootNodes [0] .metadata) .not .toBe (null);
   expect (scene1 .rootNodes [0] .metadata .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene1 .rootNodes [0] .metadata .value) .toHaveLength (6);
   expect (scene1 .rootNodes [0] .metadata .value [0] .getNodeTypeName ()) .toBe ("MetadataBoolean");
   expect (scene1 .rootNodes [0] .metadata .value [1] .getNodeTypeName ()) .toBe ("MetadataDouble");
   expect (scene1 .rootNodes [0] .metadata .value [2] .getNodeTypeName ()) .toBe ("MetadataFloat");
   expect (scene1 .rootNodes [0] .metadata .value [3] .getNodeTypeName ()) .toBe ("MetadataInteger");
   expect (scene1 .rootNodes [0] .metadata .value [4] .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene1 .rootNodes [0] .metadata .value [5] .getNodeTypeName ()) .toBe ("MetadataString");

   const scene2 = await Browser .createX3DFromString (scene1 .toXMLString ());

   expect (scene2 .specificationVersion) .toBe (X3D .LATEST_VERSION);
   expect (scene2 .rootNodes) .toHaveLength (1);
   expect (scene2 .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo");
   expect (scene2 .rootNodes [0] .metadata) .not .toBe (null);
   expect (scene2 .rootNodes [0] .metadata .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene2 .rootNodes [0] .metadata .value) .toHaveLength (6);
   expect (scene2 .rootNodes [0] .metadata .value [0] .getNodeTypeName ()) .toBe ("MetadataBoolean");
   expect (scene2 .rootNodes [0] .metadata .value [1] .getNodeTypeName ()) .toBe ("MetadataDouble");
   expect (scene2 .rootNodes [0] .metadata .value [2] .getNodeTypeName ()) .toBe ("MetadataFloat");
   expect (scene2 .rootNodes [0] .metadata .value [3] .getNodeTypeName ()) .toBe ("MetadataInteger");
   expect (scene2 .rootNodes [0] .metadata .value [4] .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene2 .rootNodes [0] .metadata .value [5] .getNodeTypeName ()) .toBe ("MetadataString");
});

test ("containerField-4.0", async () =>
{
   const scene1 = await Browser .createX3DFromString (/* xml */ `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 4.0//EN" "http://www.web3d.org/specifications/x3d-4.0.dtd">
<X3D profile='Core' version='4.0'>
   <Scene>
      <WorldInfo>
         <MetadataSet containerField='metadata' name='metadata'>
            <MetadataBoolean/>
            <MetadataDouble/>
            <MetadataFloat/>
            <MetadataInteger/>
            <MetadataSet/>
            <MetadataString/>
         </MetadataSet>
      </WorldInfo>
   </Scene>
</X3D>
   `);

   expect (scene1 .specificationVersion) .toBe ("4.0");
   expect (scene1 .rootNodes) .toHaveLength (1);
   expect (scene1 .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo");
   expect (scene1 .rootNodes [0] .metadata) .not .toBe (null);
   expect (scene1 .rootNodes [0] .metadata .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene1 .rootNodes [0] .metadata .value) .toHaveLength (6);
   expect (scene1 .rootNodes [0] .metadata .value [0] .getNodeTypeName ()) .toBe ("MetadataBoolean");
   expect (scene1 .rootNodes [0] .metadata .value [1] .getNodeTypeName ()) .toBe ("MetadataDouble");
   expect (scene1 .rootNodes [0] .metadata .value [2] .getNodeTypeName ()) .toBe ("MetadataFloat");
   expect (scene1 .rootNodes [0] .metadata .value [3] .getNodeTypeName ()) .toBe ("MetadataInteger");
   expect (scene1 .rootNodes [0] .metadata .value [4] .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene1 .rootNodes [0] .metadata .value [5] .getNodeTypeName ()) .toBe ("MetadataString");

   const scene2 = await Browser .createX3DFromString (scene1 .toXMLString ());

   expect (scene2 .specificationVersion) .toBe (X3D .LATEST_VERSION);
   expect (scene2 .rootNodes) .toHaveLength (1);
   expect (scene2 .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo");
   expect (scene2 .rootNodes [0] .metadata) .not .toBe (null);
   expect (scene2 .rootNodes [0] .metadata .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene2 .rootNodes [0] .metadata .value) .toHaveLength (6);
   expect (scene2 .rootNodes [0] .metadata .value [0] .getNodeTypeName ()) .toBe ("MetadataBoolean");
   expect (scene2 .rootNodes [0] .metadata .value [1] .getNodeTypeName ()) .toBe ("MetadataDouble");
   expect (scene2 .rootNodes [0] .metadata .value [2] .getNodeTypeName ()) .toBe ("MetadataFloat");
   expect (scene2 .rootNodes [0] .metadata .value [3] .getNodeTypeName ()) .toBe ("MetadataInteger");
   expect (scene2 .rootNodes [0] .metadata .value [4] .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene2 .rootNodes [0] .metadata .value [5] .getNodeTypeName ()) .toBe ("MetadataString");
});
