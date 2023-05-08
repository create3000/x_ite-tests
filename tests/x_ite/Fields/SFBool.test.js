const
   X3D    = require ("../../X3D"),
   SFBool = X3D .require ("x_ite/Fields/SFBool")

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
   const field = new SFBool ();

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
