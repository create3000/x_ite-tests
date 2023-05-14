const
   X3D     = require ("../../X3D"),
   MFInt32 = X3D .MFInt32

test ("constructor", () =>
{
   let field

   expect ((field = new MFInt32 (), field [0]))                .toBe (0)
   expect ((field = new MFInt32 (NaN), field [0]))             .toBe (0)
   expect ((field = new MFInt32 (Infinity), field [0]))        .toBe (0)
   expect ((field = new MFInt32 (-Infinity), field [0]))       .toBe (0)
   expect ((field = new MFInt32 (undefined), field [0]))       .toBe (0)
   expect ((field = new MFInt32 (null), field [0]))            .toBe (0)
   expect ((field = new MFInt32 ({}), field [0]))              .toBe (0)
   expect ((field = new MFInt32 (""), field [0]))              .toBe (0)
   expect ((field = new MFInt32 ("123"), field [0]))           .toBe (123)
   expect ((field = new MFInt32 ("123.456"), field [0]))       .toBe (123)
   expect ((field = new MFInt32 (false), field [0]))           .toBe (0)
   expect ((field = new MFInt32 (true), field [0]))            .toBe (1)
   expect ((field = new MFInt32 (123.456), field [0]))         .toBe (123)
   expect ((field = new MFInt32 (123_456_789_012), field [0])) .toBe (-1097262572)
   expect ((field = new MFInt32 (0xffffffff), field [0]))      .toBe (-1)
   expect ((field = new MFInt32 (666), field [0]))             .toBe (666)
   expect ((field = new MFInt32 (-666), field [0]))            .toBe (-666)
})

test ("setValue", () =>
{
   const field = new MFInt32 ()

   expect ((field [0] = NaN,             field [0])) .toBe (0)
   expect ((field [0] = Infinity,        field [0])) .toBe (0)
   expect ((field [0] = -Infinity,       field [0])) .toBe (0)
   expect ((field [0] = undefined,       field [0])) .toBe (0)
   expect ((field [0] = null,            field [0])) .toBe (0)
   expect ((field [0] = {},              field [0])) .toBe (0)
   expect ((field [0] = "",              field [0])) .toBe (0)
   expect ((field [0] = "123",           field [0])) .toBe (123)
   expect ((field [0] = "123.456",       field [0])) .toBe (123)
   expect ((field [0] = false,           field [0])) .toBe (0)
   expect ((field [0] = true,            field [0])) .toBe (1)
   expect ((field [0] = 123.456,         field [0])) .toBe (123)
   expect ((field [0] = 123_456_789_012, field [0])) .toBe (-1097262572)
   expect ((field [0] = 0xffffffff,      field [0])) .toBe (-1)
   expect ((field [0] = 666,             field [0])) .toBe (666)
   expect ((field [0] = -666,            field [0])) .toBe (-666)
})

test ("getter", () =>
{
   const field = new MFInt32 ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFInt32)
   expect (field .getTypeName ()) .toBe ("MFInt32")
})

test ("equals", () =>
{
   const
      a = new MFInt32 (),
      b = new MFInt32 (true)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFInt32 (),
      b = new MFInt32 (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFInt32 ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe (0)
   expect (a) .toHaveLength (1)

   const b = new MFInt32 (1,2,3,4,5)
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe (1)
   expect (b [1]) .toBe (2)
   expect (b [2]) .toBe (3)
   expect (b [3]) .toBe (4)
   expect (b [4]) .toBe (5)

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe (1)
   expect (c [1]) .toBe (2)
   expect (c [2]) .toBe (3)
   expect (c [3]) .toBe (4)
   expect (c [4]) .toBe (5)
})

test ("basic-functions", () =>
{
   const a = new MFInt32 (Infinity)

   expect (a [0]) .toBe (0)
   a [1] = Infinity
   expect (a [1]) .toBe (0)
   a .push (Infinity)
   expect (a .at (-1)) .toBe (0)
   a .unshift (Infinity)
   expect (a [0]) .toBe (0)
   expect (a) .toHaveLength (4)
   expect (a .splice (1, 1, Infinity)) .toHaveLength (1)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe (0)
   expect (a .splice (1, 1, NaN)) .toHaveLength (1)
   expect (a [1]) .toBe (0)
   expect (a .splice (1, 0, NaN)) .toHaveLength (0)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (0)
   expect (a [1]) .toBe (0)
   expect (a [2]) .toBe (0)
   expect (a [3]) .toBe (0)
   expect (a [4]) .toBe (0)

   expect (a .fill (NaN)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (0)
   expect (a [1]) .toBe (0)
   expect (a [2]) .toBe (0)
   expect (a [3]) .toBe (0)
   expect (a [4]) .toBe (0)

   expect (a .includes (123)) .toBe (false)
   expect (a .indexOf (123)) .toBe (-1)
   expect (a .lastIndexOf (123)) .toBe (-1)

   expect (a .fill (1)) .toBe (a)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (1)
   expect (a [2]) .toBe (1)
   expect (a [3]) .toBe (1)
   expect (a [4]) .toBe (1)

   expect (a .includes (1)) .toBe (true)
   expect (a .indexOf (1)) .toBe (0)
   expect (a .lastIndexOf (1)) .toBe (a .length - 1)

   a [1] = 2
   a [3] = 2

   expect (a .includes (2)) .toBe (true)
   expect (a .indexOf (2)) .toBe (1)
   expect (a .lastIndexOf (2)) .toBe (3)

   expect (a .splice (0, 5, 1,2,3,4,5)) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
})

test ("concat", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .concat ([1000,1001])

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N + 2)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])

   expect (b [N + 0]) .toBe (1000)
   expect (b [N + 1]) .toBe (1001)
})

test ("fill", () =>
{
   const a = new MFInt32 (0, 0, 0, 0, 0, 0)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (0)
   expect (a [1]) .toBe (0)
   expect (a [2]) .toBe (0)
   expect (a [3]) .toBe (0)
   expect (a [4]) .toBe (0)
   expect (a [5]) .toBe (0)

   expect (a .fill (1)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (1)
   expect (a [2]) .toBe (1)
   expect (a [3]) .toBe (1)
   expect (a [4]) .toBe (1)
   expect (a [5]) .toBe (1)

   expect (a .fill (2)) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (2)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (2)
   expect (a [3]) .toBe (2)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (2)
})

test ("filter", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   const b = a .filter (v => v % 2)

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N / 2)

   for (let i = 0; i < N / 2; ++ i)
      expect (b [i]) .toBe (a [i * 2])
})

test ("flat", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   const b = a .flat ()

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N)

   for (let i = 0, n = 0; i < N; ++ i)
      expect (b [i]) .toBe (++n)
})

test ("flatMap", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   const b = a .flatMap (v => [v, v])

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N * 2)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      expect (b [i * 2 + 0]) .toBe (++n)
      expect (b [i * 2 + 1]) .toBe (n)
   }
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .map (v => v)

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])
})

test ("pop", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .pop ()) .toBe (b .pop ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = 0; i < a .length; ++ i)
      {
         const v = ++n
         expect (a [i]) .toBe (v)
      }
   }
})

test ("push", () =>
{
   const
      N = 1_000,
      a = new MFInt32 ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .push (v)) .toBe (i + 1)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }
})

test ("shift", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .shift ()) .toBe (b .shift ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = j + 1; i < a .length; ++ i)
      {
         const v = ++n
         expect (a [i]) .toBe (v)
      }
   }
})

test ("slice", () =>
{
   const
      N = 10,
      a = new MFInt32 ()

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (++n)) .toBe (i + 1)

   expect (a) .toHaveLength (N)

   const b = a .slice ()

   expect (b) .toHaveLength (N)
   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])

   const c = a .slice (1, N - 1)

   expect (c) .toHaveLength (N - 2)
   expect (c) .toBeInstanceOf (Array)
   expect (Array .isArray (c)) .toBe (true)

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
      expect (c [i]) .toBe (a [j])
})

test ("sort-reverse", () =>
{
   const a = new MFInt32 (1, 2, 3, 4, 5, 6)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
   expect (a [5]) .toBe (6)

   expect (a .reverse ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (6)
   expect (a [1]) .toBe (5)
   expect (a [2]) .toBe (4)
   expect (a [3]) .toBe (3)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (1)

   expect (a .sort ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
   expect (a [5]) .toBe (6)

   const Algorithm = X3D .require ("standard/Math/Algorithm")

   expect (a .sort ((a, b) => Algorithm .cmp (b, a))) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (6)
   expect (a [1]) .toBe (5)
   expect (a [2]) .toBe (4)
   expect (a [3]) .toBe (3)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (1)
})

test ("unshift", () =>
{
   const
      N = 1_000,
      a = new MFInt32 ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .unshift (v)) .toBe (i + 1)
      expect (a [0]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = ++n
      expect (a .at (-(i + 1))) .toBe (v)
   }
})
