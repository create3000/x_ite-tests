const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("VRML fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#VRML V2.0 utf8
Switch {
   choice Group { }
}`))

   expect (scene1 .rootNodes [0] .choice) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .choice [0] .getNodeTypeName ()) .toBe ("Group")
   expect (scene1 .rootNodes [0] .children) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .children [0] .getNodeTypeName ()) .toBe ("Group")
})
