const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("VRML fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#VRML V2.0 utf8
LOD {
   level Group { }
}`))

   expect (scene1 .rootNodes [0] .level) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .level [0] .getNodeTypeName ()) .toBe ("Group")
})
