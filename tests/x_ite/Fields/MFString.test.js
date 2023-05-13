const
   X3D      = require ("../../X3D"),
   MFString = X3D .MFString

test ("constructor", () =>
{
   let field

   expect ((field = new MFString (), field [0]))                .toBe ("")
   expect ((field = new MFString (NaN), field [0]))             .toBe ("NaN")
   expect ((field = new MFString (Infinity), field [0]))        .toBe ("Infinity")
   expect ((field = new MFString (-Infinity), field [0]))       .toBe ("-Infinity")
   expect ((field = new MFString (undefined), field [0]))       .toBe ("undefined")
   expect ((field = new MFString (null), field [0]))            .toBe ("null")
   expect ((field = new MFString ({}), field [0]))              .toBe ("[object Object]")
   expect ((field = new MFString (""), field [0]))              .toBe ("")
   expect ((field = new MFString ("123"), field [0]))           .toBe ("123")
   expect ((field = new MFString ("123.456"), field [0]))       .toBe ("123.456")
   expect ((field = new MFString (false), field [0]))           .toBe ("false")
   expect ((field = new MFString (true), field [0]))            .toBe ("true")
   expect ((field = new MFString (123.456), field [0]))         .toBe ("123.456")
   expect ((field = new MFString (123_456_789_012), field [0])) .toBe ("123456789012")
   expect ((field = new MFString (0xffffffff), field [0]))      .toBe ("4294967295")
   expect ((field = new MFString (666), field [0]))             .toBe ("666")
   expect ((field = new MFString (-666), field [0]))            .toBe ("-666")
})

test ("setValue", () =>
{
   const field = new MFString ()

   expect ((field [0] = NaN,             field [0])) .toBe ("NaN")
   expect ((field [0] = Infinity,        field [0])) .toBe ("Infinity")
   expect ((field [0] = -Infinity,       field [0])) .toBe ("-Infinity")
   expect ((field [0] = undefined,       field [0])) .toBe ("undefined")
   expect ((field [0] = null,            field [0])) .toBe ("null")
   expect ((field [0] = {},              field [0])) .toBe ("[object Object]")
   expect ((field [0] = "",              field [0])) .toBe ("")
   expect ((field [0] = "123",           field [0])) .toBe ("123")
   expect ((field [0] = "123.456",       field [0])) .toBe ("123.456")
   expect ((field [0] = false,           field [0])) .toBe ("false")
   expect ((field [0] = true,            field [0])) .toBe ("true")
   expect ((field [0] = 123.456,         field [0])) .toBe ("123.456")
   expect ((field [0] = 123_456_789_012, field [0])) .toBe ("123456789012")
   expect ((field [0] = 0xffffffff,      field [0])) .toBe ("4294967295")
   expect ((field [0] = 666,             field [0])) .toBe ("666")
   expect ((field [0] = -666,            field [0])) .toBe ("-666")
})

test ("getter", () =>
{
   const field = new MFString ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFString)
   expect (field .getTypeName ()) .toBe ("MFString")
})

test ("equals", () =>
{
   const
      a = new MFString (),
      b = new MFString (true)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFString (),
      b = new MFString (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFString ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe ("")
   expect (a) .toHaveLength (1)

   const b = new MFString ("1","2","3","4","5")
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe ("1")
   expect (b [1]) .toBe ("2")
   expect (b [2]) .toBe ("3")
   expect (b [3]) .toBe ("4")
   expect (b [4]) .toBe ("5")

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe ("1")
   expect (c [1]) .toBe ("2")
   expect (c [2]) .toBe ("3")
   expect (c [3]) .toBe ("4")
   expect (c [4]) .toBe ("5")
})

test ("basic-functions", () =>
{
   const a = new MFString ("Infinity")

   expect (a [0]) .toBe ("Infinity")
   a [1] = "Infinity"
   expect (a [1]) .toBe ("Infinity")
   a .push ("Infinity")
   expect (a .at (-1)) .toBe ("Infinity")
   a .unshift ("Infinity")
   expect (a [0]) .toBe ("Infinity")
   expect (a) .toHaveLength (4)
   expect (a .splice (1, 1, "Infinity")) .toHaveLength (1)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe ("Infinity")
   expect (a .splice (1, 1, "NaN")) .toHaveLength (1)
   expect (a [1]) .toBe ("NaN")
   expect (a .splice (1, 0, "NaN")) .toHaveLength (0)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe ("Infinity")
   expect (a [1]) .toBe ("NaN")
   expect (a [2]) .toBe ("NaN")
   expect (a [3]) .toBe ("Infinity")
   expect (a [4]) .toBe ("Infinity")

   a .fill ("NaN")
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe ("NaN")
   expect (a [1]) .toBe ("NaN")
   expect (a [2]) .toBe ("NaN")
   expect (a [3]) .toBe ("NaN")
   expect (a [4]) .toBe ("NaN")

   expect (a .includes ("foo")) .toBe (false)
   expect (a .indexOf ("foo")) .toBe (-1)
   expect (a .lastIndexOf ("foo")) .toBe (-1)

   a .fill ("Infinity")
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe ("Infinity")
   expect (a [1]) .toBe ("Infinity")
   expect (a [2]) .toBe ("Infinity")
   expect (a [3]) .toBe ("Infinity")
   expect (a [4]) .toBe ("Infinity")

   expect (a .includes ("Infinity")) .toBe (true)
   expect (a .indexOf ("Infinity")) .toBe (0)
   expect (a .lastIndexOf ("Infinity")) .toBe (a .length - 1)

   a [1] = "NaN"
   a [3] = "NaN"

   expect (a .includes ("NaN")) .toBe (true)
   expect (a .indexOf ("NaN")) .toBe (1)
   expect (a .lastIndexOf ("NaN")) .toBe (3)

   expect (a .splice (0, 5, "Infinity", "Infinity", "Infinity", "Infinity", "Infinity")) .toHaveLength (5)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe ("Infinity")
   expect (a [1]) .toBe ("Infinity")
   expect (a [2]) .toBe ("Infinity")
   expect (a [3]) .toBe ("Infinity")
   expect (a [4]) .toBe ("Infinity")
})

test ("concat", () =>
{
   const
      N = 10,
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (String (++n))

   expect (a) .toHaveLength (N)

   const b = a .concat (["1000","1001"])

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N + 2)

   for (let i = 0; i < N; ++ i)
      expect (b [i]) .toBe (a [i])

   expect (b [N + 0]) .toBe ("1000")
   expect (b [N + 1]) .toBe ("1001")
})

test ("fill", () =>
{
   const a = new MFString ("0", "0", "0", "0", "0", "0")

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("0")
   expect (a [1]) .toBe ("0")
   expect (a [2]) .toBe ("0")
   expect (a [3]) .toBe ("0")
   expect (a [4]) .toBe ("0")
   expect (a [5]) .toBe ("0")

   a .fill ("1")

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("1")
   expect (a [1]) .toBe ("1")
   expect (a [2]) .toBe ("1")
   expect (a [3]) .toBe ("1")
   expect (a [4]) .toBe ("1")
   expect (a [5]) .toBe ("1")

   a .fill (2)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("2")
   expect (a [1]) .toBe ("2")
   expect (a [2]) .toBe ("2")
   expect (a [3]) .toBe ("2")
   expect (a [4]) .toBe ("2")
   expect (a [5]) .toBe ("2")
})

test ("filter", () =>
{
   const
      N = 10,
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (String (++n))

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
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (String (++n))

   const b = a .flat ()

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N)

   for (let i = 0, n = 0; i < N; ++ i)
      expect (b [i]) .toBe (String (++n))
})

test ("flatMap", () =>
{
   const
      N = 10,
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (String (++n))

   const b = a .flatMap (v => [v, v])

   expect (b) .toBeInstanceOf (Array)
   expect (Array .isArray (b)) .toBe (true)
   expect (b) .toHaveLength (N * 2)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      expect (b [i * 2 + 0]) .toBe (String (++n))
      expect (b [i * 2 + 1]) .toBe (String (n))
   }
})

test ("map", () =>
{
   const
      N = 10,
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (String (++n))

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
      a = new MFString ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = String (++n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = String (++n)
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .pop ()) .toBe (b .pop ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = 0; i < a .length; ++ i)
      {
         const v = String (++n)
         expect (a [i]) .toBe (v)
      }
   }
})

test ("push", () =>
{
   const
      N = 1_000,
      a = new MFString ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = String (++n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = String (++n)
      expect (a [i]) .toBe (v)
   }
})

test ("shift", () =>
{
   const
      N = 10,
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = String (++n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = String (++n)
      expect (a [i]) .toBe (v)
   }

   const b = a .slice ()

   for (let j = 0; j < N; ++ j)
   {
      expect (a .shift ()) .toBe (b .shift ())
      expect (a) .toHaveLength (N - j - 1)

      for (let i = 0, n = j + 1; i < a .length; ++ i)
      {
         const v = String (++n)
         expect (a [i]) .toBe (v)
      }
   }
})

test ("slice", () =>
{
   const
      N = 10,
      a = new MFString ()

   for (let i = 0, n = 0; i < N; ++ i)
      a .push (String (++n))

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
   const a = new MFString ("1", "2", "3", "4", "5", "6")

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("1")
   expect (a [1]) .toBe ("2")
   expect (a [2]) .toBe ("3")
   expect (a [3]) .toBe ("4")
   expect (a [4]) .toBe ("5")
   expect (a [5]) .toBe ("6")

   expect (a .reverse ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("6")
   expect (a [1]) .toBe ("5")
   expect (a [2]) .toBe ("4")
   expect (a [3]) .toBe ("3")
   expect (a [4]) .toBe ("2")
   expect (a [5]) .toBe ("1")

   expect (a .sort ()) .toBe (a)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("1")
   expect (a [1]) .toBe ("2")
   expect (a [2]) .toBe ("3")
   expect (a [3]) .toBe ("4")
   expect (a [4]) .toBe ("5")
   expect (a [5]) .toBe ("6")

   const Algorithm = X3D .require ("standard/Math/Algorithm")

   a .sort ((a, b) => Algorithm .cmp (b, a))

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("6")
   expect (a [1]) .toBe ("5")
   expect (a [2]) .toBe ("4")
   expect (a [3]) .toBe ("3")
   expect (a [4]) .toBe ("2")
   expect (a [5]) .toBe ("1")
})
