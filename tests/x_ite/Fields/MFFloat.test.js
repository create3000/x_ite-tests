const
   X3D     = require ("../../X3D"),
   MFFloat = X3D .MFFloat

test ("constructor", () =>
{
   let field

   expect ((field = new MFFloat (), field [0]))                .toBe (0)
   expect ((field = new MFFloat (NaN), field [0]))             .toBe (NaN)
   expect ((field = new MFFloat (Infinity), field [0]))        .toBe (Infinity)
   expect ((field = new MFFloat (-Infinity), field [0]))       .toBe (-Infinity)
   expect ((field = new MFFloat (undefined), field [0]))       .toBe (NaN)
   expect ((field = new MFFloat (null), field [0]))            .toBe (0)
   expect ((field = new MFFloat ({}), field [0]))              .toBe (NaN)
   expect ((field = new MFFloat (""), field [0]))              .toBe (0)
   expect ((field = new MFFloat ("123"), field [0]))           .toBe (123)
   expect ((field = new MFFloat ("123.456"), field [0]))       .toBe (Math .fround (123.456))
   expect ((field = new MFFloat (false), field [0]))           .toBe (0)
   expect ((field = new MFFloat (true), field [0]))            .toBe (1)
   expect ((field = new MFFloat (123.456), field [0]))         .toBe (Math .fround (123.456))
   expect ((field = new MFFloat (123_456_789_012), field [0])) .toBe (Math .fround (123_456_789_012))
   expect ((field = new MFFloat (0xffffffff), field [0]))      .toBe (Math .fround (0xffffffff))
   expect ((field = new MFFloat (666), field [0]))             .toBe (666)
   expect ((field = new MFFloat (-666), field [0]))            .toBe (-666)
})

test ("setValue", () =>
{
   const field = new MFFloat ()

   expect ((field [0] = NaN,             field [0])) .toBe (NaN)
   expect ((field [0] = Infinity,        field [0])) .toBe (Infinity)
   expect ((field [0] = -Infinity,       field [0])) .toBe (-Infinity)
   expect ((field [0] = undefined,       field [0])) .toBe (NaN)
   expect ((field [0] = null,            field [0])) .toBe (0)
   expect ((field [0] = {},              field [0])) .toBe (NaN)
   expect ((field [0] = "",              field [0])) .toBe (0)
   expect ((field [0] = "123",           field [0])) .toBe (123)
   expect ((field [0] = "123.456",       field [0])) .toBe (Math .fround (123.456))
   expect ((field [0] = false,           field [0])) .toBe (0)
   expect ((field [0] = true,            field [0])) .toBe (1)
   expect ((field [0] = 123.456,         field [0])) .toBe (Math .fround (123.456))
   expect ((field [0] = 123_456_789_012, field [0])) .toBe (Math .fround (123_456_789_012))
   expect ((field [0] = 0xffffffff,      field [0])) .toBe (Math .fround (4294967295))
   expect ((field [0] = 666,             field [0])) .toBe (666)
   expect ((field [0] = -666,            field [0])) .toBe (-666)
})

test ("getter", () =>
{
   const field = new MFFloat ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFFloat)
   expect (field .getTypeName ()) .toBe ("MFFloat")
})

test ("equals", () =>
{
   const
      a = new MFFloat (),
      b = new MFFloat (true)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFFloat (),
      b = new MFFloat (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

