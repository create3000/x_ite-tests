const
   X3D     = require ("../../../X3D"),
   Vector4 = X3D .Vector4;

test ("constants", () =>
{
   expect (Vector4 .ZERO .equals (new Vector4 (0))) .toBe (true);
   expect (Vector4 .ONE .equals (new Vector4 (1))) .toBe (true);
   expect (Vector4 .X_AXIS .equals (new Vector4 (1,0,0,0))) .toBe (true);
   expect (Vector4 .Y_AXIS .equals (new Vector4 (0,1,0,0))) .toBe (true);
   expect (Vector4 .Z_AXIS .equals (new Vector4 (0,0,1,0))) .toBe (true);
   expect (Vector4 .W_AXIS .equals (new Vector4 (0,0,0,1))) .toBe (true);
});

test ("constructor", () =>
{
   const v0 = new Vector4 ()

   expect (v0) .toEqual ({ x:0, y:0, z:0, w:0 })
   expect (v0 [0]) .toBe (0)
   expect (v0 [1]) .toBe (0)
   expect (v0 [2]) .toBe (0)
   expect (v0 [3]) .toBe (0)
   expect (v0 .x) .toBe (0)
   expect (v0 .y) .toBe (0)
   expect (v0 .z) .toBe (0)
   expect (v0 .w) .toBe (0)
   expect ([... v0]) .toEqual ([ 0, 0, 0, 0 ])
   expect (v0) .toHaveLength (4)

   const v1 = new Vector4 (0, 0, 0, 0)

   expect (v1) .toEqual ({ x:0, y:0, z:0, w:0 })
   expect (v1 [0]) .toBe (0)
   expect (v1 [1]) .toBe (0)
   expect (v1 [2]) .toBe (0)
   expect (v1 [3]) .toBe (0)
   expect (v1 .x) .toBe (0)
   expect (v1 .y) .toBe (0)
   expect (v1 .z) .toBe (0)
   expect (v1 .w) .toBe (0)
   expect ([... v1]) .toEqual ([ 0, 0, 0, 0 ])
   expect (v1) .toHaveLength (4)

   const v2 = new Vector4 (2, 3, 4, 5)

   expect (v2) .toEqual ({ x:2, y:3, z:4, w:5 })
   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect (v2 [2]) .toBe (4)
   expect (v2 [3]) .toBe (5)
   expect (v2 .x) .toBe (2)
   expect (v2 .y) .toBe (3)
   expect (v2 .z) .toBe (4)
   expect (v2 .w) .toBe (5)
   expect ([... v2]) .toEqual ([ 2, 3, 4, 5 ])
   expect (v2) .toHaveLength (4)

   const v3 = new Vector4 (2)

   expect (v3 .x) .toBe (2)
   expect (v3 .y) .toBe (2)
   expect (v3 .z) .toBe (2)
   expect (v3 .w) .toBe (2)
   expect (v3 [0]) .toBe (2)
   expect (v3 [1]) .toBe (2)
   expect (v3 [2]) .toBe (2)
   expect (v3 [3]) .toBe (2)
   expect ([... v3]) .toEqual ([2, 2, 2, 2])
   expect (v3) .toHaveLength (4)

   const v4 = new Vector4 (2, 3)

   expect (v4 .x) .toBe (2)
   expect (v4 .y) .toBe (3)
   expect (v4 .z) .toBe (3)
   expect (v4 .w) .toBe (3)
   expect (v4 [0]) .toBe (2)
   expect (v4 [1]) .toBe (3)
   expect (v4 [2]) .toBe (3)
   expect (v4 [3]) .toBe (3)
   expect ([... v4]) .toEqual ([2, 3, 3, 3])
   expect (v4) .toHaveLength (4)

   const v5 = new Vector4 (2, 3, 4)

   expect (v5 .x) .toBe (2)
   expect (v5 .y) .toBe (3)
   expect (v5 .z) .toBe (4)
   expect (v5 .w) .toBe (4)
   expect (v5 [0]) .toBe (2)
   expect (v5 [1]) .toBe (3)
   expect (v5 [2]) .toBe (4)
   expect (v5 [3]) .toBe (4)
   expect ([... v5]) .toEqual ([2, 3, 4, 4])
   expect (v5) .toHaveLength (4)
})

test ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
      "z",
      "w",
   ];

   enumerate (properties, new Vector4 ());
   enumerate (properties, new Vector4 (1, 2, 3, 4));
});

test ("copy", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   expect (v1 .copy ()) .toEqual ({ x:2, y:3, z:4, w:5 })
})

test ("assign", () =>
{
   const
      v1 = new Vector4 (0, 0, 0, 0),
      v2 = new Vector4 (2, 3, 4, 5)

   expect (v1 .assign (v2)) .toEqual ({ x:2, y:3, z:4, w:5 })
})

test ("set", () =>
{
   const v1 = new Vector4 (0, 0, 0, 0)

   expect (v1 .set (2, 3, 4, 5)) .toEqual ({ x:2, y:3, z:4, w:5 })
   expect (v1 .set ()) .toEqual ({ x:0, y:0, z:0, w:0 })
   expect ([... v1 .set (2)]) .toEqual ([2, 2, 2, 2])
   expect ([... v1 .set (2, 3)]) .toEqual ([2, 3, 3, 3])
   expect ([... v1 .set (2, 3, 4)]) .toEqual ([2, 3, 4, 4])
})

test ("negate", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   v1 .negate ()

   expect (v1 [0]) .toBe (-2)
   expect (v1 [1]) .toBe (-3)
   expect (v1 [2]) .toBe (-4)
   expect (v1 [3]) .toBe (-5)

   const v2 = new Vector4 (-2, -3, -4, -5)

   v2 .negate ()

   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect (v2 [2]) .toBe (4)
   expect (v2 [3]) .toBe (5)
})

test ("inverse", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   v1 .inverse ()

   expect (v1 [0]) .toBeCloseTo (1 / 2)
   expect (v1 [1]) .toBeCloseTo (1 / 3)
   expect (v1 [2]) .toBeCloseTo (1 / 4)
   expect (v1 [3]) .toBeCloseTo (1 / 5)
})

test ("add", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .add (v2)

   expect (v1 [0]) .toBe (2 + 6)
   expect (v1 [1]) .toBe (3 + 7)
   expect (v1 [2]) .toBe (4 + 8)
   expect (v1 [3]) .toBe (5 + 9)
})

test ("subtract", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .subtract (v2)

   expect (v1 [0]) .toBe (2 - 6)
   expect (v1 [1]) .toBe (3 - 7)
   expect (v1 [2]) .toBe (4 - 8)
   expect (v1 [3]) .toBe (5 - 9)
})

test ("multiply", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   v1 .multiply (6)

   expect (v1 [0]) .toBe (2 * 6)
   expect (v1 [1]) .toBe (3 * 6)
   expect (v1 [2]) .toBe (4 * 6)
   expect (v1 [3]) .toBe (5 * 6)
})

test ("multVec", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .multVec (v2)

   expect (v1 [0]) .toBe (2 * 6)
   expect (v1 [1]) .toBe (3 * 7)
   expect (v1 [2]) .toBe (4 * 8)
   expect (v1 [3]) .toBe (5 * 9)
})

test ("divide", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   v1 .divide (6)

   expect (v1 [0]) .toBeCloseTo (2 / 6)
   expect (v1 [1]) .toBeCloseTo (3 / 6)
   expect (v1 [2]) .toBeCloseTo (4 / 6)
   expect (v1 [3]) .toBeCloseTo (5 / 6)
})

test ("divVec", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .divVec (v2)

   expect (v1 [0]) .toBeCloseTo (2 / 6)
   expect (v1 [1]) .toBeCloseTo (3 / 7)
   expect (v1 [2]) .toBeCloseTo (4 / 8)
   expect (v1 [3]) .toBeCloseTo (5 / 9)
})

test ("normalize", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      l  = Math .hypot (2, 3, 4, 5)

   v1 .normalize ()

   expect (v1 [0]) .toBeCloseTo (2 / l)
   expect (v1 [1]) .toBeCloseTo (3 / l)
   expect (v1 [2]) .toBeCloseTo (4 / l)
   expect (v1 [3]) .toBeCloseTo (5 / l)
})

test ("dot", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   expect (v1 .dot (v2)) .toBe (2 * 6 + 3 * 7 + 4 * 8 + 5 * 9)
})

test ("squaredNorm", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   expect (v1 .squaredNorm ()) .toBe (2 * 2 + 3 * 3 + 4 * 4 + 5 * 5)
})

test ("norm", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   expect (v1 .norm ()) .toBeCloseTo (Math .hypot (2, 3, 4, 5))
})

test ("distance", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   expect (v1 .distance (v2)) .toBeCloseTo (Math .hypot (2 - 6, 3 - 7, 4 - 8, 5 - 9))
})

test ("lerp", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .lerp (v2, 0.5)

   expect (v1 [0]) .toBeCloseTo ((2 + 6) / 2)
   expect (v1 [1]) .toBeCloseTo ((3 + 7) / 2)
   expect (v1 [2]) .toBeCloseTo ((4 + 8) / 2)
   expect (v1 [3]) .toBeCloseTo ((5 + 9) / 2)
})

test ("abs", () =>
{
   const v1 = new Vector4 (2, 3, 4, 5)

   v1 .abs ()

   expect (v1 [0]) .toBe (2)
   expect (v1 [1]) .toBe (3)
   expect (v1 [2]) .toBe (4)
   expect (v1 [3]) .toBe (5)

   const v2 = new Vector4 (-2, -3, -4, -5)

   v2 .abs ()

   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect (v2 [2]) .toBe (4)
   expect (v2 [3]) .toBe (5)
})

test ("min", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .min (v2)

   expect (v1 [0]) .toBe (2)
   expect (v1 [1]) .toBe (3)
   expect (v1 [2]) .toBe (4)
   expect (v1 [3]) .toBe (5)
})

test ("max", () =>
{
   const
      v1 = new Vector4 (2, 3, 4, 5),
      v2 = new Vector4 (6, 7, 8, 9)

   v1 .max (v2)

   expect (v1 [0]) .toBe (6)
   expect (v1 [1]) .toBe (7)
   expect (v1 [2]) .toBe (8)
   expect (v1 [3]) .toBe (9)
})

test ("equals", () =>
{
   const
      a = new Vector4 (2,3,4,5),
      b = new Vector4 (2,3,4,5)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})

test ("toString", () =>
{
   const v = new Vector4 (3, 4, 5, 6)

   expect (v .toString ()) .toBe ([... v] .join (" "))
})
