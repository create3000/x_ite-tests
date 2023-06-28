const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("Removed fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.3 utf8
ComposedCubeMapTexture {
   front ImageTexture { }
   back ImageTexture { }
   left ImageTexture { }
   right ImageTexture { }
   top ImageTexture { }
   bottom ImageTexture { }
}`))

   expect (scene1 .rootNodes [0] .front  .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .back   .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .left   .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .right  .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .top    .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .bottom .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .frontTexture  .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .backTexture   .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .leftTexture   .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .rightTexture  .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .topTexture    .getNodeTypeName ()) .toBe ("ImageTexture")
   expect (scene1 .rootNodes [0] .bottomTexture .getNodeTypeName ()) .toBe ("ImageTexture")
})
