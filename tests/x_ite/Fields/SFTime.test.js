const
   X3D     = require ("../../X3D"),
   SFTime = X3D .SFTime

test ("constructor", () =>
{
   expect (new SFTime ()                .valueOf ()) .toBe (-1)
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

test ("enumerate", () =>
{
   enumerate ([ ], new SFTime ())
})

test ("setValue", () =>
{
   const field = new SFTime ()

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
   const field = new SFTime ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFTime)
   expect (field .getTypeName ()) .toBe ("SFTime")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFTime]")
})

test ("copy", () =>
{
   const
      v1 = new SFTime (2),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
   expect (v2 .equals (2)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFTime (0),
      b = new SFTime (1)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFTime (-1),
      b = new SFTime (1),
      c = new SFTime ();

   expect (c .isDefaultValue ()) .toBe (true);
   expect (a .isDefaultValue ()) .toBe (true);
   expect (b .isDefaultValue ()) .toBe (false);
});

test ("fromString", () =>
{
   const a = new SFTime ();

   a .fromString ("123.456");

   expect (a .equals (new SFTime (123.456))) .toBe (true);

   a .fromString ("NaN");

   expect (isNaN (a .valueOf ())) .toBe (true);

   a .fromString ("Infinity");

   expect (a .equals (new SFTime (Infinity))) .toBe (true);

   a .fromString ("pi");

   expect (() => a .fromString ("foo")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new SFTime ();

   a .fromVRMLString ("123.456");

   expect (a .equals (new SFTime (123.456))) .toBe (true);

   a .fromVRMLString ("NaN");

   expect (isNaN (a .valueOf ())) .toBe (true);

   a .fromVRMLString ("Infinity");

   expect (a .equals (new SFTime (Infinity))) .toBe (true);

   a .fromVRMLString ("pi");

   expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new SFTime ();

   a .fromXMLString ("123.456");

   expect (a .equals (new SFTime (123.456))) .toBe (true);

   a .fromXMLString ("NaN");

   expect (isNaN (a .valueOf ())) .toBe (true);

   a .fromXMLString ("Infinity");

   expect (a .equals (new SFTime (Infinity))) .toBe (true);

   a .fromXMLString ("pi");

   expect (() => a .fromXMLString ("foo")) .toThrow (Error);
});
