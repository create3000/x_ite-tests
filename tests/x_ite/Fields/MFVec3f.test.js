const
   X3D     = require ("../../X3D"),
   MFVec3f = X3D .MFVec3f,
   SFVec3f = X3D .SFVec3f,
   comp    = 3

test ("getter", () =>
{
   const field = new MFVec3f ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFVec3f)
   expect (field .getTypeName ()) .toBe ("MFVec3f")
})

test ("equals", () =>
{
   const
      a = new MFVec3f (),
      b = new MFVec3f (new SFVec3f ())

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFVec3f (),
      b = new MFVec3f (new SFVec3f ())

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFVec3f ()

   expect (a) .toHaveLength (0)
   expect (a [0] .equals (new SFVec3f ())) .toBe (true)
   expect (a) .toHaveLength (1)

   const b = new MFVec3f (new SFVec3f (1,2,3),new SFVec3f (2,3,4),new SFVec3f (3,4,5),new SFVec3f (4,5,6),new SFVec3f (5,6,7))
   expect (b) .toHaveLength (5)
   expect (b [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (b [1] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (b [2] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (b [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (b [4] .equals (new SFVec3f (5,6,7))) .toBe (true)

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (c [1] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (c [2] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (c [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (c [4] .equals (new SFVec3f (5,6,7))) .toBe (true)
   for (let i = 0; i < 5; ++ i)
      expect (c [i]) .toBe (b [i])

   const d = new MFVec3f (new SFVec3f (1,2,3))
   expect (dispatchEvent) .toHaveLength (1)
   expect (d [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   d [0] .x = 2
   d [0] .y = 3
   d [0] .z = 4
   d [1] .x = 3
   d [1] .y = 4
   d [1] .z = 5
   expect (d) .toHaveLength (2)
   expect (d [0] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (d [1] .equals (new SFVec3f (3,4,5))) .toBe (true)
})

test ("basic-functions", () =>
{
   const a = new MFVec3f (new SFVec3f (1,2,3))

   expect (a [0] .x) .toBe (1)
   expect (a [0] .y) .toBe (2)
   expect (a [0] .z) .toBe (3)
   a [1] = new SFVec3f (3,4,5)
   expect (a [1] .x) .toBe (3)
   expect (a [1] .y) .toBe (4)
   expect (a [1] .z) .toBe (5)
   a .push (new SFVec3f (4,5,6))
   expect (a .at (-1) .x) .toBe (4)
   expect (a .at (-1) .y) .toBe (5)
   expect (a .at (-1) .z) .toBe (6)
   a .unshift (new SFVec3f (5,6,7))
   expect (a [0] .x) .toBe (5)
   expect (a [0] .y) .toBe (6)
   expect (a [0] .z) .toBe (7)
   expect (a) .toHaveLength (4)
   expect (a .splice (1, 1, new SFVec3f (6,7,8))) .toHaveLength (1)
   expect (a [1] .x) .toBe (6)
   expect (a [1] .y) .toBe (7)
   expect (a [1] .z) .toBe (8)
   expect (a .splice (1, 1, new SFVec3f (7,8,9))) .toHaveLength (1)
   expect (a [1] .x) .toBe (7)
   expect (a [1] .y) .toBe (8)
   expect (a [1] .z) .toBe (9)
   expect (a .splice (1, 0, new SFVec3f (8,9,0))) .toHaveLength (0)
   expect (a) .toHaveLength (5)
   expect (a [0] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (8,9,0))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (7,8,9))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (4,5,6))) .toBe (true)

   a .fill (new SFVec3f (5,6,7))
   expect (a) .toHaveLength (5)
   expect (a [0] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (5,6,7))) .toBe (true)

   expect (a .includes (new SFVec3f (9,9,9))) .toBe (false)
   expect (a .indexOf (new SFVec3f (9,9,9))) .toBe (-1)
   expect (a .lastIndexOf (new SFVec3f (9,9,9))) .toBe (-1)

   expect (a .includes (new SFVec3f (5,6,7))) .toBe (true)
   expect (a .indexOf (new SFVec3f (5,6,7))) .toBe (0)
   expect (a .lastIndexOf (new SFVec3f (5,6,7))) .toBe (a .length - 1)

   a [1] = new SFVec3f (4,5,6)
   a [3] = new SFVec3f (4,5,6)

   expect (a .includes (new SFVec3f (4,5,6))) .toBe (true)
   expect (a .indexOf (new SFVec3f (4,5,6))) .toBe (1)
   expect (a .lastIndexOf (new SFVec3f (4,5,6))) .toBe (3)

   expect (a .splice (0, 5, new SFVec3f (1,2,3),new SFVec3f (2,3,4),new SFVec3f (3,4,5),new SFVec3f (4,5,6),new SFVec3f (5,6,7))) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (5,6,7))) .toBe (true)
})

test ("concat", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (new SFVec3f (++n,++n,++n))

   expect (a) .toHaveLength (N)

   const b = a .concat ([new SFVec3f (1000,1001,1002),new SFVec3f (1003,1004,1005)])

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N + 2)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .not .toBe (a [i])
      expect (b [i] .equals (a [i])) .toBe (true)
   }

   expect (b [N + 0] .equals (new SFVec3f (1000,1001,1002))) .toBe (true)
   expect (b [N + 1] .equals (new SFVec3f (1003,1004,1005))) .toBe (true)
})

test ("fill", () =>
{
   const a = new MFVec3f ()

   a .length = 6

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (0,0,0))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (0,0,0))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (0,0,0))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (0,0,0))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (0,0,0))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (0,0,0))) .toBe (true)

   a .fill (new SFVec3f (1,2,3))

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (1,2,3))) .toBe (true)

   a .fill (new SFVec3f (4,5,6))

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (4,5,6))) .toBe (true)
})

test ("filter", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (new SFVec3f (++n,++n,++n))

   const b = a .filter (v => v.x % 2)

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N / 2)

   for (let i = 0; i < N / 2; ++ i)
   {
      expect (b [i]) .not .toBe (a [i * 2])
      expect (b [i] .equals (a [i * 2])) .toBe (true)
   }
})

test ("flat", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (new SFVec3f (++n,++n,++n))

   const b = a .flat (0)

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .not .toBe (a [i])
      expect (b [i] .equals (a [i])) .toBe (true)
   }

   const c = a .flat ()

   expect (c) .toBeInstanceOf (Array)
   expect (Array .isArray (c)) .toBe (true)
   expect (c) .toHaveLength (N * comp)

   for (let i = 0, n = 0; i < N * comp; ++ i)
      expect (c [i]) .toBe (++n)
})

test ("flatMap", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (new SFVec3f (++n,++n,++n))

   const b = a .flatMap (v => [v,v])

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N * 2)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i * 2 + 0]) .not .toBe (a [i])
      expect (b [i * 2 + 1]) .not .toBe (a [i])
      expect (b [i * 2 + 0] .equals (a [i])) .toBe (true)
      expect (b [i * 2 + 1] .equals (a [i])) .toBe (true)
   }
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (new SFVec3f (++n,++n,++n))

   expect (a) .toHaveLength (N)

   const b = a .map (v => v)

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .not .toBe (a [i])
      expect (b [i] .equals (a [i])) .toBe (true)
   }
})

test ("pop", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      a .push (v)
      expect (a [i] .equals (v)) .toBe (true)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a [i] .equals (v)) .toBe (true)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .pop () .equals (b .pop ())) .toBe (true)
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = 0; i < a .length; ++ i)
      {
         const v = new SFVec3f (++n,++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }
   }
})

test ("push", () =>
{
   const
      N = 1_000,
      a = new MFVec3f ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a .push (v)) .toBe (i + 1)
      expect (a [i] .equals (v)) .toBe (true)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a [i] .equals (v)) .toBe (true)
   }
})

test ("shift", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      a .push (v)
      expect (a [i] .equals (v)) .toBe (true)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a [i] .equals (v)) .toBe (true)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .shift () .equals (b .shift ())) .toBe (true)
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = j * comp + comp; i < a .length; ++ i)
      {
         const v = new SFVec3f (++n,++n,++n)
         expect (a [i] .equals (v)) .toBe (true)
      }
   }
})

test ("slice", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (new SFVec3f (++n,++n,++n))

   expect (a) .toHaveLength (N)

   const b = a .slice ()

   expect (b) .toHaveLength (N)
   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .not .toBe (a [i])
      expect (b [i] .equals (a [i])) .toBe (true)
   }

   const c = a .slice (1, N - 1)

   expect (c) .toHaveLength (N - 2)
   expect (c) .toBeInstanceOf (Array)
   expect (Array .isArray (c)) .toBe (true)

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
   {
      expect (c [i]) .not .toBe (a [j])
      expect (c [i] .equals (a [j])) .toBe (true)
   }
})

test ("sort-reverse", () =>
{
   const a = new MFVec3f (new SFVec3f (1,2,3),
                          new SFVec3f (2,3,4),
                          new SFVec3f (3,4,5),
                          new SFVec3f (4,5,6),
                          new SFVec3f (5,6,7),
                          new SFVec3f (5,6,8))

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (5,6,8))) .toBe (true)

   expect (a .reverse ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (5,6,8))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (1,2,3))) .toBe (true)

   expect (a .sort ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (5,6,8))) .toBe (true)

   const Algorithm = X3D .require ("standard/Math/Algorithm")

   a .sort ((a, b) => Algorithm .cmp (b .z, a .z))

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (5,6,8))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (1,2,3))) .toBe (true)
})
