const
   X3D     = require ("../../X3D"),
   SFInt32 = X3D .SFInt32

test ("constructor", () =>
{
   expect (new SFInt32 ()                .valueOf ()) .toBe (0)
   expect (new SFInt32 (NaN)             .valueOf ()) .toBe (0)
   expect (new SFInt32 (Infinity)        .valueOf ()) .toBe (0)
   expect (new SFInt32 (-Infinity)       .valueOf ()) .toBe (0)
   expect (new SFInt32 (undefined)       .valueOf ()) .toBe (0)
   expect (new SFInt32 (null)            .valueOf ()) .toBe (0)
   expect (new SFInt32 ({})              .valueOf ()) .toBe (0)
   expect (new SFInt32 ("")              .valueOf ()) .toBe (0)
   expect (new SFInt32 ("123")           .valueOf ()) .toBe (123)
   expect (new SFInt32 ("123.456")       .valueOf ()) .toBe (123)
   expect (new SFInt32 (false)           .valueOf ()) .toBe (0)
   expect (new SFInt32 (true)            .valueOf ()) .toBe (1)
   expect (new SFInt32 (123.456)         .valueOf ()) .toBe (123)
   expect (new SFInt32 (123_456_789_012) .valueOf ()) .toBe (-1097262572)
   expect (new SFInt32 (0xffffffff)      .valueOf ()) .toBe (-1)
   expect (new SFInt32 (666)             .valueOf ()) .toBe (666)
   expect (new SFInt32 (-666)            .valueOf ()) .toBe (-666)
})

test ("enumerate", () =>
{
   enumerate ([ ], new SFInt32 ())
})

test ("setValue", () =>
{
   const field = new SFInt32 ()

   expect ((field .setValue (),                field .valueOf ())) .toBe (0)
   expect ((field .setValue (NaN),             field .valueOf ())) .toBe (0)
   expect ((field .setValue (Infinity),        field .valueOf ())) .toBe (0)
   expect ((field .setValue (-Infinity),       field .valueOf ())) .toBe (0)
   expect ((field .setValue (undefined),       field .valueOf ())) .toBe (0)
   expect ((field .setValue (null),            field .valueOf ())) .toBe (0)
   expect ((field .setValue ({}),              field .valueOf ())) .toBe (0)
   expect ((field .setValue (""),              field .valueOf ())) .toBe (0)
   expect ((field .setValue ("123"),           field .valueOf ())) .toBe (123)
   expect ((field .setValue ("123.456"),       field .valueOf ())) .toBe (123)
   expect ((field .setValue (false),           field .valueOf ())) .toBe (0)
   expect ((field .setValue (true),            field .valueOf ())) .toBe (1)
   expect ((field .setValue (123.456),         field .valueOf ())) .toBe (123)
   expect ((field .setValue (123_456_789_012), field .valueOf ())) .toBe (-1097262572)
   expect ((field .setValue (0xffffffff),      field .valueOf ())) .toBe (-1)
   expect ((field .setValue (666),             field .valueOf ())) .toBe (666)
   expect ((field .setValue (-666),            field .valueOf ())) .toBe (-666)
})

test ("common", () =>
{
   const field = new SFInt32 ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFInt32)
   expect (field .getTypeName ()) .toBe ("SFInt32")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFInt32]")
})

test ("copy", () =>
{
   const
      v1 = new SFInt32 (2),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
   expect (v2 .equals (2)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFInt32 (0),
      b = new SFInt32 (1)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFInt32 (0),
      b = new SFInt32 (1)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("fromString", () =>
{
   const a = new SFInt32 ();

   a .fromString ("123");

   expect (a .equals (new SFInt32 (123))) .toBe (true);

   a .fromString ("0xabcdef12");

   expect (a .equals (new SFInt32 (0xabcdef12))) .toBe (true);

   expect (() => a .fromString ("foo")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new SFInt32 ();

   a .fromVRMLString ("123");

   expect (a .equals (new SFInt32 (123))) .toBe (true);

   a .fromVRMLString ("0xabcdef12");

   expect (a .equals (new SFInt32 (0xabcdef12))) .toBe (true);

   expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new SFInt32 ();

   a .fromXMLString ("123");

   expect (a .equals (new SFInt32 (123))) .toBe (true);

   a .fromXMLString ("0xabcdef12");

   expect (a .equals (new SFInt32 (0xabcdef12))) .toBe (true);

   expect (() => a .fromXMLString ("foo")) .toThrow (Error);
});
