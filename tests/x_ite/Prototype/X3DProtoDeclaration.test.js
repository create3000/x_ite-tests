
const X3D = require ("../../X3D");

test ("properties", async () =>
{
   const
      canvas  = X3D .createBrowser (),
      Browser = canvas .browser,
      scene   = await Browser .createX3DFromURL (new X3D .MFString (`data:model/x3d+vrml,
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
}

Test { }
`));

   expect (scene .protos) .toHaveLength (1);

   const proto = scene .protos [0];

   expect (proto) .toBeInstanceOf (X3D .X3DProtoDeclaration);
   expect (proto .constructor) .toBe (X3D .X3DProtoDeclaration);
   expect (proto .name) .toBe ("Test");
   expect (proto .isExternProto) .toBe (false);
   expect (proto .appInfo) .toBe ("");
   expect (proto .documentation) .toBe ("");
   expect (proto .fields) .toBeInstanceOf (X3D .FieldDefinitionArray);
   expect (proto .fields) .toHaveLength (2);
   expect (proto .fields [0]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (proto .fields [0] .accessType) .toBe (X3D .X3DConstants .inputOutput);
   expect (proto .fields [0] .dataType) .toBe (X3D .X3DConstants .SFNode);
   expect (proto .fields [0] .name) .toBe ("metadata");
   expect (proto .fields [0] .value) .toBe (null);
   expect (proto .fields [1]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (proto .fields [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly);
   expect (proto .fields [1] .dataType) .toBe (X3D .X3DConstants .SFVec3f);
   expect (proto .fields [1] .name) .toBe ("size");
   expect (proto .fields [1] .value) .toBeInstanceOf (X3D .SFVec3f);
   expect (proto .getName ()) .toBe (proto .name);

   expect (X3D .X3DProtoDeclaration .typeName) .toBe ("X3DProtoDeclaration");
   expect (proto .getTypeName ()) .toBe ("X3DProtoDeclaration");
   expect (Object .prototype .toString .call (proto)) .toBe (`[object X3DProtoDeclaration]`);
   expect (proto .toString ()) .toBe (`[object ${proto .getTypeName ()}]`);

   proto .name = undefined;
   proto .isExternProto = undefined;
   proto .appInfo = undefined;
   proto .documentation = undefined;
   proto .fields = undefined;

   expect (proto .name) .toBe ("Test");
   expect (proto .isExternProto) .toBe (false);
   expect (proto .appInfo) .toBe ("undefined");
   expect (proto .documentation) .toBe ("undefined");
   expect (proto .fields) .toBeInstanceOf (X3D .FieldDefinitionArray);
   expect (proto .fields) .toHaveLength (2);
   expect (proto .fields [0]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (proto .fields [0] .accessType) .toBe (X3D .X3DConstants .inputOutput);
   expect (proto .fields [0] .dataType) .toBe (X3D .X3DConstants .SFNode);
   expect (proto .fields [0] .name) .toBe ("metadata");
   expect (proto .fields [0] .value) .toBe (null);
   expect (proto .fields [1]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (proto .fields [1] .accessType) .toBe (X3D .X3DConstants .initializeOnly);
   expect (proto .fields [1] .dataType) .toBe (X3D .X3DConstants .SFVec3f);
   expect (proto .fields [1] .name) .toBe ("size");
   expect (proto .fields [1] .value) .toBeInstanceOf (X3D .SFVec3f);

   const instance = proto .newInstance ();

   expect (instance) .toBeInstanceOf (X3D .SFNode);
   expect (instance .getValue ()) .toBeInstanceOf (X3D .X3DPrototypeInstance);
   expect (instance .getValue () .isInitialized ()) .toBe (true);
   expect (instance .getNodeTypeName ()) .toBe ("Test");

   const body = instance .getValue () .getBody ();

   expect (body .rootNodes) .toHaveLength (2);
   expect (body .protos) .toHaveLength (0);
   expect (body .externprotos) .toHaveLength (0);
   expect (body .routes) .toHaveLength (1);

   const properties = [
      "name",
      "isExternProto",
      "fields",
      "appInfo",
      "documentation",
   ]

   enumerate (properties, proto);
});
