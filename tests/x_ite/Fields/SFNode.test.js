const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene,
   node    = scene .createNode ("WorldInfo")

test ("common", () =>
{
   expect (node .getType ()) .toBe (X3D .X3DConstants .SFNode)
   expect (node .getTypeName ()) .toBe ("SFNode")
   expect (Object .prototype .toString .call (node)) .toBe ("[object SFNode]")

   expect (node .getNodeTypeName ()) .toBe ("WorldInfo")
   expect (node .getNodeName ()) .toBe ("")
   expect (node .getNodeDisplayName ()) .toBe ("")

   scene .addNamedNode ("NodeName_123", node)

   expect (node .getNodeName ()) .toBe ("NodeName_123")
   expect (node .getNodeDisplayName ()) .toBe ("NodeName")

   scene .removeNamedNode ("NodeName_123")

   expect (node .getNodeType ()) .not .toBe (node .getNodeType ())
   expect (node .getNodeType ()) .toEqual ([
      X3D .X3DConstants .X3DBaseNode,
      X3D .X3DConstants .X3DNode,
      X3D .X3DConstants .X3DChildNode,
      X3D .X3DConstants .X3DInfoNode,
      X3D .X3DConstants .WorldInfo,
   ])

   expect (node .valueOf ()) .toBe (node .valueOf ())
})

test ("copy", () =>
{
   const
      a = new X3D .SFNode (),
      b = node

   expect (a .copy () .equals (a)) .toBe (true)
   expect (b .copy () .equals (b)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new X3D .SFNode (),
      b = node

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new X3D .SFNode (),
      b = node

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("properties", () =>
{
   expect (node .metadata) .toBe (null)
   expect (node .title) .toBe ("")
   expect (node .info) .toBeInstanceOf (X3D .MFString)

   expect ("metadata" in node) .toBe (true)
   expect ("title"    in node) .toBe (true)
   expect ("info"     in node) .toBe (true)
   expect ("toString" in node) .toBe (true)
   expect ("foo"      in node) .toBe (false)

   expect (node .hasOwnProperty ("metadata")) .toBe (true)
   expect (node .hasOwnProperty ("title"))    .toBe (true)
   expect (node .hasOwnProperty ("info"))     .toBe (true)
   expect (node .hasOwnProperty ("toString")) .toBe (false)
   expect (node .hasOwnProperty ("foo"))      .toBe (false)

   const properties = [
      "metadata",
      "title",
      "info",
   ]

   enumerate (properties, node)

   expect (() => node .foo) .not .toThrow (Error)
   expect (() => node .foo = 123) .not .toThrow (Error)
})

test ("getFieldDefinition", () =>
{
   expect (node .getFieldDefinition ("metadata") .name) .toBe ("metadata")
   expect (node .getFieldDefinition ("title") .name) .toBe ("title")
   expect (node .getFieldDefinition ("info") .name) .toBe ("info")

   expect (() => node .getFieldDefinition ("foo")) .toThrow (Error)
})

test ("getFieldDefinitions", () =>
{
   const fieldDefinitions = node .getFieldDefinitions ()

   expect (fieldDefinitions) .toBeInstanceOf (X3D .FieldDefinitionArray)
   expect (fieldDefinitions) .toHaveLength (3)
   expect (fieldDefinitions [0] .name) .toBe ("metadata")
   expect (fieldDefinitions [1] .name) .toBe ("title")
   expect (fieldDefinitions [2] .name) .toBe ("info")
})

test ("getField", () =>
{
   expect (node .getField ("metadata") .getName ()) .toBe ("metadata")
   expect (node .getField ("title") .getName ()) .toBe ("title")
   expect (node .getField ("info") .getName ()) .toBe ("info")

   expect (() => node .getField ("foo")) .toThrow (Error)
})

test ("toString", () =>
{
   expect (node .toXMLString ()) .toMatch (/^<\w+\/>$/)
   expect (node .toXMLString ()) .toMatch (/^<\w+\/>$/)
   expect (node .toString ()) .toMatch (/^\w+ { }$/)
   expect (node .toString ()) .toMatch (/^\w+ { }$/)
   expect (new X3D .SFNode () .toString ()) .toBe ("NULL")
})

test ("user-data", () =>
{
   const
      field = node,
      sym   = Symbol ()

   field .setNodeUserData ("foo", 123)
   field .setNodeUserData ("bah", 234)
   field .setNodeUserData (sym,   345)

   expect (field .getNodeUserData ("foo")) .toBe (123)
   expect (field .getNodeUserData ("bah")) .toBe (234)
   expect (field .getNodeUserData (sym)) .toBe (345)

   field .removeNodeUserData ("foo")
   field .removeNodeUserData ("bah")
   field .removeNodeUserData (sym)

   expect (field .getNodeUserData ("foo")) .toBe (undefined)
   expect (field .getNodeUserData ("bah")) .toBe (undefined)
   expect (field .getNodeUserData (sym)) .toBe (undefined)
})

test ("toString", () =>
{
   const
      n1 = scene .createNode ("MetadataSet"),
      n2 = scene .createNode ("MetadataBoolean")

   expect (n1 .toString ()) .toBe ("MetadataSet { }")
   expect (n1 .toString ()) .toBe ("MetadataSet { }")
   expect (n2 .toString ()) .toBe ("MetadataBoolean { }")
   expect (n2 .toString ()) .toBe ("MetadataBoolean { }")
})

test ("toXMLString", () =>
{
   const
      n1 = scene .createNode ("MetadataSet"),
      n2 = scene .createNode ("MetadataBoolean")

   scene .addNamedNode ("N1toXMLString", n1);

   expect (n1 .toXMLString ()) .toBe ("<MetadataSet DEF='N1toXMLString'/>")
   expect (n1 .toXMLString ()) .toBe ("<MetadataSet DEF='N1toXMLString'/>")
   expect (n2 .toXMLString ()) .toBe ("<MetadataBoolean/>")
   expect (n2 .toXMLString ()) .toBe ("<MetadataBoolean/>")
})

test ("toVRMLString", () =>
{
   const
      n1 = scene .createNode ("MetadataSet"),
      n2 = scene .createNode ("MetadataBoolean")

   scene .addNamedNode ("N1toVRMLString", n1);

   expect (n1 .toVRMLString ()) .toBe ("DEF N1toVRMLString MetadataSet { }")
   expect (n1 .toVRMLString ()) .toBe ("DEF N1toVRMLString MetadataSet { }")
   expect (n2 .toVRMLString ()) .toBe ("MetadataBoolean { }")
   expect (n2 .toVRMLString ()) .toBe ("MetadataBoolean { }")
})

test ("toJSONString", () =>
{
   const
      n1 = scene .createNode ("MetadataSet"),
      n2 = scene .createNode ("MetadataBoolean")

   scene .addNamedNode ("N1toJSONString", n1);

   expect (n1 .toJSONString ({ style: "CLEAN" })) .toBe (`{"MetadataSet":{"@DEF":"N1toJSONString"}}`)
   expect (n1 .toJSONString ({ style: "CLEAN" })) .toBe (`{"MetadataSet":{"@DEF":"N1toJSONString"}}`)
   expect (n2 .toJSONString ({ style: "CLEAN" })) .toBe (`{"MetadataBoolean":{}}`)
   expect (n2 .toJSONString ({ style: "CLEAN" })) .toBe (`{"MetadataBoolean":{}}`)
})

test ("parents", () =>
{
   const
      n1 = scene .createNode ("MetadataSet"),
      n2 = scene .createNode ("MetadataBoolean")

   expect (n2 .getValue ()) .not .toBe (null)
   expect (n2 .getValue () .getParents () .size) .toBe (1)
   expect (n2 .getNodeTypeName ()) .toBe ("MetadataBoolean")

   n1 .metadata = n2

   expect (n1 .metadata) .toBe (n2)
   expect (n2 .getValue ()) .not .toBe (null)
   expect (n2 .getValue () .getParents () .size) .toBe (2)
   expect (n2 .getNodeTypeName ()) .toBe ("MetadataBoolean")

   n1 .metadata = null

   expect (n1 .metadata) .toBe (null)
   expect (n2 .getValue ()) .not .toBe (null)
   expect (n2 .getValue () .getParents () .size) .toBe (1)
   expect (n2 .getNodeTypeName ()) .toBe ("MetadataBoolean")
})

test ("dispose1", async () =>
{
   const scene = await Browser .createX3DFromString (`
PROFILE Interchange

DEF S4 Shape { }
DEF T1 Transform {
   children [
      DEF S1 Shape {
         appearance DEF A Appearance {
            material Material { }
         }
         geometry DEF B Box { }
      }
      Shape { }
   ]
}
DEF T2 Transform {
   children USE S1
}
DEF S2 Shape { }
DEF I Inline {
   url "data:model/x3d+vrml,
PROFILE Interchange

DEF S3 Shape { }

EXPORT S3
   "
}

IMPORT I.S3

EXPORT S1

ROUTE S1.appearance TO S2.appearance
   `)

   await sleep ()

   const
      shape1 = scene .getNamedNode ("S1"),
      shape3 = scene .getImportedNode ("S3"),
      shape4 = scene .getNamedNode ("S4")

   const
      sv1 = shape1 .getValue (),
      sv3 = shape3 .getValue (),
      sv4 = shape4 .getValue ();

   const
      t1 = scene .getNamedNode ("T1"),
      t2 = scene .getNamedNode ("T2"),
      s2 = scene .getNamedNode ("S2"),
      i  = scene .getNamedNode ("I")

   expect (scene .rootNodes) .toHaveLength (5)
   expect (scene .rootNodes [0]) .toBe (shape4)
   expect (scene .rootNodes [1]) .toBe (t1)
   expect (scene .rootNodes [2]) .toBe (t2)
   expect (scene .rootNodes [3]) .toBe (s2)
   expect (scene .rootNodes [4]) .toBe (i)
   expect (scene .rootNodes [0] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [1] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [2] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [3] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [4] .getValue ()) .not .toBe (null)
   expect (scene .routes) .toHaveLength (1)
   expect (scene .getNamedNodes ()) .toHaveLength (8)
   expect (scene .getImportedNodes ()) .toHaveLength (1)
   expect (scene .getExportedNodes ()) .toHaveLength (1)
   expect (shape1) .toBe (scene .getNamedNode ("S1"))
   expect (shape1 .getType ()) .toBe (X3D .X3DConstants .SFNode)
   expect (shape1 .getTypeName ()) .toBe ("SFNode")
   expect (shape1 .getNodeTypeName ()) .toBe ("Shape")
   expect (shape1 .getValue ()) .toBeInstanceOf (X3D .X3DBaseNode)
   expect (shape1) .toBe (scene .getNamedNode ("S1"))
   expect (shape3 .getType ()) .toBe (X3D .X3DConstants .SFNode)
   expect (shape3 .getTypeName ()) .toBe ("SFNode")
   expect (shape3 .getNodeTypeName ()) .toBe ("Shape")
   expect (shape3 .getValue ()) .toBeInstanceOf (X3D .X3DBaseNode)
   expect (shape3) .toBe (scene .getImportedNode ("S3"))
   expect (shape4 .getType ()) .toBe (X3D .X3DConstants .SFNode)
   expect (shape4 .getTypeName ()) .toBe ("SFNode")
   expect (shape4 .getNodeTypeName ()) .toBe ("Shape")
   expect (shape4 .getValue ()) .toBeInstanceOf (X3D .X3DBaseNode)
   expect (shape4) .toBe (scene .getNamedNode ("S4"))
   expect (scene .getNamedNode ("T1") .children) .toHaveLength (2)
   expect (scene .getNamedNode ("T2") .children) .toHaveLength (1)
   expect (scene .getNamedNode ("A") .getValue () .getParents () .size) .toBe (2)
   expect (scene .getNamedNode ("B") .getValue () .getParents () .size) .toBe (2)
   expect (shape1) .toBe (X3D .SFNodeCache .get (sv1));
   expect (shape3) .toBe (X3D .SFNodeCache .get (sv3));
   expect (shape4) .toBe (X3D .SFNodeCache .get (sv4));

   shape1 .dispose ()
   shape3 .dispose ()
   shape4 .dispose ()

   expect (scene .rootNodes) .toHaveLength (4)
   expect (scene .rootNodes [0]) .toBe (t1)
   expect (scene .rootNodes [1]) .toBe (t2)
   expect (scene .rootNodes [2]) .toBe (s2)
   expect (scene .rootNodes [3]) .toBe (i)
   expect (scene .rootNodes [0] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [1] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [2] .getValue ()) .not .toBe (null)
   expect (scene .rootNodes [3] .getValue ()) .not .toBe (null)
   expect (scene .routes) .toHaveLength (0)
   expect (scene .getNamedNodes ()) .toHaveLength (6)
   expect (scene .getImportedNodes ()) .toHaveLength (0)
   expect (scene .getExportedNodes ()) .toHaveLength (0)
   expect (shape1 .getValue ()) .toBe (null)
   expect (shape3 .getValue ()) .toBe (null)
   expect (shape4 .getValue ()) .toBe (null)
   expect (scene .getNamedNode ("T1") .children) .toHaveLength (1)
   expect (scene .getNamedNode ("T2") .children) .toHaveLength (0)
   expect (scene .getNamedNode ("A") .getValue () .getParents () .size) .toBe (1)
   expect (scene .getNamedNode ("B") .getValue () .getParents () .size) .toBe (1)
   expect (shape1) .not .toBe (X3D .SFNodeCache .get (sv1));
   expect (shape3) .not .toBe (X3D .SFNodeCache .get (sv3));
   expect (shape4) .not .toBe (X3D .SFNodeCache .get (sv4));
})

test ("dispose2", async () =>
{
   const
      scene = await Browser .createScene (),
      s1    = scene .createNode ("MetadataSet"),
      s2    = scene .createNode ("MetadataSet"),
      s3    = scene .createNode ("MetadataSet"),
      s4    = scene .createNode ("MetadataSet"),
      s5    = scene .createNode ("MetadataSet"),
      s6    = scene .createNode ("MetadataSet"),
      m1    = scene .createNode ("MetadataBoolean")

   expect (scene .rootNodes) .toHaveLength (0)

   scene .rootNodes .push (s1, s2, s3, null, m1, s4, s5, s6, s2)
   s1 .metadata = m1
   s2 .metadata = m1
   s3 .metadata = m1
   s4 .metadata = m1
   s5 .metadata = m1
   s6 .metadata = m1

   expect (scene .rootNodes) .toHaveLength (9)
   expect (scene .rootNodes [0]) .toBe (s1)
   expect (scene .rootNodes [1]) .toBe (s2)
   expect (scene .rootNodes [2]) .toBe (s3)
   expect (scene .rootNodes [3]) .toBe (null)
   expect (scene .rootNodes [4]) .toBe (m1)
   expect (scene .rootNodes [5]) .toBe (s4)
   expect (scene .rootNodes [6]) .toBe (s5)
   expect (scene .rootNodes [7]) .toBe (s6)
   expect (scene .rootNodes [8]) .toBe (s2)
   expect (s1 .metadata) .toBe (m1)
   expect (s2 .metadata) .toBe (m1)
   expect (s3 .metadata) .toBe (m1)
   expect (s4 .metadata) .toBe (m1)
   expect (s5 .metadata) .toBe (m1)
   expect (s6 .metadata) .toBe (m1)

   expect (m1 .getValue ()) .not .toBe (null)
   m1 .dispose ()
   expect (m1 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (8)
   expect (scene .rootNodes [0]) .toBe (s1)
   expect (scene .rootNodes [1]) .toBe (s2)
   expect (scene .rootNodes [2]) .toBe (s3)
   expect (scene .rootNodes [3]) .toBe (null)
   expect (scene .rootNodes [4]) .toBe (s4)
   expect (scene .rootNodes [5]) .toBe (s5)
   expect (scene .rootNodes [6]) .toBe (s6)
   expect (scene .rootNodes [7]) .toBe (s2)
   expect (s1 .metadata) .toBe (null)
   expect (s2 .metadata) .toBe (null)
   expect (s3 .metadata) .toBe (null)
   expect (s4 .metadata) .toBe (null)
   expect (s5 .metadata) .toBe (null)
   expect (s6 .metadata) .toBe (null)

   expect (s5 .getValue ()) .not .toBe (null)
   s5 .dispose ()
   expect (s5 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (7)
   expect (scene .rootNodes [0]) .toBe (s1)
   expect (scene .rootNodes [1]) .toBe (s2)
   expect (scene .rootNodes [2]) .toBe (s3)
   expect (scene .rootNodes [3]) .toBe (null)
   expect (scene .rootNodes [4]) .toBe (s4)
   expect (scene .rootNodes [5]) .toBe (s6)
   expect (scene .rootNodes [6]) .toBe (s2)

   expect (s2 .getValue ()) .not .toBe (null)
   s2 .dispose ()
   expect (s2 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (5)
   expect (scene .rootNodes [0]) .toBe (s1)
   expect (scene .rootNodes [1]) .toBe (s3)
   expect (scene .rootNodes [2]) .toBe (null)
   expect (scene .rootNodes [3]) .toBe (s4)
   expect (scene .rootNodes [4]) .toBe (s6)

   expect (s1 .getValue ()) .not .toBe (null)
   s1 .dispose ()
   expect (s1 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (4)
   expect (scene .rootNodes [0]) .toBe (s3)
   expect (scene .rootNodes [1]) .toBe (null)
   expect (scene .rootNodes [2]) .toBe (s4)
   expect (scene .rootNodes [3]) .toBe (s6)

   expect (s4 .getValue ()) .not .toBe (null)
   s4 .dispose ()
   expect (s4 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (3)
   expect (scene .rootNodes [0]) .toBe (s3)
   expect (scene .rootNodes [1]) .toBe (null)
   expect (scene .rootNodes [2]) .toBe (s6)

   expect (s3 .getValue ()) .not .toBe (null)
   s3 .dispose ()
   expect (s3 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (2)
   expect (scene .rootNodes [0]) .toBe (null)
   expect (scene .rootNodes [1]) .toBe (s6)

   expect (s6 .getValue ()) .not .toBe (null)
   s6 .dispose ()
   expect (s6 .getValue ()) .toBe (null)

   expect (scene .rootNodes) .toHaveLength (1)
   expect (scene .rootNodes [0]) .toBe (null)
})

test ("UserData", async () =>
{
   const
      scene = await Browser .createScene (),
      n     = scene .createNode ("MetadataSet")

   expect (n .getUserData ("key")) .toBe (undefined)

   n .setUserData ("key", 123)
   expect (n .getUserData ("key")) .toBe (123)

   n .removeUserData ("key")

   expect (n .getUserData ("key")) .toBe (undefined)
})

test ("NodeUserData", async () =>
{
   const
      scene = await Browser .createScene (),
      n     = scene .createNode ("MetadataSet")

   expect (n .getNodeUserData ("key")) .toBe (undefined)

   n .setNodeUserData ("key", 123)
   expect (n .getNodeUserData ("key")) .toBe (123)
   expect (n .getUserData ("key")) .toBe (undefined)

   n .removeNodeUserData ("key")

   expect (n .getNodeUserData ("key")) .toBe (undefined)

   n .dispose ()

   expect (() => n .getNodeUserData ("key")) .toThrow (Error)
   expect (() => n .setNodeUserData ("key", 123)) .toThrow (Error)
   expect (() => n .removeNodeUserData ("key")) .toThrow (Error)
})

test ("add/removeFieldCallback", () => new Promise ((resolve, reject) =>
{
   const node = Browser .currentScene .createNode ("Transform");

   expect (node .translation .getFieldCallbacks () .size) .toBe (0);

   node .addFieldCallback ("test", "translation", value =>
   {
      node .removeFieldCallback ("test", "translation");
      expect (node .translation .getFieldCallbacks () .size) .toBe (0);

      expect (value .equals (new X3D .SFVec3f (2,3,4))) .toBe (true);
      resolve ();
   });

   expect (node .translation .getFieldCallbacks () .size) .toBe (1);

   node .translation = new X3D .SFVec3f (2,3,4);
}));

test ("fromString", () =>
{
   const a = new X3D .SFNode ();

   a .fromString ("Transform { }", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (false);
   expect (a .getNodeTypeName ()) .toBe ("Transform");

   a .fromString ("NULL", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (true);

   a .fromString ("Group { }", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (false);
   expect (a .getNodeTypeName ()) .toBe ("Group");

   a .fromString ("null", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (true);

   expect (() => a .fromString ("foo")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new X3D .SFNode ();

   a .fromVRMLString ("Transform { }", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (false);
   expect (a .getNodeTypeName ()) .toBe ("Transform");

   a .fromVRMLString ("NULL", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (true);

   a .fromVRMLString ("Group { }", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (false);
   expect (a .getNodeTypeName ()) .toBe ("Group");

   a .fromVRMLString ("null", Browser .currentScene);

   expect (a .equals (new X3D .SFNode ())) .toBe (true);

   expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
});
