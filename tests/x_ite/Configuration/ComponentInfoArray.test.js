const X3D = require ("../../X3D")

test ("constructor", () =>
{
   const
      canvas     = X3D .createBrowser (),
      Browser    = canvas .browser,
      components = Browser .supportedComponents

   expect (components .length) .toBeGreaterThan (0)
   expect (components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (components .constructor) .toBe (X3D .ComponentInfoArray)
})
