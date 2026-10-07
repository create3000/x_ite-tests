import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser;

test .concurrent ("properties", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF I Inline {
   url "data:model/x3d+vrml,
PROFILE Interchange

DEF E1 Group { }
DEF E2 Switch { }

EXPORT E1
EXPORT E2
   "
}

IMPORT I.E1 AS I1
IMPORT I.E2 AS I2 DESCRIPTION "Test Desc"
   `);

   const importedNode0 = scene .importedNodes [0];

   expect (importedNode0) .toBeInstanceOf (X3D .X3DImportedNode);
   expect (importedNode0 .constructor) .toBe (X3D .X3DImportedNode);
   expect (importedNode0 .inlineNode) .toBe (scene .getNamedNode ("I"));
   expect (importedNode0 .exportedName) .toBe ("E1");
   expect (importedNode0 .exportedNode) .toBeInstanceOf (X3D .SFNode);
   expect (importedNode0 .exportedNode .getNodeTypeName ()) .toBe ("Group");
   expect (importedNode0 .exportedNode .getNodeName ()) .toBe ("E1");
   expect (importedNode0 .importedName) .toBe ("I1");
   expect (importedNode0 .instance) .toBeInstanceOf (X3D .SFNode);
   expect (importedNode0 .instance .getNodeTypeName ()) .toBe ("Group");
   expect (importedNode0 .instance .getNodeName ()) .toBe ("I1");
   expect (importedNode0 .description) .toBe ("");
   expect (importedNode0 .getInlineNode ()) .toBe (importedNode0 .inlineNode .getValue ());
   expect (importedNode0 .getExportedName ()) .toBe (importedNode0 .exportedName);
   expect (importedNode0 .getExportedNode ()) .toBeInstanceOf (X3D .Group);
   expect (importedNode0 .getImportedName ()) .toBe (importedNode0 .importedName);
   expect (importedNode0 .getInstance ()) .toBeInstanceOf (X3D .X3DImportedNodeInstance);
   expect (importedNode0 .getDescription ()) .toBe ("");

   expect (X3D .X3DImportedNode .typeName) .toBe ("X3DImportedNode");
   expect (importedNode0 .getTypeName ()) .toBe ("X3DImportedNode");
   expect (Object .prototype .toString .call (importedNode0)) .toBe (`[object X3DImportedNode]`);
   expect (importedNode0 .toString ()) .toBe (`[object ${importedNode0 .getTypeName ()}]`);

   expect (() => importedNode0 .inlineNode   = undefined) .toThrow (Error);
   expect (() => importedNode0 .exportedName = undefined) .toThrow (Error);
   expect (() => importedNode0 .exportedNode = undefined) .toThrow (Error);
   expect (() => importedNode0 .importedName = undefined) .toThrow (Error);
   expect (() => importedNode0 .instance     = undefined) .toThrow (Error);

   expect (importedNode0) .toBeInstanceOf (X3D .X3DImportedNode);
   expect (importedNode0 .inlineNode) .toBe (scene .getNamedNode ("I"));
   expect (importedNode0 .exportedName) .toBe ("E1");
   expect (importedNode0 .exportedNode) .toBeInstanceOf (X3D .SFNode);
   expect (importedNode0 .exportedNode .getNodeTypeName ()) .toBe ("Group");
   expect (importedNode0 .importedName) .toBe ("I1");
   expect (importedNode0 .instance) .toBeInstanceOf (X3D .SFNode);
   expect (importedNode0 .instance .getNodeTypeName ()) .toBe ("Group");

   const properties = [
      "inlineNode",
      "exportedName",
      "exportedNode",
      "importedName",
      "instance",
      "description",
   ];

   enumerate (properties, importedNode0);

   const importedNode1 = scene .importedNodes [1];

   expect (importedNode1) .toBeInstanceOf (X3D .X3DImportedNode);
   expect (importedNode1 .constructor) .toBe (X3D .X3DImportedNode);
   expect (importedNode1 .inlineNode) .toBe (scene .getNamedNode ("I"));
   expect (importedNode1 .exportedName) .toBe ("E2");
   expect (importedNode1 .exportedNode) .toBeInstanceOf (X3D .SFNode);
   expect (importedNode1 .exportedNode .getNodeTypeName ()) .toBe ("Switch");
   expect (importedNode1 .importedName) .toBe ("I2");
   expect (importedNode1 .instance) .toBeInstanceOf (X3D .SFNode);
   expect (importedNode1 .instance .getNodeTypeName ()) .toBe ("Switch");
   expect (importedNode1 .description) .toBe ("Test Desc");
   expect (importedNode1 .getInlineNode ()) .toBe (importedNode1 .inlineNode .getValue ());
   expect (importedNode1 .getExportedName ()) .toBe (importedNode1 .exportedName);
   expect (importedNode1 .getExportedNode ()) .toBe (importedNode1 .exportedNode .getValue ());
   expect (importedNode1 .getImportedName ()) .toBe (importedNode1 .importedName);
   expect (importedNode1 .getInstance ()) .toBe (importedNode1 .instance .getValue ());
   expect (importedNode1 .getDescription ()) .toBe ("Test Desc");
});

test .concurrent ("proto", async () =>
{
   const scene = await Browser .createX3DFromString (`
#X3D V4.1 utf8

PROFILE Interchange

COMPONENT Core : 2
COMPONENT Networking : 2

PROTO Test [ ]
{
  DEF I Inline {
    load FALSE
  }

  DEF T Transform { }

  USE IM

  IMPORT I.IM

  ROUTE IM.some_field TO T.set_translation
}

Test { }
   `);

   expect (scene .rootNodes) .toHaveLength (1);

   const body = scene .rootNodes [0] .getValue () .getBody ();

   expect (body .namedNodes) .toHaveLength (2);
   expect (body .rootNodes) .toHaveLength (3);
   expect (body .importedNodes) .toHaveLength (1);
   expect (body .routes) .toHaveLength (1);
});

test .concurrent ("dispose 1", async () =>
{
   const scene = await Browser .createX3DFromString (`
#X3D V4.1 utf8 X_ITE V16.1.0

PROFILE Interactive

DEF I Inline {
  load FALSE
}

DEF T Transform { }
USE IM

IMPORT I.IM

ROUTE IM.some_field TO T.set_translation
   `);

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (1);
   expect (scene .rootNodes) .toHaveLength (3);
   expect (scene .routes) .toHaveLength (1);

   scene .rootNodes [0] .dispose ();

   expect (scene .namedNodes) .toHaveLength (1);
   expect (scene .importedNodes) .toHaveLength (0);
   expect (scene .rootNodes) .toHaveLength (1);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Transform");
   expect (scene .routes) .toHaveLength (0);
});

test .concurrent ("dispose 2", async () =>
{
   const scene = await Browser .createX3DFromString (`
#X3D V4.1 utf8 X_ITE V16.1.0

PROFILE Interactive

DEF I Inline {
  load FALSE
}

DEF T Transform { }
USE IM

IMPORT I.IM

ROUTE IM.some_field TO T.set_translation
   `);

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (1);
   expect (scene .rootNodes) .toHaveLength (3);
   expect (scene .routes) .toHaveLength (1);

   scene .removeImportedNode ("IM");

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (0);
   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Inline");
   expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("Transform");
   expect (scene .routes) .toHaveLength (0);
});

test .concurrent ("dispose 3", async () =>
{
   const scene = await Browser .createX3DFromString (`
#X3D V4.1 utf8 X_ITE V16.1.0

PROFILE Interactive

DEF I Inline {
  load FALSE
}

DEF T Transform { }
USE IM

IMPORT I.IM

ROUTE IM.some_field TO T.set_translation
   `);

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (1);
   expect (scene .rootNodes) .toHaveLength (3);
   expect (scene .routes) .toHaveLength (1);

   scene .rootNodes [2] .dispose ();

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (1);
   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Inline");
   expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("Transform");
   expect (scene .routes) .toHaveLength (0);
});

test .concurrent ("dispose 4", async () =>
{
   const scene = await Browser .createX3DFromString (`
#X3D V4.1 utf8 X_ITE V16.1.0

PROFILE Interactive

DEF I Inline {
  load FALSE
}

DEF T Transform { }
USE IM

IMPORT I.IM

ROUTE IM.some_field TO T.set_translation
   `);

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (1);
   expect (scene .rootNodes) .toHaveLength (3);
   expect (scene .routes) .toHaveLength (1);

   scene .importedNodes [0] .dispose ();

   expect (scene .namedNodes) .toHaveLength (2);
   expect (scene .importedNodes) .toHaveLength (0);
   expect (scene .rootNodes) .toHaveLength (2);
   expect (scene .rootNodes [0] .getNodeTypeName ()) .toBe ("Inline");
   expect (scene .rootNodes [1] .getNodeTypeName ()) .toBe ("Transform");
   expect (scene .routes) .toHaveLength (0);
});
