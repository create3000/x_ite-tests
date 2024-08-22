const
   X3D    = require ("../../X3D"),
   MFNode = X3D .MFNode

const
   canvas  = X3D .createBrowser (),
   Browser = canvas .browser,
   scene   = Browser .currentScene,
   node1   = scene .createNode ("WorldInfo"),
   node2   = scene .createNode ("WorldInfo"),
   node3   = scene .createNode ("WorldInfo"),
   node4   = scene .createNode ("WorldInfo"),
   node5   = scene .createNode ("WorldInfo"),
   node6   = scene .createNode ("WorldInfo"),
   node7   = scene .createNode ("WorldInfo")

scene .addNamedNode ("1", node1)
scene .addNamedNode ("2", node2)
scene .addNamedNode ("3", node3)
scene .addNamedNode ("4", node4)
scene .addNamedNode ("5", node5)
scene .addNamedNode ("6", node6)
scene .addNamedNode ("7", node7)

test ("constructor", () =>
{
   const
      field1 = new MFNode (),
      field2 = new MFNode (node1),
      field3 = new MFNode (node1, node2)

   expect (field1) .toHaveLength (0)
   expect (field1 [0]) .toBe (null)
   expect (field1) .toHaveLength (1)

   expect (field2) .toHaveLength (1)
   expect (field2 [0]) .toBe (node1)

   expect (field3) .toHaveLength (2)
   expect (field3 [0]) .toBe (node1)
   expect (field3 [1]) .toBe (node2)
})

test ("set1Value", () =>
{
   const field = new MFNode ()

   field [0] = node1

   expect (field) .toHaveLength (1)
   expect (field [0]) .toBe (node1)

   field [1] = node2

   expect (field) .toHaveLength (2)
   expect (field [0]) .toBe (node1)
   expect (field [1]) .toBe (node2)

   field .setValue ([ ])

   expect (field) .toHaveLength (0)
})

test ("setValue", () =>
{
   const field = new MFNode ()

   field .setValue ([node1])

   expect (field) .toHaveLength (1)
   expect (field [0]) .toBe (node1)

   field .setValue ([node1, node2])

   expect (field) .toHaveLength (2)
   expect (field [0]) .toBe (node1)
   expect (field [1]) .toBe (node2)

   field .setValue ([ ])

   expect (field) .toHaveLength (0)

   field .setValue ([node1 .getValue (), node2 .getValue ()])

   expect (field) .toHaveLength (2)
   expect (field [0]) .toBe (node1)
   expect (field [1]) .toBe (node2)
})

test ("assign", () =>
{
   const field = new MFNode ()

   field .assign (new MFNode (node1))

   expect (field) .toHaveLength (1)
   expect (field [0]) .toBe (node1)

   field .assign (new MFNode (node1, node2))

   expect (field) .toHaveLength (2)
   expect (field [0]) .toBe (node1)
   expect (field [1]) .toBe (node2)

   field .assign (new MFNode ())

   expect (field) .toHaveLength (0)
})

test ("shrinkToFit", () =>
{
   const field = new MFNode (node1);

   expect (field .shrinkToFit ()) .toHaveLength (1);
   expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());
});

test ("common", () =>
{
   const field = new MFNode ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFNode)
   expect (field .getTypeName ()) .toBe ("MFNode")
   expect (Object .prototype .toString .call (field)) .toBe ("[object MFNode]")
})

test ("copy", () =>
{
   const
      a = new MFNode (node1, node2),
      b = a .copy ()

   expect (b) .toBeInstanceOf (MFNode)
   expect (b) .toHaveLength (a .length)
   expect (b .equals (a)) .toBe (true)
   expect (b .getValue ()) .not .toBe (a .getValue ())
})

test ("equals", () =>
{
   const
      a = new MFNode (),
      b = new MFNode (node1, node2),
      c = new MFNode (node1, node2)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
   expect (b .equals (c)) .toBe (true)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFNode (),
      b = new MFNode (node1)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFNode ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe (null)
   expect (a) .toHaveLength (1)

   const b = new MFNode (node1, node2, node3, node4, node5)
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe (node1)
   expect (b [1]) .toBe (node2)
   expect (b [2]) .toBe (node3)
   expect (b [3]) .toBe (node4)
   expect (b [4]) .toBe (node5)

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe (node1)
   expect (c [1]) .toBe (node2)
   expect (c [2]) .toBe (node3)
   expect (c [3]) .toBe (node4)
   expect (c [4]) .toBe (node5)
})

test ("basic-functions", () =>
{
   const a = new MFNode (node1)

   expect (a [0]) .toBe (node1)
   a [1] = node1
   expect (a [1]) .toBe (node1)
   a .push (node1)
   expect (a .at (-1)) .toBe (node1)
   a .unshift (node1)
   expect (a [0]) .toBe (node1)
   expect (a) .toHaveLength (4)
   expect (a .splice (1, 1, node1)) .toHaveLength (1)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe (node1)
   expect (a .splice (1, 1, node2)) .toHaveLength (1)
   expect (a [1]) .toBe (node2)
   expect (a .splice (1, 0, node2)) .toHaveLength (0)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (node1)
   expect (a [1]) .toBe (node2)
   expect (a [2]) .toBe (node2)
   expect (a [3]) .toBe (node1)
   expect (a [4]) .toBe (node1)

   expect (a .fill (node2)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (node2)
   expect (a [1]) .toBe (node2)
   expect (a [2]) .toBe (node2)
   expect (a [3]) .toBe (node2)
   expect (a [4]) .toBe (node2)

   expect (a .includes ("foo")) .toBe (false)
   expect (a .indexOf ("foo")) .toBe (-1)
   expect (a .lastIndexOf ("foo")) .toBe (-1)

   expect (a .fill (node1)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (node1)
   expect (a [1]) .toBe (node1)
   expect (a [2]) .toBe (node1)
   expect (a [3]) .toBe (node1)
   expect (a [4]) .toBe (node1)

   expect (a .includes (node1)) .toBe (true)
   expect (a .indexOf (node1)) .toBe (0)
   expect (a .lastIndexOf (node1)) .toBe (a .length - 1)

   a [1] = node2
   a [3] = node2

   expect (a .includes (node2)) .toBe (true)
   expect (a .indexOf (node2)) .toBe (1)
   expect (a .lastIndexOf (node2)) .toBe (3)

   expect (a .splice (0, 5, node1, node1, node1, node1, node1)) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (node1)
   expect (a [1]) .toBe (node1)
   expect (a [2]) .toBe (node1)
   expect (a [3]) .toBe (node1)
   expect (a [4]) .toBe (node1)
})

test ("at", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
      expect (a .push (x [i] = scene .createNode ("WorldInfo"))) .toBe (i + 1)

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i]
      expect (a .at (i)) .toBe (a [i])
      expect (a .at (i)) .toBe (v)
      expect (a .at (i - N)) .toBe (a [i])
      expect (a .at (i - N)) .toBe (v)
   }
})

test ("entries", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
      expect (a .push (x [i] = scene .createNode ("WorldInfo"))) .toBe (i + 1)

   expect ([... a .entries ()]) .toHaveLength (N)

   for (const [i, value] of a .entries ())
      expect (value) .toBe (a [i])
})

test ("fill", () =>
{
   const a = new MFNode (node1, node2, node3, node4, node5, node6)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node1)
   expect (a [1]) .toBe (node2)
   expect (a [2]) .toBe (node3)
   expect (a [3]) .toBe (node4)
   expect (a [4]) .toBe (node5)
   expect (a [5]) .toBe (node6)

   expect (a .fill (node7)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node7)
   expect (a [1]) .toBe (node7)
   expect (a [2]) .toBe (node7)
   expect (a [3]) .toBe (node7)
   expect (a [4]) .toBe (node7)
   expect (a [5]) .toBe (node7)

   expect (a .fill (node2)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node2)
   expect (a [1]) .toBe (node2)
   expect (a [2]) .toBe (node2)
   expect (a [3]) .toBe (node2)
   expect (a [4]) .toBe (node2)
   expect (a [5]) .toBe (node2)
})

test ("filter", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
      expect (a .push (x [i] = scene .createNode ("WorldInfo"))) .toBe (i + 1)

   const b = a .filter (v => v === x [0] || v === x [1])

   expect (b) .toBeInstanceOf (MFNode)
   expect (b) .toHaveLength (2)

   expect (b [0]) .toBe (x [0])
   expect (b [1]) .toBe (x [1])
})

test ("keys", () =>
{
   const
      N = 10,
      a = new MFNode ()

   a .length = N
   expect (a .keys ()) .toEqual (new Array (N) .keys ())
   a .length = N/2
   expect (a .keys ()) .toEqual (new Array (N/2) .keys ())
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
      expect (a .push (x [i] = scene .createNode ("WorldInfo"))) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .map (v => v)

   expect (b) .toBeInstanceOf (MFNode)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])
})

test ("pop", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = x [i] = scene .createNode ("WorldInfo")
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i]
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      const v = a .pop ()
      expect (v) .toBe (b .pop ())
      expect (v) .not .toBe (null)
      expect (v. getNodeTypeName ()) .toBe ("WorldInfo")
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0; i < a .length; ++ i)
      {
         const v = x [i]
         expect (a [i]) .toBe (v)
      }
   }
})

test ("push", () =>
{
   const
      N = 1_000,
      a = new MFNode (),
      x = [ ]

   expect (a) .toHaveLength (0)

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i] = scene .createNode ("WorldInfo")
      expect (a .push (v)) .toBe (i + 1)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i]
      expect (a [i]) .toBe (v)
   }
})

test ("shift", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i] = scene .createNode ("WorldInfo")
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i]
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      const v = a .shift ()

      expect (v) .toBe (b .shift ())
      expect (v) .not .toBe (null)
      expect (v .getNodeTypeName ()) .toBe ("WorldInfo")
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = j + 1; i < a .length; ++ i)
      {
         const v = x [n++]
         expect (a [i]) .toBe (v)
      }
   }
})

test ("slice", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
      expect (a .push (x [i] = scene .createNode ("WorldInfo"))) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .slice ()

   expect (b) .toHaveLength (N)
   expect (b) .toBeInstanceOf (MFNode)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .toBe (a [i])
      expect (b [i]) .not .toBe (null)
      expect (b [i] .getNodeTypeName ()) .toBe ("WorldInfo")
   }

   const c = a .slice (1, N - 1)

   expect (c) .toHaveLength (N - 2)
   expect (c) .toBeInstanceOf (MFNode)

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
   {
      expect (c [i]) .toBe (a [j])
      expect (c [i]) .not .toBe (null)
      expect (c [i] .getNodeTypeName ()) .toBe ("WorldInfo")
   }
})

test ("splice", () =>
{
   const
      N = 10,
      a = new MFNode (),
      x = [ ]

   for (let i = 0; i < N; ++ i)
      expect (a .push (x [i] = scene .createNode ("WorldInfo"))) .toBe (i + 1)

   const
      v0 = a [0],
      v1 = a .at (-1)

   expect (a) .toHaveLength (N)

   const b = a .splice (1,N-2)

   expect (a) .toHaveLength (2)
   expect (b) .toHaveLength (N-2)
   expect (b) .toBeInstanceOf (MFNode)
   expect (a [0]) .toBe (v0)
   expect (a [1]) .toBe (v1)

   for (let i = 0, n = 1; i < N-2; ++ i)
   {
      expect (b [i]) .toBe (x [n++])
      expect (b [i]) .not .toBe (null)
      expect (b [i] .getNodeTypeName ()) .toBe ("WorldInfo")
   }

   const c = a .splice (1,0,...b)

   expect (a) .toHaveLength (N)
   expect (c) .toHaveLength (0)
   expect (c) .toBeInstanceOf (MFNode)

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i]) .toBe (x [n++])

   const d = a .splice (1,N-2,...b)

   expect (a) .toHaveLength (N)
   expect (d) .toHaveLength (N-2)
   expect (d) .toBeInstanceOf (MFNode)

   for (let i = 0, n = 1; i < N-2; ++ i)
   {
      const v = x [n++]
      expect (d [i]) .toBe (v)
      expect (b [i]) .toBe (v)
      expect (d [i]) .not .toBe (null)
      expect (b [i]) .not .toBe (null)
      expect (d [i] .getNodeTypeName ()) .toBe ("WorldInfo")
      expect (b [i] .getNodeTypeName ()) .toBe ("WorldInfo")
   }

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i]) .toBe (x [n++])

   const e = new MFNode (node1, node2, node3, node4)

   expect (e .splice (2) .equals (new MFNode (node3, node4))) .toBe (true)
   expect (e .equals (new MFNode (node1, node2))) .toBe (true)

   expect (e .splice () .equals (new MFNode ())) .toBe (true)
   expect (e .equals (new MFNode (node1, node2))) .toBe (true)
})

test ("sort-reverse", () =>
{
   const a = new MFNode (node1, node2, node3, node4, node5, node6)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node1)
   expect (a [1]) .toBe (node2)
   expect (a [2]) .toBe (node3)
   expect (a [3]) .toBe (node4)
   expect (a [4]) .toBe (node5)
   expect (a [5]) .toBe (node6)

   expect (a .reverse ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node6)
   expect (a [1]) .toBe (node5)
   expect (a [2]) .toBe (node4)
   expect (a [3]) .toBe (node3)
   expect (a [4]) .toBe (node2)
   expect (a [5]) .toBe (node1)

   expect (a .sort ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node6)
   expect (a [1]) .toBe (node5)
   expect (a [2]) .toBe (node4)
   expect (a [3]) .toBe (node3)
   expect (a [4]) .toBe (node2)
   expect (a [5]) .toBe (node1)

   const Algorithm = X3D .Algorithm

   expect (a .reverse ()) .toBe (a)
   expect (a .sort ((a, b) => Algorithm .cmp (b .getNodeName (), a .getNodeName ()))) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (node6)
   expect (a [1]) .toBe (node5)
   expect (a [2]) .toBe (node4)
   expect (a [3]) .toBe (node3)
   expect (a [4]) .toBe (node2)
   expect (a [5]) .toBe (node1)
})

test ("unshift", () =>
{
   const
      N = 1_000,
      a = new MFNode (),
      x = [ ]

   expect (a) .toHaveLength (0)

   for (let i = 0; i < N; ++ i)
   {
      const v = x [i] = scene .createNode ("WorldInfo")
      expect (a .unshift (v)) .toBe (i + 1)
      expect (a [0]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = x [n++]
      expect (a .at (-(i + 1))) .toBe (v)
   }
})

test ("parents", () =>
{
   const n1 = scene .createNode ("MetadataBoolean")

   expect (n1 .getValue ()) .not .toBe (null)
   expect (n1 .getValue () .getParents () .size) .toBe (1)

   const a1 = new MFNode (n1)

   expect (n1 .getValue ()) .not .toBe (null)
   expect (n1 .getValue () .getParents () .size) .toBe (2)

   a1 [0] = scene .createNode ("MetadataBoolean")

   expect (n1 .getValue ()) .not .toBe (null)
   expect (n1 .getValue () .getParents () .size) .toBe (1)
   expect (a1 [0] .getValue ()) .not .toBe (null)
   expect (a1 [0] .getValue () .getParents () .size) .toBe (2)

   const n2 = a1 .pop ()

   expect (n2 .getValue ()) .not .toBe (null)
   expect (n2 .getValue () .getParents () .size) .toBe (1)

   a1 [0] = scene .createNode ("MetadataBoolean")

   expect (a1 [0] .getValue ()) .not .toBe (null)
   expect (a1 [0] .getValue () .getParents () .size) .toBe (2)

   const n3 = a1 .shift ()

   expect (n3 .getValue ()) .not .toBe (null)
   expect (n3 .getValue () .getParents () .size) .toBe (1)

   a1 [0] = scene .createNode ("MetadataBoolean")

   expect (a1 [0] .getValue ()) .not .toBe (null)
   expect (a1 [0] .getValue () .getParents () .size) .toBe (2)

   const a2 = a1 .splice (0,1)

   expect (a2 [0] .getValue ()) .not .toBe (null)
   expect (a2 [0] .getValue () .getParents () .size) .toBe (2)
})

test ("dispose", () =>
{
   const a = new MFNode (
      scene .createNode ("MetadataBoolean"),
      scene .createNode ("MetadataBoolean"),
      scene .createNode ("MetadataBoolean"),
      scene .createNode ("MetadataBoolean"),
      scene .createNode ("MetadataBoolean"),
      scene .createNode ("MetadataBoolean"),
   )

   expect (a) .toHaveLength (6)

   for (let i = 0; i < 6; ++ i)
      expect (a [i] .getValue () .getParents () .size) .toBe (2)

   const b = [...a]

   a .dispose ()
   expect (a) .toHaveLength (0)

   for (let i = 0; i < 6; ++ i)
      expect (b [i] .getValue () .getParents () .size) .toBe (1)
})
