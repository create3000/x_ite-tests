const
   X3D       = require ("../../../X3D"),
   Rotation4 = X3D .require ("standard/Math/Numbers/Rotation4"),
   Matrix4   = X3D .require ("standard/Math/Numbers/Matrix4"),
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

test ("inverse", () =>
{
   const
      r1 = new Rotation4 (2,3,4,5) .inverse (),
      r2 = r1 .copy () .inverse (),
      r3 = r2 .copy () .inverse ()

   expect (r1 [0]) .not .toBe (r2 [0])
   expect (r1 [1]) .not .toBe (r2 [1])
   expect (r1 [2]) .not .toBe (r2 [2])
   expect (r1 [3]) .toBe (r2 [3])

   expect (r1 [0]) .toBe (r3 [0])
   expect (r1 [1]) .toBe (r3 [1])
   expect (r1 [2]) .toBe (r3 [2])
   expect (r1 [3]) .toBe (r3 [3])
})

test ("multVecRot", () =>
{
   const
      r1 = new Rotation4 (0,0,1, Math.PI / 4),
      v1 = r1 .multVecRot (new Vector3 (1, 0, 0)),
      m1 = new Matrix4 () .rotate (r1),
      w1 = m1 .multVecMatrix (new Vector3 (1, 0, 0))

   expect (v1 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [2]) .toBeCloseTo (0)
   expect (v1 [0]) .toBeCloseTo (w1 [0])
   expect (v1 [1]) .toBeCloseTo (w1 [1])
   expect (v1 [2]) .toBeCloseTo (w1 [2])

   const
      r2 = new Rotation4 (0,1,0, Math.PI / 4),
      v2 = r2 .multVecRot (new Vector3 (1, 0, 0)),
      m2 = new Matrix4 () .rotate (r2),
      w2 = m2 .multVecMatrix (new Vector3 (1, 0, 0))

   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v2 [0]) .toBeCloseTo (w2 [0])
   expect (v2 [1]) .toBeCloseTo (w2 [1])
   expect (v2 [2]) .toBeCloseTo (w2 [2])

   const
      r3 = new Rotation4 (1,0,0, Math.PI / 4),
      v3 = r3 .multVecRot (new Vector3 (0, 0, 1)),
      m3 = new Matrix4 () .rotate (r3),
      w3 = m3 .multVecMatrix (new Vector3 (0, 0, 1))

   expect (v3 [0]) .toBeCloseTo (0)
   expect (v3 [1]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [0]) .toBeCloseTo (w3 [0])
   expect (v3 [1]) .toBeCloseTo (w3 [1])
   expect (v3 [2]) .toBeCloseTo (w3 [2])

   const
      r4 = new Rotation4 (1,2,3,4),
      v4 = r4 .multVecRot (new Vector3 (2,3,4)),
      m4 = new Matrix4 () .rotate (r4),
      w4 = m4 .multVecMatrix (new Vector3 (2,3,4))

   expect (v4 [0]) .toBeCloseTo (w4 [0])
   expect (v4 [1]) .toBeCloseTo (w4 [1])
   expect (v4 [2]) .toBeCloseTo (w4 [2])
})

test ("multRotVec", () =>
{
   const
      r1 = new Rotation4 (0,0,1, Math.PI / 4),
      v1 = r1 .multRotVec (new Vector3 (1, 0, 0)),
      m1 = new Matrix4 () .rotate (r1),
      w1 = m1 .multMatrixVec (new Vector3 (1, 0, 0))

   expect (v1 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v1 [1]) .toBeCloseTo (-Math .SQRT1_2)
   expect (v1 [2]) .toBeCloseTo (0)
   expect (v1 [0]) .toBeCloseTo (w1 [0])
   expect (v1 [1]) .toBeCloseTo (w1 [1])
   expect (v1 [2]) .toBeCloseTo (w1 [2])

   const
      r2 = new Rotation4 (0,1,0, Math.PI / 4),
      v2 = r2 .multRotVec (new Vector3 (1, 0, 0)),
      m2 = new Matrix4 () .rotate (r2),
      w2 = m2 .multMatrixVec (new Vector3 (1, 0, 0))

   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [0]) .toBeCloseTo (w2 [0])
   expect (v2 [1]) .toBeCloseTo (w2 [1])
   expect (v2 [2]) .toBeCloseTo (w2 [2])

   const
      r3 = new Rotation4 (1,0,0, Math.PI / 4),
      v3 = r3 .multRotVec (new Vector3 (0, 0, 1)),
      m3 = new Matrix4 () .rotate (r3),
      w3 = m3 .multMatrixVec (new Vector3 (0, 0, 1))

   expect (v3 [0]) .toBeCloseTo (0)
   expect (v3 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [0]) .toBeCloseTo (w3 [0])
   expect (v3 [1]) .toBeCloseTo (w3 [1])
   expect (v3 [2]) .toBeCloseTo (w3 [2])

   const
      r4 = new Rotation4 (1,2,3,4),
      v4 = r4 .multRotVec (new Vector3 (2,3,4)),
      m4 = new Matrix4 () .rotate (r4),
      w4 = m4 .multMatrixVec (new Vector3 (2,3,4))

   expect (v4 [0]) .toBeCloseTo (w4 [0])
   expect (v4 [1]) .toBeCloseTo (w4 [1])
   expect (v4 [2]) .toBeCloseTo (w4 [2])
})
