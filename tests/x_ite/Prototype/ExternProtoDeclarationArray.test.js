const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("constructor", () =>
{
   const
      scene        = Browser .currentScene,
      externprotos = scene .externprotos

   expect (externprotos) .toHaveLength (0)
   expect (externprotos) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (externprotos .constructor) .toBe (X3D .ExternProtoDeclarationArray)
})

test ("filter", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

EXTERNPROTO E0 [ ] [ ]
EXTERNPROTO E1 [ ] [ ]
EXTERNPROTO E2 [ ] [ ]
EXTERNPROTO E3 [ ] [ ]
   `)

   const externprotos = scene .externprotos

   const a = externprotos .filter (p => p .name .match (/[01]$/))

   expect (a) .not .toBe (externprotos)
   expect (a) .toBeInstanceOf (X3D .ExternProtoDeclarationArray)
   expect (a) .toHaveLength (2)

   expect (a [0] .name) .toBe ("E0")
   expect (a [1] .name) .toBe ("E1")
})

test ("toString", () =>
{
   const
      scene        = Browser .currentScene,
      externprotos = scene .externprotos

   expect (X3D .ExternProtoDeclarationArray .typeName) .toBe ("ExternProtoDeclarationArray")
   expect (externprotos .getTypeName ()) .toBe ("ExternProtoDeclarationArray")
   expect (Object .prototype .toString .call (externprotos)) .toBe (`[object ExternProtoDeclarationArray]`)
   expect (externprotos .toString ()) .toBe (`[object ${externprotos .getTypeName ()}]`)
})
