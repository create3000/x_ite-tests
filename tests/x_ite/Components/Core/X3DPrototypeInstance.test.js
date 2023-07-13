const X3D = require ("../../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("update", async () =>
{
   const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interchange

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

   const rootNodes = scene .rootNodes [0] .getValue () .getBody () .rootNodes

   scene .rootNodes [0] .getValue () .update ()

   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .rootNodes [0] .metadata) .toBe (null)
   expect (scene .rootNodes [0] .test) .toBe (true)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes) .not .toBe (rootNodes)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes [0]) .not .toBe (rootNodes [0])
})

test ("static-properties", () =>
{
   const X3DPrototypeInstance = Browser .getAbstractNode ("X3DPrototypeInstance")

   expect (X3DPrototypeInstance .typeName) .toBe ("X3DPrototypeInstance")
   expect (X3DPrototypeInstance .componentName) .toBe ("Core")
   expect (X3DPrototypeInstance .containerField) .toBe ("children")
   expect (X3DPrototypeInstance .specificationRange) .toBeInstanceOf (Array)
   expect (() => X3DPrototypeInstance .specificationRange .sort ()) .toThrow (Error)
   expect (X3DPrototypeInstance .fieldDefinitions) .toBe (undefined)
})
