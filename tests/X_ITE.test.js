const X3D = require ("./X3D")

test ("constructor", () =>
{
   const canvas = X3D .createBrowser ()

   expect (canvas instanceof HTMLElement) .toBe (true)
   expect (canvas .browser instanceof Object) .toBe (true)
})
