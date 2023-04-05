const
   X3D       = require ("../../../X3D"),
   Rotation4 = X3D .require ("standard/Math/Numbers/Rotation4"),
   Vector3   = X3D .require ("standard/Math/Numbers/Vector3")

test ("constructor", () =>
{
   const r1 = new Rotation4 (1,2,3,4)

   expect (r1 .x) .toBe (1)
   expect (r1 .y) .toBe (2)
   expect (r1 .z) .toBe (3)
   expect (r1 .angle) .toBe (4)
   expect (r1 .length) .toBe (4)
   expect ([... r1]) .toEqual ([1,2,3,4])

   r1 .x = 5
   r1 .y = 6
   r1 .z = 7
   r1 .angle = 8

   expect (r1 .x) .toBe (5)
   expect (r1 .y) .toBe (6)
   expect (r1 .z) .toBe (7)
   expect (r1 .angle) .toBe (8)
   expect (r1 .length) .toBe (4)
   expect ([... r1]) .toEqual ([5,6,7,8])
})

test ("copy", () =>
{
   const v1 = new Rotation4 (1,2,3,4)

   expect ([... v1 .copy ()]) .toEqual ([1,2,3,4])
})

test ("assign", () =>
{
   const
      v1 = new Rotation4 (0, 0, 0, 0),
      v2 = new Rotation4 (1,2,3,4)

   expect ([... v1 .assign (v2)]) .toEqual ([1,2,3,4])
})

test ("set", () =>
{
   const v1 = new Rotation4 (0, 0, 0, 0)

   expect ([... v1 .set (1,2,3,4)]) .toEqual ([1,2,3,4])
})

test ("equals", () =>
{
   const
      a = new Rotation4 (1,2,3,4),
      b = new Rotation4 (1,2,3,4)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})

test ("multVecRot", () =>
{
   const
      r1 = new Rotation4 (0,0,1, Math.PI / 4),
      v1 = r1 .multVecRot (new Vector3 (1, 0, 0))

   expect (v1 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [2]) .toBeCloseTo (0)
})

test ("multRotVec", () =>
{
   const
      r1 = new Rotation4 (0,0,1, Math.PI / 4),
      v1 = r1 .multRotVec (new Vector3 (1, 0, 0))

   expect (v1 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [1]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v1 [2]) .toBeCloseTo (0)
})
