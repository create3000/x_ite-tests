const
   X3D    = require ("../../X3D"),
   MFBool = X3D .MFBool

test ("constructor", () =>
{
   let field;

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
   const field = new MFBool ();

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
   const field = new MFBool ();

   expect (field .getType ()) .toBe (X3D .X3DConstants .MFBool)
   expect (field .getTypeName ()) .toBe ("MFBool")
})

test ("equals", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true);

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new MFBool (),
      b = new MFBool (true);

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

