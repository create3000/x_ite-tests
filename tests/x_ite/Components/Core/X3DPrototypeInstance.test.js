const X3D = require ("../../../X3D")

test ("update", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Full

PROTO Test [
   inputOutput SFBool test true
]
{
   Transform { }
}

Test { }`))

   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes) .toBeInstanceOf (X3D .MFNode)
   expect (scene .rootNodes [0]) .toBeInstanceOf (X3D .SFNode)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .rootNodes [0]) .toBe (scene .rootNodes [0])
   expect (scene .rootNodes [0] .metadata) .toBe (null)
   expect (scene .rootNodes [0] .test) .toBe (true)
   expect (scene .protos) .toHaveLength (1)
   expect (scene .protos) .toBeInstanceOf (X3D .ProtoDeclarationArray)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")

   scene .rootNodes [0] .getValue () .update ()

   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .rootNodes [0] .metadata) .toBe (null)
   expect (scene .rootNodes [0] .test) .toBe (true)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
})
