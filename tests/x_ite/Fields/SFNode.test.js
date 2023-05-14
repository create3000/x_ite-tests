const X3D = require ("../../X3D")

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene,
   node    = scene .createNode ("WorldInfo")

test ("getter", () =>
{
   expect (node .getType ()) .toBe (X3D .X3DConstants .SFNode)
   expect (node .getTypeName ()) .toBe ("SFNode")
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

   function enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   }

   const properties = [
      "metadata",
      "title",
      "info",
   ]

   enumerate (properties, node)
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

test ("toString", () =>
{
   expect (node .toXMLString ()) .toMatch (/^<\w+\/>$/)
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
