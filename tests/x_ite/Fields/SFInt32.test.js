const
   X3D     = require ("../../X3D"),
   SFInt32 = X3D .require ("x_ite/Fields/SFInt32")

test ("constructor", () =>
{
   expect (new SFInt32 ()                .valueOf ()) .toBe (0)
   expect (new SFInt32 (NaN)             .valueOf ()) .toBe (0)
   expect (new SFInt32 (Infinity)        .valueOf ()) .toBe (0)
   expect (new SFInt32 (undefined)       .valueOf ()) .toBe (0)
   expect (new SFInt32 ({})              .valueOf ()) .toBe (0)
   expect (new SFInt32 (false)           .valueOf ()) .toBe (0)
   expect (new SFInt32 (true)            .valueOf ()) .toBe (1)
   expect (new SFInt32 (123.456)         .valueOf ()) .toBe (123)
   expect (new SFInt32 (123_456_789_012) .valueOf ()) .toBe (-1097262572)
   expect (new SFInt32 (0xffffffff)      .valueOf ()) .toBe (-1)
   expect (new SFInt32 (666)             .valueOf ()) .toBe (666)
   expect (new SFInt32 (-666)            .valueOf ()) .toBe (-666)
})

test ("setValue", () =>
{
   const field = new SFInt32 ();

   expect ((field .setValue ()               , field .valueOf ())) .toBe (0)
   expect ((field .setValue (NaN)            , field .valueOf ())) .toBe (0)
   expect ((field .setValue (Infinity)       , field .valueOf ())) .toBe (0)
   expect ((field .setValue (undefined)      , field .valueOf ())) .toBe (0)
   expect ((field .setValue ({})             , field .valueOf ())) .toBe (0)
   expect ((field .setValue (false)          , field .valueOf ())) .toBe (0)
   expect ((field .setValue (true)           , field .valueOf ())) .toBe (1)
   expect ((field .setValue (123.456)        , field .valueOf ())) .toBe (123)
   expect ((field .setValue (123_456_789_012), field .valueOf ())) .toBe (-1097262572)
   expect ((field .setValue (0xffffffff)     , field .valueOf ())) .toBe (-1)
   expect ((field .setValue (666)            , field .valueOf ())) .toBe (666)
   expect ((field .setValue (-666)           , field .valueOf ())) .toBe (-666)
})
