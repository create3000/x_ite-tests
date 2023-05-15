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

test ("copy", () =>
{
   const
      a = new MFVec3f (new SFVec3f (1,2,3),new SFVec3f (4,5,6),new SFVec3f (7,8,9)),
      b = a .copy ()

   expect (b) .toHaveLength (a .length)
   expect (b .equals (a)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new MFVec3f (),
      b = new MFVec3f (new SFVec3f (1,2,3),new SFVec3f (4,5,6)),
      c = new MFVec3f (new SFVec3f (1,2,3),new SFVec3f (4,5,6))

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
   expect (b .equals (c)) .toBe (true)
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

   expect (a .fill (new SFVec3f (5,6,7))) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (5,6,7))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (5,6,7))) .toBe (true)

   expect (a .includes (new SFVec3f (9,9,9))) .toBe (false)
   expect (a .indexOf (new SFVec3f (9,9,9))) .toBe (-1)
   expect (a .lastIndexOf (new SFVec3f (9,9,9))) .toBe (-1)

   expect (a .includes (a [0])) .toBe (true)
   expect (a .indexOf (a [0])) .toBe (0)
   expect (a .lastIndexOf (a .at (-1))) .toBe (a .length - 1)

   a [1] = new SFVec3f (4,5,6)
   a [3] = new SFVec3f (4,5,6)

   expect (a .includes (a [1])) .toBe (true)
   expect (a .indexOf (a [1])) .toBe (1)
   expect (a .lastIndexOf (a [3])) .toBe (3)

   expect (a .splice (0, 5, new SFVec3f (1,2,3),new SFVec3f (2,3,4),new SFVec3f (3,4,5),new SFVec3f (4,5,6),new SFVec3f (5,6,7))) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (2,3,4))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (3,4,5))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (4,5,6))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (5,6,7))) .toBe (true)
})

test ("at", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFVec3f (++n,++n,++n))) .toBe (i + 1)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a .at (i)) .toBe (a [i])
      expect (a .at (i) .equals (v)) .toBe (true)
      expect (a .at (i - N) .equals (a [i])) .toBe (true)
      expect (a .at (i - N) .equals (v)) .toBe (true)
   }
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

   expect (a .fill (new SFVec3f (1,2,3))) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [1] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [2] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [3] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [4] .equals (new SFVec3f (1,2,3))) .toBe (true)
   expect (a [5] .equals (new SFVec3f (1,2,3))) .toBe (true)

   expect (a .fill (new SFVec3f (4,5,6))) .toBe (a)

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
      expect (a .push (new SFVec3f (++n,++n,++n))) .toBe (i + 1)

   const b = a .filter (v => v.x % 2)

   expect (b) .toBeInstanceOf (MFVec3f)
   expect (b) .toHaveLength (N / 2)

   for (let i = 0; i < N / 2; ++ i)
   {
      expect (b [i]) .not .toBe (a [i * 2])
      expect (b [i] .equals (a [i * 2])) .toBe (true)
   }
})

test ("find", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFVec3f (++n,++n,++n))) .toBe (i + 1)

   const
      b = a .find (v => v .equals (new SFVec3f (1,2,3))),
      c = a .find (v => v .equals (new SFVec3f ()))

   expect (b) .toBe (a [0])
   expect (c) .toBe (undefined)
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFVec3f (++n,++n,++n))) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .map (v => v)

   expect (b) .toBeInstanceOf (MFVec3f)

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
      expect (a .push (new SFVec3f (++n,++n,++n))) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .slice ()

   expect (b) .toHaveLength (N)
   expect (b) .toBeInstanceOf (MFVec3f)

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .not .toBe (a [i])
      expect (b [i] .equals (a [i])) .toBe (true)
   }

   const c = a .slice (1, N - 1)

   expect (c) .toHaveLength (N - 2)
   expect (c) .toBeInstanceOf (MFVec3f)

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
   {
      expect (c [i]) .not .toBe (a [j])
      expect (c [i] .equals (a [j])) .toBe (true)
   }
})

test ("splice", () =>
{
   const
      N = 10,
      a = new MFVec3f ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFVec3f (++n,++n,++n))) .toBe (i + 1)

   const
      v0 = a [0] .copy (),
      v1 = a .at (-1) .copy ()

   expect (a) .toHaveLength (N)

   const b = a .splice (1,N-2)

   expect (a) .toHaveLength (2)
   expect (b) .toHaveLength (N-2)
   expect (b) .toBeInstanceOf (MFVec3f)
   expect (a [0] .equals (v0)) .toBe (true)
   expect (a [1] .equals (v1)) .toBe (true)

   for (let i = 0, n = comp; i < N-2; ++ i)
      expect (b [i] .equals (new SFVec3f (++n,++n,++n))) .toBe (true)

   const c = a .splice (1,0,...b)

   expect (a) .toHaveLength (N)
   expect (c) .toHaveLength (0)
   expect (c) .toBeInstanceOf (MFVec3f)

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i] .equals (new SFVec3f (++n,++n,++n))) .toBe (true)

   const d = a .splice (1,N-2,...b)

   expect (a) .toHaveLength (N)
   expect (d) .toHaveLength (N-2)
   expect (d) .toBeInstanceOf (MFVec3f)

   for (let i = 0, n = comp; i < N-2; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (d [i] .equals (v)) .toBe (true)
      expect (b [i] .equals (v)) .toBe (true)
      expect (d [i]) .not .toBe (b [i])
   }

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i] .equals (new SFVec3f (++n,++n,++n))) .toBe (true)
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

test ("unshift", () =>
{
   const
      N = 1_000,
      a = new MFVec3f ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a .unshift (v)) .toBe (i + 1)
      expect (a [0] .equals (v)) .toBe (true)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFVec3f (++n,++n,++n)
      expect (a .at (-(i + 1)) .equals (v)) .toBe (true)
   }
})
