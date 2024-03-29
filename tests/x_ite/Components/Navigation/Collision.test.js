const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("VRML fields", async () =>
{
   const scene1 = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,#VRML V2.0 utf8
Collision {
   collide FALSE
}
Collision {
   collide TRUE
}`))

   expect (scene1 .rootNodes [0] .collide) .toBe (false)
   expect (scene1 .rootNodes [1] .collide) .toBe (true)
   expect (scene1 .rootNodes [0] .enabled) .toBe (false)
   expect (scene1 .rootNodes [1] .enabled) .toBe (true)
})
