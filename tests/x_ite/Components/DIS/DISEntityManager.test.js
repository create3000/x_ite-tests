const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("Removed fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.3 utf8
DISEntityManager {
   mapping Group { }
}`))

   expect (scene1 .rootNodes [0] .mapping) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .mapping [0] .getNodeTypeName ()) .toBe ("Group")
   expect (scene1 .rootNodes [0] .children) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .children [0] .getNodeTypeName ()) .toBe ("Group")
})
