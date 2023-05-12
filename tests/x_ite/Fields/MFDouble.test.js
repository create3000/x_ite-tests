const
   X3D    = require ("../../X3D"),
   MFDouble = X3D .MFDouble

test ("constructor", () =>
{
   let field;

   expect ((field = new MFDouble (), field [0]))                .toBe (0)
   expect ((field = new MFDouble (NaN), field [0]))             .toBe (NaN)
   expect ((field = new MFDouble (Infinity), field [0]))        .toBe (Infinity)
   expect ((field = new MFDouble (-Infinity), field [0]))       .toBe (-Infinity)
   expect ((field = new MFDouble (undefined), field [0]))       .toBe (NaN)
   expect ((field = new MFDouble (null), field [0]))            .toBe (0)
   expect ((field = new MFDouble ({}), field [0]))              .toBe (NaN)
   expect ((field = new MFDouble (""), field [0]))              .toBe (0)
   expect ((field = new MFDouble ("123"), field [0]))           .toBe (123)
   expect ((field = new MFDouble ("123.456"), field [0]))       .toBe (123.456)
   expect ((field = new MFDouble (false), field [0]))           .toBe (0)
   expect ((field = new MFDouble (true), field [0]))            .toBe (1)
   expect ((field = new MFDouble (123.456), field [0]))         .toBe (123.456)
   expect ((field = new MFDouble (123_456_789_012), field [0])) .toBe (123_456_789_012)
   expect ((field = new MFDouble (0xffffffff), field [0]))      .toBe (0xffffffff)
   expect ((field = new MFDouble (666), field [0]))             .toBe (666)
   expect ((field = new MFDouble (-666), field [0]))            .toBe (-666)
})

test ("setValue", () =>
{
   const field = new MFDouble ();

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
   const field = new MFDouble ();

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFDouble)
   expect (field .getTypeName ()) .toBe ("MFDouble")
})

test ("equals", () =>
{
   const
      a = new MFDouble (),
      b = new MFDouble (true);

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFDouble (),
      b = new MFDouble (true);

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

