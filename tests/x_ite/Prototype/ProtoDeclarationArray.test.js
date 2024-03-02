const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("constructor", () =>
{
   const
      scene  = Browser .currentScene,
      protos = scene .protos

   expect (protos) .toHaveLength (0)
   expect (protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (protos .constructor) .toBe (X3D .ProtoDeclarationArray)
})

test ("filter", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

PROTO P0 [ ] { }
PROTO P1 [ ] { }
PROTO P2 [ ] { }
PROTO P3 [ ] { }
   `)

   const protos = scene .protos

   const a = protos .filter (p => p .name .match (/[01]$/))

   expect (a) .not .toBe (protos)
   expect (a) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (a) .toHaveLength (2)

   expect (a [0] .name) .toBe ("P0")
   expect (a [1] .name) .toBe ("P1")
})

test ("toString", () =>
{
   const
      scene  = Browser .currentScene,
      protos = scene .protos

   expect (X3D .ProtoDeclarationArray .typeName) .toBe ("ProtoDeclarationArray")
   expect (protos .getTypeName ()) .toBe ("ProtoDeclarationArray")
   expect (Object .prototype .toString .call (protos)) .toBe (`[object ProtoDeclarationArray]`)
   expect (protos .toString ()) .toBe (`[object ${protos .getTypeName ()}]`)
})
