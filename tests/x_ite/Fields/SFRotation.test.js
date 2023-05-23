const
   X3D        = require ("../../X3D"),
   SFRotation = X3D .require ("x_ite/Fields/SFRotation"),
   SFVec3f    = X3D .require ("x_ite/Fields") .SFVec3f,
   SFMatrix3f = X3D .require ("x_ite/Fields") .SFMatrix3f

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

   const v3 = new SFRotation (new SFVec3f (2,3,4), 5)

   expect (v3 .x) .toBe (2)
   expect (v3 .y) .toBe (3)
   expect (v3 .z) .toBe (4)
   expect (v3 .angle) .toBe (5)
   expect (v3 [0]) .toBe (2)
   expect (v3 [1]) .toBe (3)
   expect (v3 [2]) .toBe (4)
   expect (v3 [3]) .toBe (5)
   expect ([...v3]) .toEqual ([2,3,4,5])

   const v4 = new SFRotation (new SFVec3f (0,0,1), new SFVec3f (1,0,0))

   expect (v4 .x) .toBeCloseTo (0)
   expect (v4 .y) .toBeCloseTo (1)
   expect (v4 .z) .toBeCloseTo (0)
   expect (v4 .angle) .toBeCloseTo (Math .PI / 2)
   expect (v4 [0]) .toBeCloseTo (0)
   expect (v4 [1]) .toBeCloseTo (1)
   expect (v4 [2]) .toBeCloseTo (0)
   expect (v4 [3]) .toBeCloseTo (Math .PI / 2)

   const v5 = new SFRotation (new SFMatrix3f (0,0,-1,0,1,0,1,0,0))

   expect (v5 .x) .toBeCloseTo (0)
   expect (v5 .y) .toBeCloseTo (1)
   expect (v5 .z) .toBeCloseTo (0)
   expect (v5 .angle) .toBeCloseTo (Math .PI / 2)
   expect (v5 [0]) .toBeCloseTo (0)
   expect (v5 [1]) .toBeCloseTo (1)
   expect (v5 [2]) .toBeCloseTo (0)
   expect (v5 [3]) .toBeCloseTo (Math .PI / 2)
})

test ("enumerate", () =>
{
   function enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   }

   const properties = [
      "x",
      "y",
      "z",
      "angle",
   ]

   enumerate (properties, new SFRotation ())
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

test ("copy", () =>
{
   const
      v1 = new SFRotation (2,3,4,5),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
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

test ("get/setAxis", () =>
{
   const a = new SFRotation (2,3,4,5)

   expect (a .getAxis ()) .toBeInstanceOf (SFVec3f)
   expect (a .getAxis ()) .not .toBe (a .getAxis ())
   expect (a .getAxis () .equals (new SFVec3f (2,3,4))) .toBe (true)

   a .setAxis (new SFVec3f (6,7,8))

   expect (a .getAxis () .equals (new SFVec3f (6,7,8))) .toBe (true)
})

test ("get/setMatrix", () =>
{
   const a = new SFRotation (new SFVec3f (0,0,1), new SFVec3f (1,0,0))

   expect (a .getMatrix ()) .toBeInstanceOf (SFMatrix3f)
   expect (a .getMatrix ()) .not .toBe (a .getMatrix ())
   expect (a .getMatrix () [0]) .toBeCloseTo (0)
   expect (a .getMatrix () [1]) .toBeCloseTo (0)
   expect (a .getMatrix () [2]) .toBeCloseTo (-1)
   expect (a .getMatrix () [3]) .toBeCloseTo (0)
   expect (a .getMatrix () [4]) .toBeCloseTo (1)
   expect (a .getMatrix () [5]) .toBeCloseTo (0)
   expect (a .getMatrix () [6]) .toBeCloseTo (1)
   expect (a .getMatrix () [7]) .toBeCloseTo (0)
   expect (a .getMatrix () [8]) .toBeCloseTo (0)

   const b = new SFRotation ()

   b .setMatrix (new SFMatrix3f (0,0,-1,0,1,0,1,0,0))

   expect (b .getMatrix ()) .toBeInstanceOf (SFMatrix3f)
   expect (b .getMatrix ()) .not .toBe (a .getMatrix ())
   expect (b .getMatrix () [0]) .toBeCloseTo (0)
   expect (b .getMatrix () [1]) .toBeCloseTo (0)
   expect (b .getMatrix () [2]) .toBeCloseTo (-1)
   expect (b .getMatrix () [3]) .toBeCloseTo (0)
   expect (b .getMatrix () [4]) .toBeCloseTo (1)
   expect (b .getMatrix () [5]) .toBeCloseTo (0)
   expect (b .getMatrix () [6]) .toBeCloseTo (1)
   expect (b .getMatrix () [7]) .toBeCloseTo (0)
   expect (b .getMatrix () [8]) .toBeCloseTo (0)
})

test ("inverse", () =>
{
   const a = new SFRotation (2,3,4,5) .inverse () .multiply (new SFRotation (2,3,4,5))

   expect (a .x) .toBeCloseTo (0)
   expect (a .y) .toBeCloseTo (0)
   expect (a .z) .toBeCloseTo (1)
   expect (a .angle) .toBeCloseTo (0)
   expect (a [0]) .toBeCloseTo (0)
   expect (a [1]) .toBeCloseTo (0)
   expect (a [2]) .toBeCloseTo (1)
   expect (a [3]) .toBeCloseTo (0)

   const
      b = new SFRotation (2,3,4,5) .inverse () .inverse () .inverse (),
      c = new SFRotation (2,3,4,5) .inverse ()

   expect (b .x) .toBeCloseTo (c .x)
   expect (b .y) .toBeCloseTo (c .y)
   expect (b .z) .toBeCloseTo (c .z)
   expect (b .angle) .toBeCloseTo (c .angle)
   expect (b [0]) .toBeCloseTo (c [0])
   expect (b [1]) .toBeCloseTo (c [1])
   expect (b [2]) .toBeCloseTo (c [2])
   expect (b [3]) .toBeCloseTo (c [3])
})

test ("multVec", () =>
{
   const zAxis = new SFVec3f (0,0,1)

   const
      r1 = new SFRotation (zAxis, new SFVec3f (1,0,0)),
      v1 = r1 .multVec (zAxis)

   expect (v1) .not .toBe (r1 .multVec (zAxis))
   expect (v1) .toBeInstanceOf (SFVec3f)
   expect (v1 [0]) .toBeCloseTo (1)
   expect (v1 [1]) .toBeCloseTo (0)
   expect (v1 [2]) .toBeCloseTo (0)

   const
      r2 = new SFRotation (zAxis, new SFVec3f (1,0,1)),
      v2 = r2 .multVec (zAxis)

   expect (v2) .not .toBe (r2 .multVec (zAxis))
   expect (v2) .toBeInstanceOf (SFVec3f)
   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (Math .SQRT1_2)

   const
      r3 = new SFRotation (zAxis, new SFVec3f (1,1,0)),
      v3 = r3 .multVec (zAxis)

   expect (v3) .not .toBe (r3 .multVec (zAxis))
   expect (v3) .toBeInstanceOf (SFVec3f)
   expect (v3 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (0)
})
