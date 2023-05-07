const
   X3D              = require ("./X3D"),
   X3DCanvasElement = X3D .require ("x_ite/X3DCanvasElement"),
   X3DBrowser       = X3D .require ("x_ite/Browser/X3DBrowser")

test ("constructor", () =>
{
   const canvas = X3D .createBrowser ()

   expect (canvas instanceof X3DCanvasElement) .toBe (true)
   expect (canvas .browser instanceof X3DBrowser) .toBe (true)
})
