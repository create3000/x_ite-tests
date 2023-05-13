const
   X3D    = require ("../../X3D"),
   MFBool = X3D .MFBool

test ("constructor", () =>
{
   let field

   expect ((field = new MFBool (), field [0]))                .toBe (false)
   expect ((field = new MFBool (NaN), field [0]))             .toBe (false)
   expect ((field = new MFBool (Infinity), field [0]))        .toBe (true)
   expect ((field = new MFBool (-Infinity), field [0]))       .toBe (true)
   expect ((field = new MFBool (undefined), field [0]))       .toBe (false)
   expect ((field = new MFBool (null), field [0]))            .toBe (false)
   expect ((field = new MFBool ({}), field [0]))              .toBe (true)
   expect ((field = new MFBool (""), field [0]))              .toBe (false)
   expect ((field = new MFBool ("123"), field [0]))           .toBe (true)
   expect ((field = new MFBool ("123.456"), field [0]))       .toBe (true)
   expect ((field = new MFBool (false), field [0]))           .toBe (false)
   expect ((field = new MFBool (true), field [0]))            .toBe (true)
   expect ((field = new MFBool (123.456), field [0]))         .toBe (true)
   expect ((field = new MFBool (123_456_789_012), field [0])) .toBe (true)
   expect ((field = new MFBool (0xffffffff), field [0]))      .toBe (true)
   expect ((field = new MFBool (666), field [0]))             .toBe (true)
   expect ((field = new MFBool (-666), field [0]))            .toBe (true)
})

test ("setValue", () =>
{
   const field = new MFBool ()

   expect ((field [0] = NaN,             field [0])) .toBe (false)
   expect ((field [0] = Infinity,        field [0])) .toBe (true)
   expect ((field [0] = -Infinity,       field [0])) .toBe (true)
   expect ((field [0] = undefined,       field [0])) .toBe (false)
   expect ((field [0] = null,            field [0])) .toBe (false)
   expect ((field [0] = {},              field [0])) .toBe (true)
   expect ((field [0] = "",              field [0])) .toBe (false)
   expect ((field [0] = "123",           field [0])) .toBe (true)
   expect ((field [0] = "123.456",       field [0])) .toBe (true)
   expect ((field [0] = false,           field [0])) .toBe (false)
   expect ((field [0] = true,            field [0])) .toBe (true)
   expect ((field [0] = 123.456,         field [0])) .toBe (true)
   expect ((field [0] = 123_456_789_012, field [0])) .toBe (true)
   expect ((field [0] = 0xffffffff,      field [0])) .toBe (true)
   expect ((field [0] = 666,             field [0])) .toBe (true)
   expect ((field [0] = -666,            field [0])) .toBe (true)
})

test ("getter", () =>
{
   const field = new MFBool ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFBool)
   expect (field .getTypeName ()) .toBe ("MFBool")
})

test ("equals", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFBool ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe (false)
   expect (a) .toHaveLength (1)

   const b = new MFBool (true,false,true,false,true)
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe (true)
   expect (b [1]) .toBe (false)
   expect (b [2]) .toBe (true)
   expect (b [3]) .toBe (false)
   expect (b [4]) .toBe (true)

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe (true)
   expect (c [1]) .toBe (false)
   expect (c [2]) .toBe (true)
   expect (c [3]) .toBe (false)
   expect (c [4]) .toBe (true)
})

test ("special-values", () =>
{
   const a = new MFBool (Infinity)

   expect (a [0]) .toBe (true)
   a [1] = Infinity
   expect (a [1]) .toBe (true)
   a .push (Infinity)
   expect (a .at (-1)) .toBe (true)
   a .unshift (Infinity)
   expect (a [0]) .toBe (true)
   expect (a) .toHaveLength (4)
   a .splice (1, 1, Infinity)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe (true)
   a .splice (1, 1, 0)
   expect (a [1]) .toBe (false)
   a .splice (1, 0, NaN)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)

   a .fill (NaN)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)

   expect (a .includes (true)) .toBe (false)
   expect (a .indexOf (true)) .toBe (-1)
   expect (a .lastIndexOf (true)) .toBe (-1)

   a .fill (Infinity)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)

   expect (a .includes (true)) .toBe (true)
   expect (a .indexOf (true)) .toBe (0)
   expect (a .lastIndexOf (true)) .toBe (a .length - 1)

   a [1] = false
   a [3] = false

   expect (a .includes (false)) .toBe (true)
   expect (a .indexOf (false)) .toBe (1)
   expect (a .lastIndexOf (false)) .toBe (3)

   a .splice (0, 5, Infinity, Infinity, Infinity, Infinity, Infinity)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)
})

test ("fill", () =>
{
   const a = new MFBool (false, false, false, false, false, false)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (false)

   a .fill (true)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)
   expect (a [5]) .toBe (true)

   a .fill (false)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (false)
})

test ("push", () =>
{
   const a = new MFBool ()

   expect (a) .toHaveLength (0)

   for (let i = 0, n = false; i < 1_000; ++ i)
   {
      const v = (n=!n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = false; i < 1_000; ++ i)
   {
      const v = (n=!n)
      expect (a [i]) .toBe (v)
   }
})

test ("shift", () =>
{
   const a = new MFBool ()

   for (let i = 0, n = false; i < 10; ++ i)
   {
      const v = (n=!n)
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   for (let i = 0, n = false; i < 10; ++ i)
   {
      const v = (n=!n)
      expect (a [i]) .toBe (v)
   }

   for (let j = 0; j < 10; ++ j)
   {
      a .shift ()
      expect (a) .toHaveLength (10 - j - 1)

      for (let i = 0, n = !(j%2); i < a .length; ++ i)
      {
         const v = (n=!n)
         expect (a [i]) .toBe (v)
      }
   }
})

test ("sort-reverse", () =>
{
   const a = new MFBool (true, false, true, false, true, false)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (true)
   expect (a [5]) .toBe (false)

   a .reverse ()

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (true)

   a .sort ()

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (false)
   expect (a [1]) .toBe (false)
   expect (a [2]) .toBe (false)
   expect (a [3]) .toBe (true)
   expect (a [4]) .toBe (true)
   expect (a [5]) .toBe (true)

   const Algorithm = X3D .require ("standard/Math/Algorithm")

   a .sort ((a, b) => Algorithm .cmp (b, a))

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (true)
   expect (a [1]) .toBe (true)
   expect (a [2]) .toBe (true)
   expect (a [3]) .toBe (false)
   expect (a [4]) .toBe (false)
   expect (a [5]) .toBe (false)
})
