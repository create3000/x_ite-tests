const
   X3D    = require ("../../X3D"),
   SFBool = X3D .SFBool

test ("constructor", () =>
{
   expect (new SFBool ()                .valueOf ()) .toBe (false)
   expect (new SFBool (NaN)             .valueOf ()) .toBe (false)
   expect (new SFBool (Infinity)        .valueOf ()) .toBe (true)
   expect (new SFBool (-Infinity)       .valueOf ()) .toBe (true)
   expect (new SFBool (undefined)       .valueOf ()) .toBe (false)
   expect (new SFBool (null)            .valueOf ()) .toBe (false)
   expect (new SFBool ({})              .valueOf ()) .toBe (true)
   expect (new SFBool ("")              .valueOf ()) .toBe (false)
   expect (new SFBool ("123")           .valueOf ()) .toBe (true)
   expect (new SFBool ("123.456")       .valueOf ()) .toBe (true)
   expect (new SFBool (false)           .valueOf ()) .toBe (false)
   expect (new SFBool (true)            .valueOf ()) .toBe (true)
   expect (new SFBool (123.456)         .valueOf ()) .toBe (true)
   expect (new SFBool (123_456_789_012) .valueOf ()) .toBe (true)
   expect (new SFBool (0xffffffff)      .valueOf ()) .toBe (true)
   expect (new SFBool (666)             .valueOf ()) .toBe (true)
   expect (new SFBool (-666)            .valueOf ()) .toBe (true)
})

test ("setValue", () =>
{
   const field = new SFBool ()

   expect ((field .setValue (),                field .valueOf ())) .toBe (false)
   expect ((field .setValue (NaN),             field .valueOf ())) .toBe (false)
   expect ((field .setValue (Infinity),        field .valueOf ())) .toBe (true)
   expect ((field .setValue (-Infinity),       field .valueOf ())) .toBe (true)
   expect ((field .setValue (undefined),       field .valueOf ())) .toBe (false)
   expect ((field .setValue (null),            field .valueOf ())) .toBe (false)
   expect ((field .setValue ({}),              field .valueOf ())) .toBe (true)
   expect ((field .setValue (""),              field .valueOf ())) .toBe (false)
   expect ((field .setValue ("123"),           field .valueOf ())) .toBe (true)
   expect ((field .setValue ("123.456"),       field .valueOf ())) .toBe (true)
   expect ((field .setValue (false),           field .valueOf ())) .toBe (false)
   expect ((field .setValue (true),            field .valueOf ())) .toBe (true)
   expect ((field .setValue (123.456),         field .valueOf ())) .toBe (true)
   expect ((field .setValue (123_456_789_012), field .valueOf ())) .toBe (true)
   expect ((field .setValue (0xffffffff),      field .valueOf ())) .toBe (true)
   expect ((field .setValue (666),             field .valueOf ())) .toBe (true)
   expect ((field .setValue (-666),            field .valueOf ())) .toBe (true)
})

test ("common", () =>
{
   const field = new SFBool ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFBool)
   expect (field .getTypeName ()) .toBe ("SFBool")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFBool]")
})

test ("copy", () =>
{
   const
      v1 = new SFBool (true),
      v2 = v1 .copy (),
      v3 = new SFBool (false),
      v4 = v3 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
   expect (v2 .equals (true)) .toBe (true)
   expect (v4) .not .toBe (v3)
   expect (v4 .equals (v3)) .toBe (true)
   expect (v4 .equals (false)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFBool (false),
      b = new SFBool (true)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFBool (false),
      b = new SFBool (true)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})
