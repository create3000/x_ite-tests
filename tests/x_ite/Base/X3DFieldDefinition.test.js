const
   X3D    = require ("../../X3D"),
   Fields = X3D .Fields;

const
   canvas           = X3D .createBrowser (),
   Browser          = canvas .browser,
   scene            = Browser .currentScene,
   node             = scene .createNode ("WorldInfo"),
   fieldDefinitions = node .getFieldDefinitions ();

test ("properties", () =>
{
   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray);
   expect (fieldDefinitions .constructor) .toBe (X3D .FieldDefinitionArray);
   expect (fieldDefinitions) .toHaveLength (3);

   expect (fieldDefinitions [0]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (fieldDefinitions [0] .constructor) .toBe (X3D .X3DFieldDefinition);
   expect (fieldDefinitions [0] .accessType) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [0] .dataType) .toBe (X3D .X3DConstants .SFNode);
   expect (fieldDefinitions [0] .name) .toBe ("metadata");
   expect (fieldDefinitions [0] .value) .toBe (null);

   expect (fieldDefinitions [1]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (fieldDefinitions [1] .constructor) .toBe (X3D .X3DFieldDefinition);
   expect (fieldDefinitions [1] .accessType) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [1] .dataType) .toBe (X3D .X3DConstants .SFString);
   expect (fieldDefinitions [1] .name) .toBe ("title");
   expect (fieldDefinitions [1] .value) .toBe ("");

   expect (fieldDefinitions [2]) .toBeInstanceOf (X3D .X3DFieldDefinition);
   expect (fieldDefinitions [2] .constructor) .toBe (X3D .X3DFieldDefinition);
   expect (fieldDefinitions [2] .accessType) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [2] .dataType) .toBe (X3D .X3DConstants .MFString);
   expect (fieldDefinitions [2] .name) .toBe ("info");
   expect (fieldDefinitions [2] .value) .toBeInstanceOf (X3D .MFString);

   fieldDefinitions [0] .accessType = undefined;
   fieldDefinitions [0] .dataType = undefined;
   fieldDefinitions [0] .name = undefined;
   fieldDefinitions [0] .value = undefined;

   expect (fieldDefinitions [0] .accessType) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [0] .dataType) .toBe (X3D .X3DConstants .SFNode);
   expect (fieldDefinitions [0] .name) .toBe ("metadata");
   expect (fieldDefinitions [0] .value) .toBe (null);

   const properties = [
      "accessType",
      "dataType",
      "name",
      "appInfo",
      "documentation",
   ];

   enumerate (properties, fieldDefinitions [0]);
});

test ("SAI", () =>
{
   expect (fieldDefinitions [0] .getAccessType ()) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [0] .getDataType ()) .toBe (X3D .X3DConstants .SFNode);
   expect (fieldDefinitions [0] .getName ()) .toBe ("metadata");
   expect (fieldDefinitions [0] .getValue ()) .toBeInstanceOf (X3D .SFNode);

   expect (fieldDefinitions [1] .getAccessType ()) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [1] .getDataType ()) .toBe (X3D .X3DConstants .SFString);
   expect (fieldDefinitions [1] .getName ()) .toBe ("title");
   expect (fieldDefinitions [1] .getValue ()) .toBeInstanceOf (X3D .SFString);

   expect (fieldDefinitions [2] .getAccessType ()) .toBe (X3D .X3DConstants .inputOutput);
   expect (fieldDefinitions [2] .getDataType ()) .toBe (X3D .X3DConstants .MFString);
   expect (fieldDefinitions [2] .getName ()) .toBe ("info");
   expect (fieldDefinitions [2] .getValue ()) .toBeInstanceOf (X3D .MFString);
});

test ("toString", () =>
{
   expect (X3D .X3DFieldDefinition .typeName) .toBe ("X3DFieldDefinition");
   expect (fieldDefinitions [0] .getTypeName ()) .toBe ("X3DFieldDefinition");
   expect (Object .prototype .toString .call (fieldDefinitions [0])) .toBe (`[object X3DFieldDefinition]`);
   expect (fieldDefinitions [0] .toString ()) .toBe (`[object ${fieldDefinitions [0] .getTypeName ()}]`);
});
