const
   $                = require ("jquery"),
   X3D              = require ("./X3D"),
   X3DCanvasElement = X3D .require ("x_ite/X3DCanvasElement"),
   DEBUG            = X3D .require ("x_ite/DEBUG")

test ("createBrowser", () =>
{
   const canvas = X3D .createBrowser ()

   expect (canvas) .toBeInstanceOf (X3DCanvasElement)
   expect (X3D .getBrowser (canvas)) .toBe (canvas .browser)
   expect (canvas .browser) .toBeInstanceOf (X3D .X3DBrowser)
})

test ("getBrowser", () =>
{
   const canvas = $(X3D .createBrowser ())

   expect (X3D .getBrowser ()) .toBe (undefined)

   $("body") .append (canvas)

   expect (X3D .getBrowser ()) .toBe (canvas [0] .browser)
   expect (X3D .getBrowser (canvas [0])) .toBe (canvas [0] .browser)
   expect (X3D .getBrowser (canvas)) .toBe (canvas [0] .browser)
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

test ("DEBUG", () =>
{
   expect (DEBUG) .toBe (false)
})
