const X3D = require ("../../X3D")

test ("constructor", () =>
{
   const
      canvas       = X3D .createBrowser (),
      Browser      = canvas .browser,
      scene        = Browser .currentScene,
      externprotos = scene .externprotos

   expect (externprotos) .toHaveLength (0)
   expect (externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (externprotos .constructor) .toBe (X3D .ExternProtoDeclarationArray)
})
