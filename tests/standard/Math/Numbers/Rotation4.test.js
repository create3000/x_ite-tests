const
   X3D       = require ("../../../X3D"),
   Rotation4 = X3D .require ("standard/Math/Numbers/Rotation4")

test ("constructor", () =>
{
   const r1 = new Rotation4 (1,2,3,4)

   expect (r1 .x) .toBe (1)
   expect (r1 .y) .toBe (2)
   expect (r1 .z) .toBe (3)
   expect (r1 .angle) .toBe (4)
   expect (r1 .length) .toBe (4)
   expect ([... r1]) .toEqual ([1,2,3,4])
})
