const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("removed fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.2 utf8
PROFILE Core
COMPONENT Geospatial:2

GeoViewpoint { }`))

   expect (scene1 .rootNodes [0] .navType) .toHaveLength (2)
   expect (scene1 .rootNodes [0] .headlight) .toBe (true)

   const scene2 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.3 utf8
PROFILE Core
COMPONENT Geospatial:2

GeoViewpoint { }`))

   expect (scene2 .rootNodes [0] .navType) .toBe (undefined)
   expect (scene2 .rootNodes [0] .headlight) .toBe (undefined)
})
