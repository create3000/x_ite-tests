
const
   path = require ("path"),
   url  = require ("url")

const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser

test ("properties", async () =>
{
   const scene = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
PROFILE Interactive

EXTERNPROTO Test [
   initializeOnly SFVec3f size
]
"data:model/x3d+vrml,

PROFILE Interactive

PROTO TestProto [
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
Test { size 4 4 4 }
`))

   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test");
   expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("Test");
   expect (scene .rootNodes [0] .size .equals (new X3D .SFVec3f (2,2,2))) .toBe (true);
   expect (scene .rootNodes [1] .size .equals (new X3D .SFVec3f (4,4,4))) .toBe (true);

   expect (scene .externprotos) .toHaveLength (1)

   const externproto = scene .externprotos [0]

   expect (externproto) .toBeInstanceOf (X3D .X3DExternProtoDeclaration)
   expect (externproto .constructor) .toBe (X3D .X3DExternProtoDeclaration)
   expect (externproto .name) .toBe ("Test")
   expect (externproto .loadState) .toBe (X3D .X3DConstants .COMPLETE_STATE)
   expect (externproto .isExternProto) .toBe (true)
   expect (externproto .urls) .toBeInstanceOf (X3D .MFString)
   expect (externproto .appInfo) .toBe ("")
   expect (externproto .documentation) .toBe ("")
   expect (externproto .fields) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (externproto .fields) .toHaveLength (2)
   expect (externproto .fields [0]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (externproto .fields [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (externproto .fields [0] .name) .toBe ("metadata")
   expect (externproto .fields [0] .value) .toBe (null)
   expect (externproto .fields [1]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly)
   expect (externproto .fields [1] .dataType) .toBe (X3D .X3DConstants .SFVec3f)
   expect (externproto .fields [1] .name) .toBe ("size")
   expect (externproto .fields [1] .value) .toBeInstanceOf (X3D .SFVec3f)
   expect (externproto .getName ()) .toBe (externproto .name)

   expect (X3D .X3DExternProtoDeclaration .typeName) .toBe ("X3DExternProtoDeclaration")
   expect (externproto .getTypeName ()) .toBe ("X3DExternProtoDeclaration")
   expect (Object .prototype .toString .call (externproto)) .toBe (`[object X3DExternProtoDeclaration]`)
   expect (externproto .toString ()) .toBe (`[object ${externproto .getTypeName ()}]`)

   externproto .name = undefined
   externproto .loadState = undefined
   externproto .isExternProto = undefined
   externproto .urls = undefined
   externproto .appInfo = undefined
   externproto .documentation = undefined
   externproto .fields = undefined

   expect (externproto .name) .toBe ("Test")
   expect (externproto .loadState) .toBe (X3D .X3DConstants .COMPLETE_STATE)
   expect (externproto .isExternProto) .toBe (true)
   expect (externproto .urls) .toBeInstanceOf (X3D .MFString)
   expect (externproto .appInfo) .toBe ("")
   expect (externproto .documentation) .toBe ("")
   expect (externproto .fields) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (externproto .fields) .toHaveLength (2)
   expect (externproto .fields [0]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [0] .accessType) .toBe (X3D .X3DConstants .inputOutput)
   expect (externproto .fields [0] .dataType) .toBe (X3D .X3DConstants .SFNode)
   expect (externproto .fields [0] .name) .toBe ("metadata")
   expect (externproto .fields [0] .value) .toBe (null)
   expect (externproto .fields [1]) .toBeInstanceOf (X3D .X3DFieldDefinition)
   expect (externproto .fields [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly)
   expect (externproto .fields [1] .dataType) .toBe (X3D .X3DConstants .SFVec3f)
   expect (externproto .fields [1] .name) .toBe ("size")
   expect (externproto .fields [1] .value) .toBeInstanceOf (X3D .SFVec3f)

   const instance = externproto .newInstance ()

   expect (instance) .toBeInstanceOf (X3D .SFNode)
   expect (instance .getNodeTypeName ()) .toBe ("Test")

   const body = instance .getValue () .getBody ()

   expect (body .rootNodes) .toHaveLength (2)
   expect (body .protos) .toHaveLength (0)
   expect (body .externprotos) .toHaveLength (0)
   expect (body .routes) .toHaveLength (1)

   const properties = [
      "name",
      "loadState",
      "isExternProto",
      "urls",
      "fields",
      "appInfo",
      "documentation",
   ]

   enumerate (properties, externproto)
})

test ("toString", () =>
{
   const
      scene  = Browser .currentScene,
      protos = scene .protos

   expect (protos .toString ()) .toBe (`[object ${protos .getTypeName ()}]`)
})

test ("load-not-started", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Core

EXTERNPROTO Test [
   inputOutput SFBool test
]
"${url .pathToFileURL (path .join (__dirname, "files", "proto.x3d"))}"
`)

   expect (scene .rootNodes) .toHaveLength (0)
   expect (scene .externprotos [0] .loadState) .toBe (X3D .X3DConstants .NOT_STARTED_STATE)
   expect (scene .externprotos [0] .checkLoadState ()) .toBe (X3D .X3DConstants .NOT_STARTED_STATE)
})

test ("load-complete", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Core

EXTERNPROTO Test [
   inputOutput SFBool test
]
"${url .pathToFileURL (path .join (__dirname, "files", "proto.x3d"))}"

Test { }
`)

   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .externprotos [0] .loadState) .toBe (X3D .X3DConstants .COMPLETE_STATE)
   expect (scene .externprotos [0] .checkLoadState ()) .toBe (X3D .X3DConstants .COMPLETE_STATE)
})

test ("load-failed", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Core

EXTERNPROTO Test [
   inputOutput SFBool test
]
"does/not/exists.x3d"

Test { }`)

   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Test")
   expect (scene .externprotos [0] .loadState) .toBe (X3D .X3DConstants .FAILED_STATE)
   expect (scene .externprotos [0] .checkLoadState ()) .toBe (X3D .X3DConstants .FAILED_STATE)
})
