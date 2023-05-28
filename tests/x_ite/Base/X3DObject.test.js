const
   X3D       = require ("../../X3D"),
   X3DObject = X3D .require ("x_ite/Base/X3DObject")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene

test ("getId", () =>
{
   expect (X3DObject .getId ({ })) .not .toBe ({ })
   expect (Browser .getId ()) .not .toBe (scene .getId ())
})
