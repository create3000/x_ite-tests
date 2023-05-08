
const X3D = require ("../../X3D")

test ("properties", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

EXTERNPROTO Test [
   initializeOnly SFVec3f size
]
"data:model/x3d+vrml,

PROFILE Interactive

PROTO Test [
   initializeOnly SFVec3f size 2 2 2
]
{
   DEF I PositionInterpolator { }

   DEF T Transform {
      children Shape {
         geometry Box {
            size IS size
         }
      }
   }

   ROUTE I.value_changed TO T.set_translation
}"

Test { }
`))

   expect (scene .externprotos) .toHaveLength (1)

   const externproto = scene .externprotos [0]

   expect (externproto) .toBeInstanceOf (X3D .X3DExternProtoDeclaration)
   expect (externproto .name) .toBe ("Test")
   expect (externproto .isExternProto) .toBe (true)
   expect (externproto .fields) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (externproto .fields) .toHaveLength (2)
   expect (externproto .fields [0]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (externproto .fields [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (externproto .fields [0] .name) .toBe ("metadata")
   expect (externproto .fields [1]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly)
   expect (externproto .fields [1] .dataType) .toBe (X3D .X3DConstants .SFVec3f)
   expect (externproto .fields [1] .name) .toBe ("size")

   externproto .name = undefined
   externproto .isExternProto = undefined
   externproto .fields = undefined

   expect (externproto .name) .toBe ("Test")
   expect (externproto .isExternProto) .toBe (true)
   expect (externproto .fields) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (externproto .fields) .toHaveLength (2)
   expect (externproto .fields [0]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (externproto .fields [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (externproto .fields [0] .name) .toBe ("metadata")
   expect (externproto .fields [1]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly)
   expect (externproto .fields [1] .dataType) .toBe (X3D .X3DConstants .SFVec3f)
   expect (externproto .fields [1] .name) .toBe ("size")

   const instance = externproto .newInstance ()

   expect (instance) .toBeInstanceOf (X3D .SFNode)
   expect (instance .getNodeTypeName ()) .toBe ("Test")

   const body = instance .getValue () .getBody ()

   expect (body .rootNodes) .toHaveLength (2)
   expect (body .protos) .toHaveLength (0)
   expect (body .externprotos) .toHaveLength (0)
   expect (body .routes) .toHaveLength (1)
})
