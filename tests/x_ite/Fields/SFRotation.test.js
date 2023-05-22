const
   X3D         = require ("../../X3D"),
   SFRotation = X3D .require ("x_ite/Fields/SFRotation")

test ("constructor", () =>
{
   const v1 = new SFRotation ()

   expect (v1 .x) .toBe (0)
   expect (v1 .y) .toBe (0)
   expect (v1 .z) .toBe (1)
   expect (v1 .angle) .toBe (0)
   expect (v1 [0]) .toBe (0)
   expect (v1 [1]) .toBe (0)
   expect (v1 [2]) .toBe (1)
   expect (v1 [3]) .toBe (0)
   expect ([...v1]) .toEqual ([0,0,1,0])

   const v2 = new SFRotation (2,3,4,5)

   expect (v2 .x) .toBe (2)
   expect (v2 .y) .toBe (3)
   expect (v2 .z) .toBe (4)
   expect (v2 .angle) .toBe (5)
   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect (v2 [2]) .toBe (4)
   expect (v2 [3]) .toBe (5)
   expect ([...v2]) .toEqual ([2,3,4,5])
})

test ("getter/setter", () =>
{
   const v1 = new SFRotation ()

   v1 .x = 2
   v1 .y = 3
   v1 .z = 4
   v1 .angle = 5

   expect (v1 .x) .toBe (2)
   expect (v1 .y) .toBe (3)
   expect (v1 .z) .toBe (4)
   expect (v1 .angle) .toBe (5)
   expect (v1 [0]) .toBe (2)
   expect (v1 [1]) .toBe (3)
   expect (v1 [2]) .toBe (4)
   expect (v1 [3]) .toBe (5)
   expect ([...v1]) .toEqual ([2,3,4,5])

   v1 [0] = 6
   v1 [1] = 7
   v1 [2] = 8
   v1 [3] = 9

   expect (v1 .x) .toBe (6)
   expect (v1 .y) .toBe (7)
   expect (v1 .z) .toBe (8)
   expect (v1 .angle) .toBe (9)
   expect (v1 [0]) .toBe (6)
   expect (v1 [1]) .toBe (7)
   expect (v1 [2]) .toBe (8)
   expect (v1 [3]) .toBe (9)
   expect ([...v1]) .toEqual ([6,7,8,9])
})

test ("common", () =>
{
   const field = new SFRotation ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFRotation)
   expect (field .getTypeName ()) .toBe ("SFRotation")
})

test ("equals", () =>
{
   const
      a = new SFRotation (2,3,4,5),
      b = new SFRotation (6,7,8,9)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFRotation (),
      b = new SFRotation (2,3,4,5)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})
