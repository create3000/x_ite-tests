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

