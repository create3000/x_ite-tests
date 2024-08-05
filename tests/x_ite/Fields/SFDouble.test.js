const
   X3D     = require ("../../X3D"),
   SFDouble = X3D .SFDouble

test ("constructor", () =>
{
   expect (new SFDouble ()                .valueOf ()) .toBe (0)
   expect (new SFDouble (NaN)             .valueOf ()) .toBe (NaN)
   expect (new SFDouble (Infinity)        .valueOf ()) .toBe (Infinity)
   expect (new SFDouble (-Infinity)       .valueOf ()) .toBe (-Infinity)
   expect (new SFDouble (undefined)       .valueOf ()) .toBe (NaN)
   expect (new SFDouble (null)            .valueOf ()) .toBe (0)
   expect (new SFDouble ({})              .valueOf ()) .toBe (NaN)
   expect (new SFDouble ("")              .valueOf ()) .toBe (0)
   expect (new SFDouble ("123")           .valueOf ()) .toBe (123)
   expect (new SFDouble ("123.456")       .valueOf ()) .toBe (123.456)
   expect (new SFDouble (false)           .valueOf ()) .toBe (0)
   expect (new SFDouble (true)            .valueOf ()) .toBe (1)
   expect (new SFDouble (123.456)         .valueOf ()) .toBe (123.456)
   expect (new SFDouble (123_456_789_012) .valueOf ()) .toBe (123_456_789_012)
   expect (new SFDouble (0xffffffff)      .valueOf ()) .toBe (0xffffffff)
   expect (new SFDouble (666)             .valueOf ()) .toBe (666)
   expect (new SFDouble (-666)            .valueOf ()) .toBe (-666)
})

test ("enumerate", () =>
{
   enumerate ([ ], new SFDouble ())
})

test ("setValue", () =>
{
   const field = new SFDouble ()

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

test ("common", () =>
{
   const field = new SFDouble ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFDouble)
   expect (field .getTypeName ()) .toBe ("SFDouble")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFDouble]")
})

test ("copy", () =>
{
   const
      v1 = new SFDouble (2),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
   expect (v2 .equals (2)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFDouble (0),
      b = new SFDouble (1)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFDouble (0),
      b = new SFDouble (1)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})
