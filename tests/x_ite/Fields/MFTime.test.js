const
   X3D    = require ("../../X3D"),
   MFTime = X3D .MFTime

test ("constructor", () =>
{
   let field;

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
   const field = new MFTime ();

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
   const field = new MFTime ();

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFTime)
   expect (field .getTypeName ()) .toBe ("MFTime")
})

test ("equals", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (true);

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFTime (),
      b = new MFTime (true);

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

