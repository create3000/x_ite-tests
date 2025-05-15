const
   X3D      = require ("../../X3D"),
   SFString = X3D .SFString

test ("constructor", () =>
{
   expect (new SFString ()                .valueOf ()) .toBe ("")
   expect (new SFString (NaN)             .valueOf ()) .toBe ("NaN")
   expect (new SFString (Infinity)        .valueOf ()) .toBe ("Infinity")
   expect (new SFString (-Infinity)       .valueOf ()) .toBe ("-Infinity")
   expect (new SFString (undefined)       .valueOf ()) .toBe ("undefined")
   expect (new SFString (null)            .valueOf ()) .toBe ("null")
   expect (new SFString ({})              .valueOf ()) .toBe ("[object Object]")
   expect (new SFString ("")              .valueOf ()) .toBe ("")
   expect (new SFString ("123")           .valueOf ()) .toBe ("123")
   expect (new SFString ("123.456")       .valueOf ()) .toBe ("123.456")
   expect (new SFString (false)           .valueOf ()) .toBe ("false")
   expect (new SFString (true)            .valueOf ()) .toBe ("true")
   expect (new SFString (123.456)         .valueOf ()) .toBe ("123.456")
   expect (new SFString (123_456_789_012) .valueOf ()) .toBe ("123456789012")
   expect (new SFString (0xffffffff)      .valueOf ()) .toBe ("4294967295")
   expect (new SFString (666)             .valueOf ()) .toBe ("666")
   expect (new SFString (-666)            .valueOf ()) .toBe ("-666")
})

test ("enumerate", () =>
{
   enumerate ([ ], new SFString ())
})

test ("setValue", () =>
{
   const field = new SFString ()

   expect ((field .setValue (),                field .valueOf ())) .toBe ("undefined")
   expect ((field .setValue (NaN),             field .valueOf ())) .toBe ("NaN")
   expect ((field .setValue (Infinity),        field .valueOf ())) .toBe ("Infinity")
   expect ((field .setValue (-Infinity),       field .valueOf ())) .toBe ("-Infinity")
   expect ((field .setValue (undefined),       field .valueOf ())) .toBe ("undefined")
   expect ((field .setValue (null),            field .valueOf ())) .toBe ("null")
   expect ((field .setValue ({}),              field .valueOf ())) .toBe ("[object Object]")
   expect ((field .setValue (""),              field .valueOf ())) .toBe ("")
   expect ((field .setValue ("123"),           field .valueOf ())) .toBe ("123")
   expect ((field .setValue ("123.456"),       field .valueOf ())) .toBe ("123.456")
   expect ((field .setValue (false),           field .valueOf ())) .toBe ("false")
   expect ((field .setValue (true),            field .valueOf ())) .toBe ("true")
   expect ((field .setValue (123.456),         field .valueOf ())) .toBe ("123.456")
   expect ((field .setValue (123_456_789_012), field .valueOf ())) .toBe ("123456789012")
   expect ((field .setValue (0xffffffff),      field .valueOf ())) .toBe ("4294967295")
   expect ((field .setValue (666),             field .valueOf ())) .toBe ("666")
   expect ((field .setValue (-666),            field .valueOf ())) .toBe ("-666")
})

test ("common", () =>
{
   const field = new SFString ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFString)
   expect (field .getTypeName ()) .toBe ("SFString")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFString]")
})

test ("copy", () =>
{
   const
      v1 = new SFString ("2"),
      v2 = v1 .copy ();

   expect (v2) .not .toBe (v1);
   expect (v2 .equals (v1)) .toBe (true);
   expect (v2 .equals ("2")) .toBe (true);
});

test ("equals", () =>
{
   const
      a = new SFString (""),
      b = new SFString ("1");

   expect (a .equals (a)) .toBe (true);
   expect (b .equals (b)) .toBe (true);
   expect (a .equals (b)) .toBe (false);
});

test ("isDefaultValue", () =>
{
   const
      a = new SFString (""),
      b = new SFString ("1");

   expect (a .isDefaultValue ()) .toBe (true);
   expect (b .isDefaultValue ()) .toBe (false);
});

test ("length", () =>
{
   expect (new SFString ("")) .toHaveLength (0);
   expect (new SFString ("1")) .toHaveLength (1);
   expect (new SFString ("12")) .toHaveLength (2);
   expect (new SFString ("123")) .toHaveLength (3);
});

test ("fromString", () =>
{
   const a = new SFString ();

   a .fromString (`"abcd"`);

   expect (a .equals (new SFString ("abcd"))) .toBe (true);

   a .fromString (`""`);

   expect (a .equals (new SFString ())) .toBe (true);
});

test ("fromVRMLString", () =>
{
   const a = new SFString ();

   a .fromVRMLString (`"abcd"`);

   expect (a .equals (new SFString ("abcd"))) .toBe (true);

   a .fromVRMLString (`""`);

   expect (a .equals (new SFString ())) .toBe (true);
});

