const
   X3D     = require ("../../X3D"),
   SFFloat = X3D .SFFloat

test ("constructor", () =>
{
   expect (new SFFloat ()                .valueOf ()) .toBe (0)
   expect (new SFFloat (NaN)             .valueOf ()) .toBe (NaN)
   expect (new SFFloat (Infinity)        .valueOf ()) .toBe (Infinity)
   expect (new SFFloat (-Infinity)       .valueOf ()) .toBe (-Infinity)
   expect (new SFFloat (undefined)       .valueOf ()) .toBe (NaN)
   expect (new SFFloat (null)            .valueOf ()) .toBe (0)
   expect (new SFFloat ({})              .valueOf ()) .toBe (NaN)
   expect (new SFFloat ("")              .valueOf ()) .toBe (0)
   expect (new SFFloat ("123")           .valueOf ()) .toBe (123)
   expect (new SFFloat ("123.456")       .valueOf ()) .toBe (123.456)
   expect (new SFFloat (false)           .valueOf ()) .toBe (0)
   expect (new SFFloat (true)            .valueOf ()) .toBe (1)
   expect (new SFFloat (123.456)         .valueOf ()) .toBe (123.456)
   expect (new SFFloat (123_456_789_012) .valueOf ()) .toBe (123_456_789_012)
   expect (new SFFloat (0xffffffff)      .valueOf ()) .toBe (0xffffffff)
   expect (new SFFloat (666)             .valueOf ()) .toBe (666)
   expect (new SFFloat (-666)            .valueOf ()) .toBe (-666)
})

test ("enumerate", () =>
{
   enumerate ([ ], new SFFloat ())
})

test ("setValue", () =>
{
   const field = new SFFloat ()

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
   const field = new SFFloat ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFFloat)
   expect (field .getTypeName ()) .toBe ("SFFloat")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFFloat]")
})

test ("copy", () =>
{
   const
      v1 = new SFFloat (2),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
   expect (v2 .equals (2)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFFloat (0),
      b = new SFFloat (1)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFFloat (0),
      b = new SFFloat (1)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("fromString", () =>
{
   const a = new SFFloat ();

   a .fromString ("123.456");

   expect (a .equals (new SFFloat (123.456))) .toBe (true);

   a .fromString ("NaN");

   expect (isNaN (a .valueOf ())) .toBe (true);

   a .fromString ("Infinity");

   expect (a .equals (new SFFloat (Infinity))) .toBe (true);

   a .fromString ("pi");
});

test ("fromVRMLString", () =>
{
   const a = new SFFloat ();

   a .fromVRMLString ("123.456");

   expect (a .equals (new SFFloat (123.456))) .toBe (true);

   a .fromVRMLString ("NaN");

   expect (isNaN (a .valueOf ())) .toBe (true);

   a .fromVRMLString ("Infinity");

   expect (a .equals (new SFFloat (Infinity))) .toBe (true);

   a .fromVRMLString ("pi");
});
