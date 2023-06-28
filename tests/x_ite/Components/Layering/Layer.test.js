const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("Removed fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#X3D V3.3 utf8
Layer {
   isPickable FALSE
}
Layer {
   isPickable TRUE
}`))

   expect (scene1 .rootNodes [0] .isPickable) .toBe (false)
   expect (scene1 .rootNodes [1] .isPickable) .toBe (true)
   expect (scene1 .rootNodes [0] .pickable) .toBe (false)
   expect (scene1 .rootNodes [1] .pickable) .toBe (true)
})
