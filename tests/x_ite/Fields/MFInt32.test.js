const
   X3D     = require ("../../X3D"),
   MFInt32 = X3D .MFInt32

test ("constructor", () =>
{
   let field;

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
   const field = new MFInt32 ();

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
   const field = new MFInt32 ();

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFInt32)
   expect (field .getTypeName ()) .toBe ("MFInt32")
})

test ("equals", () =>
{
   const
      a = new MFInt32 (),
      b = new MFInt32 (true);

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFInt32 (),
      b = new MFInt32 (true);

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

