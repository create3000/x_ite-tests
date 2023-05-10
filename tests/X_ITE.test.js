const
   X3D              = require ("./X3D"),
   X3DCanvasElement = X3D .require ("x_ite/X3DCanvasElement")

test ("constructor", () =>
{
   const canvas = X3D .createBrowser ()

   expect (canvas) .toBeInstanceOf (X3DCanvasElement)
   expect (X3D .getBrowser (canvas)) .toBe (canvas .browser)
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser)
})

test ("X3D-classic", () => new Promise ((resolve, reject) =>
{
   X3D (() =>
   {
      resolve ()
   },
   (error) =>
   {
      reject (error .message)
   })
}))

test ("X3D-async", async () =>
{
   await X3D ()
})
