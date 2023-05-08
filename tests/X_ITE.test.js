const
   X3D              = require ("./X3D"),
   X3DCanvasElement = X3D .require ("x_ite/X3DCanvasElement")

test ("constructor", () =>
{
   const canvas = X3D .createBrowser ()

   expect (canvas)          .toBeInstanceOf (X3DCanvasElement)
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser)
})
