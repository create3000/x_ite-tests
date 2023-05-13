const
   X3D    = require ("../../X3D"),
   MFTime = X3D .MFTime

test ("constructor", () =>
{
   let field

   expect ((field = new MFTime (), field [0]))                .toBe (0)
   expect ((field = new MFTime (NaN), field [0]))             .toBe (NaN)
   expect ((field = new MFTime (Infinity), field [0]))        .toBe (Infinity)
   expect ((field = new MFTime (-Infinity), field [0]))       .toBe (-Infinity)
   expect ((field = new MFTime (undefined), field [0]))       .toBe (NaN)
   expect ((field = new MFTime (null), field [0]))            .toBe (0)
   expect ((field = new MFTime ({}), field [0]))              .toBe (NaN)
   expect ((field = new MFTime (""), field [0]))              .toBe (0)
   expect ((field = new MFTime ("123"), field [0]))           .toBe (123)
   expect ((field = new MFTime ("123.456"), field [0]))       .toBe (123.456)
   expect ((field = new MFTime (false), field [0]))           .toBe (0)
   expect ((field = new MFTime (true), field [0]))            .toBe (1)
   expect ((field = new MFTime (123.456), field [0]))         .toBe (123.456)
   expect ((field = new MFTime (123_456_789_012), field [0])) .toBe (123_456_789_012)
   expect ((field = new MFTime (0xffffffff), field [0]))      .toBe (0xffffffff)
   expect ((field = new MFTime (666), field [0]))             .toBe (666)
   expect ((field = new MFTime (-666), field [0]))            .toBe (-666)
})

test ("setValue", () =>
{
   const field = new MFTime ()

   expect ((field [0] = NaN,             field [0])) .toBe (NaN)
   expect ((field [0] = Infinity,        field [0])) .toBe (Infinity)
   expect ((field [0] = -Infinity,       field [0])) .toBe (-Infinity)
   expect ((field [0] = undefined,       field [0])) .toBe (NaN)
   expect ((field [0] = null,            field [0])) .toBe (0)
   expect ((field [0] = {},              field [0])) .toBe (NaN)
   expect ((field [0] = "",              field [0])) .toBe (0)
   expect ((field [0] = "123",           field [0])) .toBe (123)
   expect ((field [0] = "123.456",       field [0])) .toBe (123.456)
   expect ((field [0] = false,           field [0])) .toBe (0)
   expect ((field [0] = true,            field [0])) .toBe (1)
   expect ((field [0] = 123.456,         field [0])) .toBe (123.456)
   expect ((field [0] = 123_456_789_012, field [0])) .toBe (123_456_789_012)
   expect ((field [0] = 0xffffffff,      field [0])) .toBe (4294967295)
   expect ((field [0] = 666,             field [0])) .toBe (666)
   expect ((field [0] = -666,            field [0])) .toBe (-666)
})

test ("getter", () =>
{
   const field = new MFTime ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFTime)
   expect (field .getTypeName ()) .toBe ("MFTime")
})

test ("equals", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (true)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("constructor", () =>
{
   const a = new MFTime ()

   expect (a) .toHaveLength (0)
   expect (a [0]) .toBe (0)
   expect (a) .toHaveLength (1)

   const b = new MFTime (1,2,3,4,5)
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
   const a = new MFTime (Infinity)

   expect (a [0]) .toBe (Infinity)
   a [1] = Infinity
   expect (a [1]) .toBe (Infinity)
   a .push (Infinity)
   expect (a .at (-1)) .toBe (Infinity)
   a .unshift (Infinity)
   expect (a [0]) .toBe (Infinity)
   expect (a) .toHaveLength (4)
   a .splice (1, 1, Infinity)
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe (Infinity)
   a .splice (1, 1, NaN)
   expect (a [1]) .toBe (NaN)
   a .splice (1, 0, NaN)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (Infinity)
   expect (a [1]) .toBe (NaN)
   expect (a [2]) .toBe (NaN)
   expect (a [3]) .toBe (Infinity)
   expect (a [4]) .toBe (Infinity)

   a .fill (NaN)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (NaN)
   expect (a [1]) .toBe (NaN)
   expect (a [2]) .toBe (NaN)
   expect (a [3]) .toBe (NaN)
   expect (a [4]) .toBe (NaN)

   expect (a .includes (123)) .toBe (false)
   expect (a .indexOf (123)) .toBe (-1)
   expect (a .lastIndexOf (123)) .toBe (-1)

   a .fill (Infinity)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (Infinity)
   expect (a [1]) .toBe (Infinity)
   expect (a [2]) .toBe (Infinity)
   expect (a [3]) .toBe (Infinity)
   expect (a [4]) .toBe (Infinity)

   expect (a .includes (Infinity)) .toBe (true)
   expect (a .indexOf (Infinity)) .toBe (0)
   expect (a .lastIndexOf (Infinity)) .toBe (a .length - 1)

   a [1] = 1
   a [3] = 1

   expect (a .includes (1)) .toBe (true)
   expect (a .indexOf (1)) .toBe (1)
   expect (a .lastIndexOf (1)) .toBe (3)

   a .splice (0, 5, Infinity, Infinity, Infinity, Infinity, Infinity)
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe (Infinity)
   expect (a [1]) .toBe (Infinity)
   expect (a [2]) .toBe (Infinity)
   expect (a [3]) .toBe (Infinity)
   expect (a [4]) .toBe (Infinity)
})

test ("fill", () =>
{
   const a = new MFTime (0, 0, 0, 0, 0, 0)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (0)
   expect (a [1]) .toBe (0)
   expect (a [2]) .toBe (0)
   expect (a [3]) .toBe (0)
   expect (a [4]) .toBe (0)
   expect (a [5]) .toBe (0)

   a .fill (1)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (1)
   expect (a [2]) .toBe (1)
   expect (a [3]) .toBe (1)
   expect (a [4]) .toBe (1)
   expect (a [5]) .toBe (1)

   a .fill (2)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (2)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (2)
   expect (a [3]) .toBe (2)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (2)
})

test ("push", () =>
{
   const a = new MFTime ()
   let n = 0;

   expect (a) .toHaveLength (0)

   n = 0;
   for (let i = 0; i < 1_000; ++ i)
   {
      const v = ++n
      a .push (v)
      expect (a [i]) .toBe (v)
      expect (a) .toHaveLength (i + 1)
   }

   n = 0;
   for (let i = 0; i < 1_000; ++ i)
   {
      const v = ++n
      expect (a [i]) .toBe (v)
   }
})

test ("sort-reverse", () =>
{
   const a = new MFTime (1, 2, 3, 4, 5, 6)

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
   expect (a [5]) .toBe (6)

   a .reverse ()

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (6)
   expect (a [1]) .toBe (5)
   expect (a [2]) .toBe (4)
   expect (a [3]) .toBe (3)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (1)

   a .sort ()

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (1)
   expect (a [1]) .toBe (2)
   expect (a [2]) .toBe (3)
   expect (a [3]) .toBe (4)
   expect (a [4]) .toBe (5)
   expect (a [5]) .toBe (6)

   const Algorithm = X3D .require ("standard/Math/Algorithm")

   a .sort ((a, b) => Algorithm .cmp (b, a))

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe (6)
   expect (a [1]) .toBe (5)
   expect (a [2]) .toBe (4)
   expect (a [3]) .toBe (3)
   expect (a [4]) .toBe (2)
   expect (a [5]) .toBe (1)
})
