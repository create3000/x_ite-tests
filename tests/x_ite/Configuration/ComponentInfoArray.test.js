const X3D = require ("../../X3D")

test ("constructor", () =>
{
   const
      canvas     = X3D .createBrowser (),
      Browser    = canvas .browser,
      components = Browser .supportedComponents

   expect (components) .toHaveLength (36 + 2) // Annotation + X_ITE
   expect (components) .toBeInstanceOf (X3D .ComponentInfoArray)
   expect (components .constructor) .toBe (X3D .ComponentInfoArray)
})
