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

   const b = new MFString ("true","false","true","false","true")
   expect (b) .toHaveLength (5)
   expect (b [0]) .toBe ("true")
   expect (b [1]) .toBe ("false")
   expect (b [2]) .toBe ("true")
   expect (b [3]) .toBe ("false")
   expect (b [4]) .toBe ("true")

   const c = [... b]
   expect (c) .toHaveLength (5)
   expect (c [0]) .toBe ("true")
   expect (c [1]) .toBe ("false")
   expect (c [2]) .toBe ("true")
   expect (c [3]) .toBe ("false")
   expect (c [4]) .toBe ("true")
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
   a .splice (1, 1, "Infinity")
   expect (a) .toHaveLength (4)
   expect (a [1]) .toBe ("Infinity")
   a .splice (1, 1, "NaN")
   expect (a [1]) .toBe ("NaN")
   a .splice (1, 0, "NaN")
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

   a .splice (0, 5, "Infinity", "Infinity", "Infinity", "Infinity", "Infinity")
   expect (a) .toHaveLength (5)
   expect (a [0]) .toBe ("Infinity")
   expect (a [1]) .toBe ("Infinity")
   expect (a [2]) .toBe ("Infinity")
   expect (a [3]) .toBe ("Infinity")
   expect (a [4]) .toBe ("Infinity")
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

   a .reverse ()

   expect (a) .toHaveLength (6)
   expect (a [0]) .toBe ("6")
   expect (a [1]) .toBe ("5")
   expect (a [2]) .toBe ("4")
   expect (a [3]) .toBe ("3")
   expect (a [4]) .toBe ("2")
   expect (a [5]) .toBe ("1")

   a .sort ()

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