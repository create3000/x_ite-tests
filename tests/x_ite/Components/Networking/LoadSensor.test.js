const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("VRML fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.3 utf8
LoadSensor {
   watchList ImageTexture { }
}`))

   expect (scene1 .rootNodes [0] .watchList) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .watchList [0] .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .children) .toHaveLength (1)
   expect (scene1 .rootNodes [0] .children [0] .getNodeTypeName ()) .toBe ("ImageTexture")
})
