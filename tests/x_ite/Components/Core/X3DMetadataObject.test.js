const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("containerField-3.3", async () =>
{
   const scene = await Browser .createX3DFromString (/* xml */ `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.3//EN" "http://www.web3d.org/specifications/x3d-3.3.dtd">
<X3D profile='Core' version='3.3'>
   <Scene>
      <WorldInfo>
         <MetadataSet
               name='metadata'>
            <MetadataBoolean containerField='value'
                  name='value'/>
         </MetadataSet>
      </WorldInfo>
   </Scene>
</X3D>
   `);

   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo");
   expect (scene .rootNodes [0] .metadata) .not .toBe (null);
   expect (scene .rootNodes [0] .metadata .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene .rootNodes [0] .metadata .value) .toHaveLength (1);
   expect (scene .rootNodes [0] .metadata .value [0] .getNodeTypeName ()) .toBe ("MetadataBoolean");
});

test ("containerField-4.0", async () =>
{
   const scene = await Browser .createX3DFromString (/* xml */ `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 4.0//EN" "http://www.web3d.org/specifications/x3d-4.0.dtd">
<X3D profile='Core' version='4.0'>
   <Scene>
      <WorldInfo>
         <MetadataSet containerField='metadata'
               name='metadata'>
            <MetadataBoolean
                  name='value'/>
         </MetadataSet>
      </WorldInfo>
   </Scene>
</X3D>
   `);

   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("WorldInfo");
   expect (scene .rootNodes [0] .metadata) .not .toBe (null);
   expect (scene .rootNodes [0] .metadata .getNodeTypeName ()) .toBe ("MetadataSet");
   expect (scene .rootNodes [0] .metadata .value) .toHaveLength (1);
   expect (scene .rootNodes [0] .metadata .value [0] .getNodeTypeName ()) .toBe ("MetadataBoolean");
});
