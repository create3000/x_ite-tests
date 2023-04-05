const
   X3D     = require ("../../../X3D"),
   Matrix3 = X3D .require ("standard/Math/Numbers/Matrix3"),
   Vector2 = X3D .require ("standard/Math/Numbers/Vector2"),
   Vector3 = X3D .require ("standard/Math/Numbers/Vector3"),
   Complex = X3D .require ("standard/Math/Numbers/Complex")

test ("constructor", () =>
{
   const m1 = new Matrix3 ()

   expect (m1) .toEqual ({
      0:1, 1:0, 2:0,
      3:0, 4:1, 5:0,
      6:0, 7:0, 8:1,
   })

   expect ([... m1]) .toEqual ([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
   ])

   expect (m1 .length) .toBe (9)
   expect (m1 .order)  .toBe (3)

   const m2 = new Matrix3 (2,3,4, 5,6,7, 8,9,10)

   expect (m2) .toEqual ({
      0:2, 1:3, 2:4,
      3:5, 4:6, 5:7,
      6:8, 7:9, 8:10,
   })

   expect ([... m2]) .toEqual ([
      2,3,4, 5,6,7, 8,9,10
   ])

   expect (m2 .length) .toBe (9)
   expect (m2 .order)  .toBe (3)
})

test ("get1", () =>
{
   const
      m1 = new Matrix3 (2,0,0, 0,6,0, 8,9,1),
      t  = new Vector2 (0, 0),
      s  = new Vector2 (1, 1)

   m1 .get (t, null, s)

   expect (t [0]) .toBeCloseTo (8)
   expect (t [1]) .toBeCloseTo (9)

   expect (s [0]) .toBeCloseTo (2)
   expect (s [1]) .toBeCloseTo (6)

   const
      m2 = new Matrix3 (),
      r  = new Vector3 (0, 0, 0),
      c  = new Complex .Polar (1, 5)

   m2 .rotate (5)
   m2 .get (null, r)

   expect (r [0]) .toBeCloseTo (c .real)
   expect (r [1]) .toBeCloseTo (c .imag)
   expect (r [0]) .toBeCloseTo (0.2836621854632263)
   expect (r [1]) .toBeCloseTo (-0.9589242746631387)
   expect (r [2]) .toBeCloseTo (-Math.PI * 2 + 5)

   const
      m3 = new Matrix3 (),
      so = new Vector3 (0, 0, 0)

   m3 .rotate (5)
   m3 .set (null, null, new Vector2 (1, 2), Math .PI / 4)
   m3 .get (null, null, s, so)

   expect (s [0]) .toBeCloseTo (2)
   expect (s [1]) .toBeCloseTo (1)

   expect (so [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (so [1]) .toBeCloseTo (-Math .SQRT1_2)
   expect (so [2]) .toBeCloseTo (-Math .PI / 4)

   let v1, v2

   m2 .set ()

   expect ([... m2]) .toEqual ([1, 0, 0,  0, 1, 0,  0, 0, 1])

   m2 .set (new Vector2 (1, 2))

   v1 = m2 .multVecMatrix (new Vector2 (2,3))

   m2 .get (t)
   m3 .set (t)

   v2 = m3 .multVecMatrix (new Vector2 (2,3))

   expect (v1 [0]) .toBeCloseTo (v2 [0])
   expect (v1 [1]) .toBeCloseTo (v2 [1])

   m2 .set (new Vector2 (1, 2), 1)

   v1 = m2 .multVecMatrix (new Vector2 (2,3))

   m2 .get (t, r)
   m3 .set (t, r [2])

   v2 = m3 .multVecMatrix (new Vector2 (2,3))

   expect (v1 [0]) .toBeCloseTo (v2 [0])
   expect (v1 [1]) .toBeCloseTo (v2 [1])

   m2 .set (new Vector2 (1, 2), 1, new Vector2 (1, 2))

   v1 = m2 .multVecMatrix (new Vector2 (2,3))

   m2 .get (t, r, s)
   m3 .set (t, r [2], s)

   v2 = m3 .multVecMatrix (new Vector2 (2,3))

   expect (v1 [0]) .toBeCloseTo (v2 [0])
   expect (v1 [1]) .toBeCloseTo (v2 [1])

   m2 .set (new Vector2 (1, 2), 1, new Vector2 (1, 2), 1)

   v1 = m2 .multVecMatrix (new Vector2 (2,3))

   m2 .get (t, r, s, so)
   m3 .set (t, r [2], s, so [2])

   v2 = m3 .multVecMatrix (new Vector2 (2,3))

   expect (v1 [0]) .toBeCloseTo (v2 [0])
   expect (v1 [1]) .toBeCloseTo (v2 [1])

   m2 .set (new Vector2 (1, 2), 1, new Vector2 (1, 2), 1, new Vector2 (1, 2))

   v1 = m2 .multVecMatrix (new Vector2 (2,3))

   m2 .get (t, r, s, so, new Vector2 (1, 2))
   m3 .set (t, r [2], s, so [2], new Vector2 (1, 2))

   v2 = m3 .multVecMatrix (new Vector2 (2,3))

   expect (v1 [0]) .toBeCloseTo (v2 [0])
   expect (v1 [1]) .toBeCloseTo (v2 [1])
})

test ("set1", () =>
{
   const m1 = new Matrix3 (2,3,4, 5,6,7, 8,9,10)

   m1 .set ()

   expect ([... m1]) .toEqual ([
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
   ])

   m1 .set (2,3,4, 5,6,7, 8,9,10)

   expect ([... m1]) .toEqual ([
      2,3,4, 5,6,7, 8,9,10
   ])
})

test ("set2", () =>
{
   const
      m1 = new Matrix3 (),
      t  = new Vector2 (2, 3),
      s  = new Vector2 (5, 6)

   m1 .set (t, null, s)

   expect ([... m1]) .toEqual ([
      5, 0, 0,
      0, 6, 0,
      2, 3, 1,
   ])

   m1 .set (t, 2, s)

   expect (m1 [0]) .toBeCloseTo (-2.080734182735712)
   expect (m1 [1]) .toBeCloseTo (4.546487134128409)
   expect (m1 [2]) .toBeCloseTo (0)
   expect (m1 [3]) .toBeCloseTo (-5.45578456095409)
   expect (m1 [4]) .toBeCloseTo (-2.4968810192828546)
   expect (m1 [5]) .toBeCloseTo (0)
   expect (m1 [6]) .toBeCloseTo (2)
   expect (m1 [7]) .toBeCloseTo (3)
   expect (m1 [8]) .toBeCloseTo (1)

   m1 .set (null, 5, null)

   expect (m1 [0]) .toBeCloseTo ( Math .cos (5))
   expect (m1 [1]) .toBeCloseTo ( Math .sin (5))
   expect (m1 [2]) .toBeCloseTo (0)
   expect (m1 [3]) .toBeCloseTo (-Math .sin (5))
   expect (m1 [4]) .toBeCloseTo ( Math .cos (5))
   expect (m1 [5]) .toBeCloseTo (0)
   expect (m1 [6]) .toBeCloseTo (0)
   expect (m1 [7]) .toBeCloseTo (0)
   expect (m1 [8]) .toBeCloseTo (1)

   m1 .set (null, Math .PI / 4, null)

   expect (m1 [0]) .toBeCloseTo (Math .sqrt (1/2))
   expect (m1 [1]) .toBeCloseTo (Math .sqrt (1/2))
   expect (m1 [2]) .toBeCloseTo (0)
   expect (m1 [3]) .toBeCloseTo (-Math .sqrt (1/2))
   expect (m1 [4]) .toBeCloseTo ( Math .sqrt (1/2))
   expect (m1 [5]) .toBeCloseTo (0)
   expect (m1 [6]) .toBeCloseTo (0)
   expect (m1 [7]) .toBeCloseTo (0)
   expect (m1 [8]) .toBeCloseTo (1)

})

test ("inverse", () =>
{
   // https://www.wolframalpha.com/calculators/matrix-inverse-calculator

   const m = new Matrix3 (1,2,3, 3,2,1, 2,1,3) .inverse ()

   expect (m [0]) .toBeCloseTo (-5 / 12)
   expect (m [1]) .toBeCloseTo ( 3 / 12)
   expect (m [2]) .toBeCloseTo ( 4 / 12)
   expect (m [3]) .toBeCloseTo ( 7 / 12)
   expect (m [4]) .toBeCloseTo ( 3 / 12)
   expect (m [5]) .toBeCloseTo (-8 / 12)
   expect (m [6]) .toBeCloseTo ( 1 / 12)
   expect (m [7]) .toBeCloseTo (-3 / 12)
   expect (m [8]) .toBeCloseTo ( 4 / 12)

   const m2 = new Matrix3 (1,3,0.3, 4,5,0.6, 7,8,0.9) .inverse ()

   expect (m2 [0]) .toBeCloseTo (-1/2)
   expect (m2 [1]) .toBeCloseTo (-1/2)
   expect (m2 [2]) .toBeCloseTo (1/2)
   expect (m2 [3]) .toBeCloseTo (1)
   expect (m2 [4]) .toBeCloseTo (-2)
   expect (m2 [5]) .toBeCloseTo (1)
   expect (m2 [6]) .toBeCloseTo (-5)
   expect (m2 [7]) .toBeCloseTo (65/3)
   expect (m2 [8]) .toBeCloseTo (-35/3)
})

test ("multRight", () =>
{
   // https://www.matopt.de/werkzeuge/grundlagen/matrixmultiplikation.html

   const
      m1 = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9),
      m2 = new Matrix3 (10, 11, 12, 13, 14, 15, 16, 17, 18),
      m  = m1 .multRight (m2)

   expect (m [0]) .toBe (84)
   expect (m [1]) .toBe (90)
   expect (m [2]) .toBe (96)
   expect (m [3]) .toBe (201)
   expect (m [4]) .toBe (216)
   expect (m [5]) .toBe (231)
   expect (m [6]) .toBe (318)
   expect (m [7]) .toBe (342)
   expect (m [8]) .toBe (366)
})

test ("multLeft", () =>
{
   // https://www.matopt.de/werkzeuge/grundlagen/matrixmultiplikation.html

   const
      m1 = new Matrix3 (10, 11, 12, 13, 14, 15, 16, 17, 18),
      m2 = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9),
      m  = m1 .multLeft (m2)

   expect (m [0]) .toBe (84)
   expect (m [1]) .toBe (90)
   expect (m [2]) .toBe (96)
   expect (m [3]) .toBe (201)
   expect (m [4]) .toBe (216)
   expect (m [5]) .toBe (231)
   expect (m [6]) .toBe (318)
   expect (m [7]) .toBe (342)
   expect (m [8]) .toBe (366)
})

test ("transpose", () =>
{
   const m = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9) .transpose ()

   expect (m [0]) .toBe (1)
   expect (m [1]) .toBe (4)
   expect (m [2]) .toBe (7)
   expect (m [3]) .toBe (2)
   expect (m [4]) .toBe (5)
   expect (m [5]) .toBe (8)
   expect (m [6]) .toBe (3)
   expect (m [7]) .toBe (6)
   expect (m [8]) .toBe (9)
})

test ("determinant", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix3 (1,2,3, 3,2,1, 2,1,3) .determinant ()

   expect (d) .toBe (-12)
})

test ("determinant2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix3 (1,2,3, 4,3,1, 2,1,3) .determinant2 ()

   expect (d) .toBe (-5)
})

test ("multVecMatrix2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9) .multVecMatrix (new Vector2 (10, 11))

   expect (v [0]) .toBeCloseTo (61 / 105)
   expect (v [1]) .toBeCloseTo (83 / 105)
})

test ("multVecMatrix3", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9) .multVecMatrix (new Vector3 (10, 11, 12))

   expect (v [0]) .toBe (138)
   expect (v [1]) .toBe (171)
   expect (v [2]) .toBe (204)
})

test ("multMatrixVec2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9) .multMatrixVec (new Vector2 (10, 11))

   expect (v [0]) .toBeCloseTo (35  / 167)
   expect (v [1]) .toBeCloseTo (101 / 167)
})

test ("multMatrixVec3", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9) .multMatrixVec (new Vector3 (10, 11, 12))

   expect (v [0]) .toBe (68)
   expect (v [1]) .toBe (167)
   expect (v [2]) .toBe (266)
})

test ("translate", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const m = new Matrix3 (1, 2, 0, 4, 5, 0, 7, 8, 1) .translate (new Vector2 (10, 11))

   expect (m [0]) .toBe (1)
   expect (m [1]) .toBe (2)
   expect (m [2]) .toBe (0)
   expect (m [3]) .toBe (4)
   expect (m [4]) .toBe (5)
   expect (m [5]) .toBe (0)
   expect (m [6]) .toBe (61)
   expect (m [7]) .toBe (83)
   expect (m [8]) .toBe (1)
})

test ("rotate", () =>
{
   const m = new Matrix3 (1, 2, 0, 4, 5, 0, 7, 8, 1) .rotate (Math .PI / 4)

   expect (m [0]) .toBeCloseTo (3.5355339059327373)
   expect (m [1]) .toBeCloseTo (4.949747468305833)
   expect (m [2]) .toBeCloseTo (0)
   expect (m [3]) .toBeCloseTo (2.121320343559643)
   expect (m [4]) .toBeCloseTo (2.121320343559643)
   expect (m [5]) .toBeCloseTo (0)
   expect (m [6]) .toBeCloseTo (7)
   expect (m [7]) .toBeCloseTo (8)
   expect (m [8]) .toBeCloseTo (1)
})

test ("scale", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const m = new Matrix3 (1, 2, 0, 4, 5, 0, 7, 8, 1) .scale (new Vector2 (10, 11))

   expect (m [0]) .toBe (10)
   expect (m [1]) .toBe (20)
   expect (m [2]) .toBe (0)
   expect (m [3]) .toBe (44)
   expect (m [4]) .toBe (55)
   expect (m [5]) .toBe (0)
   expect (m [6]) .toBe (7)
   expect (m [7]) .toBe (8)
   expect (m [8]) .toBe (1)
})

test ("skewX", () =>
{
   const m = new Matrix3 (1, 2, 0, 4, 5, 0, 7, 8, 1) .skewX (Math .PI / 2)

   expect (m [0]) .toBeCloseTo (1)
   expect (m [1]) .toBeCloseTo (2)
   expect (m [2]) .toBeCloseTo (0)
   expect (m [3]) .toBeCloseTo (16331239353195374)
   expect (m [4]) .toBeCloseTo (32662478706390744)
   expect (m [5]) .toBeCloseTo (0)
   expect (m [6]) .toBeCloseTo (7)
   expect (m [7]) .toBeCloseTo (8)
   expect (m [8]) .toBeCloseTo (1)
})

test ("skewY", () =>
{
   const m = new Matrix3 (1, 2, 0, 4, 5, 0, 7, 8, 1) .skewY (Math .PI / 2)

   expect (m [0]) .toBeCloseTo (65324957412781480)
   expect (m [1]) .toBeCloseTo (81656196765976850)
   expect (m [2]) .toBeCloseTo (0)
   expect (m [3]) .toBeCloseTo (4)
   expect (m [4]) .toBeCloseTo (5)
   expect (m [5]) .toBeCloseTo (0)
   expect (m [6]) .toBeCloseTo (7)
   expect (m [7]) .toBeCloseTo (8)
   expect (m [8]) .toBeCloseTo (1)
})

test ("copy", () =>
{
   const m = new Matrix3 (2,3,4, 5,6,7, 8,9,10) .copy ()

   expect (m [0]) .toBe (2)
   expect (m [1]) .toBe (3)
   expect (m [2]) .toBe (4)
   expect (m [3]) .toBe (5)
   expect (m [4]) .toBe (6)
   expect (m [5]) .toBe (7)
   expect (m [6]) .toBe (8)
   expect (m [7]) .toBe (9)
   expect (m [8]) .toBe (10)
})

test ("assign", () =>
{
   const m = new Matrix3 () .assign (new Matrix3 (2,3,4, 5,6,7, 8,9,10))

   expect (m [0]) .toBe (2)
   expect (m [1]) .toBe (3)
   expect (m [2]) .toBe (4)
   expect (m [3]) .toBe (5)
   expect (m [4]) .toBe (6)
   expect (m [5]) .toBe (7)
   expect (m [6]) .toBe (8)
   expect (m [7]) .toBe (9)
   expect (m [8]) .toBe (10)
})

test ("equals", () =>
{
   const
      a = new Matrix3 (2,3,4, 5,6,7, 8,9,10),
      b = new Matrix3 (2,3,4, 5,6,7, 8,9,10)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})
