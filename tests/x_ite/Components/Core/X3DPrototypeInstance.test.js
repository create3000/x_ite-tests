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
   expect (scene .rootNodes [0] .getFieldDefinitions ()) .toHaveLength (2)
   expect (scene .rootNodes [0] .getFieldDefinitions () [0] .value .getValue ()) .toBe (null)
   expect (scene .rootNodes [0] .getFieldDefinitions () [1] .value .getValue ()) .toBe (true)

   const rootNodes = scene .rootNodes [0] .getValue () .getBody () .rootNodes

   scene .rootNodes [0] .getValue () .update ()

   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .rootNodes [0] .metadata) .toBe (null)
   expect (scene .rootNodes [0] .test) .toBe (true)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes) .not .toBe (rootNodes)
   expect (scene .rootNodes [0] .getValue () .getBody () .rootNodes [0]) .not .toBe (rootNodes [0])
   expect (scene .rootNodes [0] .getFieldDefinitions ()) .toHaveLength (2)
   expect (scene .rootNodes [0] .getFieldDefinitions () [0] .value .getValue ()) .toBe (null)
   expect (scene .rootNodes [0] .getFieldDefinitions () [1] .value .getValue ()) .toBe (true)
})

test ("setProtoNode", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

PROTO Test1 [
   inputOutput SFInt32 test1 123
]
{
   Transform { }
}

PROTO Test2 [
   inputOutput SFInt32 test2 456
]
{
   Group { }
}

Test1 { }`)

   const
      proto1   = scene .protos [0],
      proto2   = scene .protos [1],
      instance = scene .rootNodes [0] .getValue ()

   expect (instance .getTypeName ()) .toBe ("Test1")
   expect (instance .getField ("test1") .getValue ()) .toBe (123)
   expect (instance .getFieldDefinitions ()) .toHaveLength (2)
   expect (instance .getFieldDefinitions () [0] .name) .toBe ("metadata")
   expect (instance .getFieldDefinitions () [1] .name) .toBe ("test1")
   expect (instance .getFieldDefinitions () [0] .value .getValue ()) .toBe (null)
   expect (instance .getFieldDefinitions () [1] .value .getValue ()) .toBe (123)
   expect (instance .getBody () .rootNodes) .toHaveLength (1)
   expect (instance .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")

   instance .setProtoNode (proto2)

   expect (instance .getTypeName ()) .toBe ("Test2")
   expect (instance .getField ("test2") .getValue ()) .toBe (456)
   expect (() => instance .getField ("test1")) .toThrow (Error)
   expect (instance .getFieldDefinitions ()) .toHaveLength (2)
   expect (instance .getFieldDefinitions () [0] .name) .toBe ("metadata")
   expect (instance .getFieldDefinitions () [1] .name) .toBe ("test2")
   expect (instance .getFieldDefinitions () [0] .value .getValue ()) .toBe (null)
   expect (instance .getFieldDefinitions () [1] .value .getValue ()) .toBe (456)
   expect (instance .getBody () .rootNodes) .toHaveLength (1)
   expect (instance .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Group")

   instance .setProtoNode (proto1)

   expect (instance .getTypeName ()) .toBe ("Test1")
   expect (instance .getField ("test1") .getValue ()) .toBe (123)
   expect (() => instance .getField ("test2")) .toThrow (Error)
   expect (instance .getFieldDefinitions ()) .toHaveLength (2)
   expect (instance .getFieldDefinitions () [0] .name) .toBe ("metadata")
   expect (instance .getFieldDefinitions () [1] .name) .toBe ("test1")
   expect (instance .getFieldDefinitions () [0] .value .getValue ()) .toBe (null)
   expect (instance .getFieldDefinitions () [1] .value .getValue ()) .toBe (123)
   expect (instance .getBody () .rootNodes) .toHaveLength (1)
   expect (instance .getBody () .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform")
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
