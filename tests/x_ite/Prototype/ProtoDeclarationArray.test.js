const X3D = require ("../../X3D")

test ("constructor", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .currentScene,
      protos  = scene .protos

   expect (protos) .toHaveLength (0)
   expect (protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (protos .constructor) .toBe (X3D .ProtoDeclarationArray)
})

test ("toString", () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = Browser .currentScene,
      protos  = scene .protos

   expect (protos .toString ()) .toBe (`[object ${protos .getTypeName ()}]`)
})
