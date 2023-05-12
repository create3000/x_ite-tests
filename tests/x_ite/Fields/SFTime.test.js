const
   X3D     = require ("../../X3D"),
   SFTime = X3D .require ("x_ite/Fields/SFTime")

test ("constructor", () =>
{
   expect (new SFTime ()                .valueOf ()) .toBe (0)
   expect (new SFTime (NaN)             .valueOf ()) .toBe (NaN)
   expect (new SFTime (Infinity)        .valueOf ()) .toBe (Infinity)
   expect (new SFTime (-Infinity)       .valueOf ()) .toBe (-Infinity)
   expect (new SFTime (undefined)       .valueOf ()) .toBe (NaN)
   expect (new SFTime (null)            .valueOf ()) .toBe (0)
   expect (new SFTime ({})              .valueOf ()) .toBe (NaN)
   expect (new SFTime ("")              .valueOf ()) .toBe (0)
   expect (new SFTime ("123")           .valueOf ()) .toBe (123)
   expect (new SFTime ("123.456")       .valueOf ()) .toBe (123.456)
   expect (new SFTime (false)           .valueOf ()) .toBe (0)
   expect (new SFTime (true)            .valueOf ()) .toBe (1)
   expect (new SFTime (123.456)         .valueOf ()) .toBe (123.456)
   expect (new SFTime (123_456_789_012) .valueOf ()) .toBe (123_456_789_012)
   expect (new SFTime (0xffffffff)      .valueOf ()) .toBe (0xffffffff)
   expect (new SFTime (666)             .valueOf ()) .toBe (666)
   expect (new SFTime (-666)            .valueOf ()) .toBe (-666)
})

test ("setValue", () =>
{
   const field = new SFTime ();

   expect ((field .setValue (),                field .valueOf ())) .toBe (NaN)
   expect ((field .setValue (NaN),             field .valueOf ())) .toBe (NaN)
   expect ((field .setValue (Infinity),        field .valueOf ())) .toBe (Infinity)
   expect ((field .setValue (-Infinity),       field .valueOf ())) .toBe (-Infinity)
   expect ((field .setValue (undefined),       field .valueOf ())) .toBe (NaN)
   expect ((field .setValue (null),            field .valueOf ())) .toBe (0)
   expect ((field .setValue ({}),              field .valueOf ())) .toBe (NaN)
   expect ((field .setValue (""),              field .valueOf ())) .toBe (0)
   expect ((field .setValue ("123"),           field .valueOf ())) .toBe (123)
   expect ((field .setValue ("123.456"),       field .valueOf ())) .toBe (123.456)
   expect ((field .setValue (false),           field .valueOf ())) .toBe (0)
   expect ((field .setValue (true),            field .valueOf ())) .toBe (1)
   expect ((field .setValue (123.456),         field .valueOf ())) .toBe (123.456)
   expect ((field .setValue (123_456_789_012), field .valueOf ())) .toBe (123_456_789_012)
   expect ((field .setValue (0xffffffff),      field .valueOf ())) .toBe (4294967295)
   expect ((field .setValue (666),             field .valueOf ())) .toBe (666)
   expect ((field .setValue (-666),            field .valueOf ())) .toBe (-666)
})

test ("getter", () =>
{
   const field = new SFTime ();

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFTime)
   expect (field .getTypeName ()) .toBe ("SFTime")
})

test ("equals", () =>
{
   const
      a = new SFTime (0),
      b = new SFTime (1);

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFTime (0),
      b = new SFTime (1);

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})
