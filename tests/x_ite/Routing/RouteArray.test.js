const X3D = require ("../../X3D")

test ("properties", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

DEF I PositionInterpolator { }

DEF T Transform {
   children Shape {
      geometry Box { }
   }
}

ROUTE I.value_changed TO T.set_translation
`))

   expect (scene .routes) .toHaveLength (1)
   expect (scene .routes) .toBeInstanceOf (X3D .RouteArray)
   expect (scene .routes .constructor) .toBe (X3D .RouteArray)
})
