const
   X3D     = require ("../../../X3D"),
   Vector2 = X3D .require ("standard/Math/Numbers/Vector2")

test ("constructor", () =>
{
   const v1 = new Vector2 (0, 0)

   expect (v1) .toEqual ({ x:0, y:0 })
   expect (v1 [0]) .toBe (0)
   expect (v1 [1]) .toBe (0)
   expect ([... v1]) .toEqual ([ 0, 0 ])
   expect (v1 .length) .toBe (2)

   const v2 = new Vector2 (2, 3)

   expect (v2) .toEqual ({ x:2, y:3 })
   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect ([... v2]) .toEqual ([ 2, 3 ])
   expect (v2 .length) .toBe (2)
})

test ("copy", () =>
{
   const v1 = new Vector2 (2, 3)

   expect (v1 .copy ()) .toEqual ({ x:2, y:3 })
})

test ("assign", () =>
{
   const
      v1 = new Vector2 (0, 0),
      v2 = new Vector2 (2, 3)

   expect (v1 .assign (v2)) .toEqual ({ x:2, y:3 })
})

test ("set", () =>
{
   const v1 = new Vector2 (0, 0)

   expect (v1 .set (2, 3, 4, 5)) .toEqual ({ x:2, y:3 })
})

test ("negate", () =>
{
   const v1 = new Vector2 (2, 3)

   v1 .negate ()

   expect (v1 [0]) .toBe (-2)
   expect (v1 [1]) .toBe (-3)

   const v2 = new Vector2 (-2, -3)

   v2 .negate ()

   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
})

test ("inverse", () =>
{
   const v1 = new Vector2 (2, 3)

   v1 .inverse ()

   expect (v1 [0]) .toBeCloseTo (1 / 2)
   expect (v1 [1]) .toBeCloseTo (1 / 3)
})

test ("add", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .add (v2)

   expect (v1 [0]) .toBe (2 + 6)
   expect (v1 [1]) .toBe (3 + 7)
})

test ("subtract", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .subtract (v2)

   expect (v1 [0]) .toBe (2 - 6)
   expect (v1 [1]) .toBe (3 - 7)
})

test ("multiply", () =>
{
   const v1 = new Vector2 (2, 3)

   v1 .multiply (6)

   expect (v1 [0]) .toBe (2 * 6)
   expect (v1 [1]) .toBe (3 * 6)
})

test ("multVec", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .multVec (v2)

   expect (v1 [0]) .toBe (2 * 6)
   expect (v1 [1]) .toBe (3 * 7)
})

test ("divide", () =>
{
   const v1 = new Vector2 (2, 3)

   v1 .divide (6)

   expect (v1 [0]) .toBeCloseTo (2 / 6)
   expect (v1 [1]) .toBeCloseTo (3 / 6)
})

test ("divVec", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .divVec (v2)

   expect (v1 [0]) .toBeCloseTo (2 / 6)
   expect (v1 [1]) .toBeCloseTo (3 / 7)
})

test ("normalize", () =>
{
   const
      v1 = new Vector2 (2, 3),
      l  = Math .hypot (2, 3)

   v1 .normalize ()

   expect (v1 [0]) .toBeCloseTo (2 / l)
   expect (v1 [1]) .toBeCloseTo (3 / l)
})

test ("dot", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   expect (v1 .dot (v2)) .toBe (2 * 6 + 3 * 7)
})

test ("norm", () =>
{
   const v1 = new Vector2 (2, 3)

   expect (v1 .norm ()) .toBe (2 * 2 + 3 * 3)
})

test ("magnitude", () =>
{
   const v1 = new Vector2 (2, 3)

   expect (v1 .magnitude ()) .toBeCloseTo (Math .hypot (2, 3))
})

test ("distance", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   expect (v1 .distance (v2)) .toBeCloseTo (Math .hypot (2 - 6, 3 - 7))
})

test ("lerp", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .lerp (v2, 0.5)

   expect (v1 [0]) .toBeCloseTo ((2 + 6) / 2)
   expect (v1 [1]) .toBeCloseTo ((3 + 7) / 2)
})

test ("abs", () =>
{
   const v1 = new Vector2 (2, 3)

   v1 .abs ()

   expect (v1 [0]) .toBe (2)
   expect (v1 [1]) .toBe (3)

   const v2 = new Vector2 (-2, -3)

   v2 .abs ()

   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
})

test ("min", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .min (v2)

   expect (v1 [0]) .toBe (2)
   expect (v1 [1]) .toBe (3)
})

test ("max", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7)

   v1 .max (v2)

   expect (v1 [0]) .toBe (6)
   expect (v1 [1]) .toBe (7)
})
