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
})
