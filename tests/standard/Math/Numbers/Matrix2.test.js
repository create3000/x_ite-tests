const
   X3D     = require ("../../../X3D"),
   Matrix2 = X3D .require ("standard/Math/Numbers/Matrix2"),
   Vector2 = X3D .require ("standard/Math/Numbers/Vector2")

test ("constructor", () =>
{
   const m1 = new Matrix2 ()

   expect (m1) .toEqual ({
      0:1, 1:0,
      2:0, 3:1,
   })

   expect ([... m1]) .toEqual ([
      1, 0,
      0, 1,
   ])

   expect (m1) .toHaveLength (4)
   expect (m1 .order)  .toBe (2)

   const m2 = new Matrix2 (2,3, 4,5)

   expect (m2) .toEqual ({
      0:2, 1:3,
      2:4, 3:5,
   })

   expect ([... m2]) .toEqual ([
      2,3, 4,5
   ])

   expect (m2) .toHaveLength (4)
   expect (m2 .order)  .toBe (2)
})

test ("set", () =>
{
   const m1 = new Matrix2 (2,3, 4,5)

   m1 .set ()

   expect ([... m1]) .toEqual ([
      1, 0,
      0, 1,
   ])

   m1 .set (2,3, 4,5)

   expect ([... m1]) .toEqual ([
      2,3, 4,5
   ])
})

test ("inverse", () =>
{
   // https://www.wolframalpha.com/calculators/matrix-inverse-calculator

   const m = new Matrix2 (1,2, 4,3) .inverse ()

   expect (m [0]) .toBeCloseTo (-3 / 5)
   expect (m [1]) .toBeCloseTo ( 2 / 5)
   expect (m [2]) .toBeCloseTo ( 4 / 5)
   expect (m [3]) .toBeCloseTo (-1 / 5)

   const m2 = new Matrix2 (1,3, 4,5) .inverse ()

   expect (m2 [0]) .toBeCloseTo (-5/7)
   expect (m2 [1]) .toBeCloseTo ( 3/7)
   expect (m2 [2]) .toBeCloseTo ( 4/7)
   expect (m2 [3]) .toBeCloseTo (-1/7)

   const m3 = new Matrix2 (1,3, 4,5) .inverse () .inverse ()

   expect (m3 [0]) .toBeCloseTo (1)
   expect (m3 [1]) .toBeCloseTo (3)
   expect (m3 [2]) .toBeCloseTo (4)
   expect (m3 [3]) .toBeCloseTo (5)

   const m4 = new Matrix2 (1,3, 4,5)

   m4 .multRight (m4 .copy () .inverse ())

   expect (m4 [0]) .toBeCloseTo (1)
   expect (m4 [1]) .toBeCloseTo (0)
   expect (m4 [2]) .toBeCloseTo (0)
   expect (m4 [3]) .toBeCloseTo (1)
})

test ("multRight", () =>
{
   // https://www.matopt.de/werkzeuge/grundlagen/matrixmultiplikation.html

   const
      m1 = new Matrix2 (1, 2, 3, 4),
      m2 = new Matrix2 (5, 6, 7, 8),
      m  = m1 .multRight (m2)

   expect (m [0]) .toBe (19)
   expect (m [1]) .toBe (22)
   expect (m [2]) .toBe (43)
   expect (m [3]) .toBe (50)
})

test ("multLeft", () =>
{
   // https://www.matopt.de/werkzeuge/grundlagen/matrixmultiplikation.html

   const
      m1 = new Matrix2 (5, 6, 7, 8),
      m2 = new Matrix2 (1, 2, 3, 4),
      m  = m1 .multLeft (m2)

   expect (m [0]) .toBe (19)
   expect (m [1]) .toBe (22)
   expect (m [2]) .toBe (43)
   expect (m [3]) .toBe (50)
})

test ("transpose", () =>
{
   const m = new Matrix2 (1, 2, 3, 4) .transpose ()

   expect (m [0]) .toBe (1)
   expect (m [1]) .toBe (3)
   expect (m [2]) .toBe (2)
   expect (m [3]) .toBe (4)

   const m1 = new Matrix2 (1, 2, 3, 4) .transpose () .transpose ()

   expect (m1 [0]) .toBe (1)
   expect (m1 [1]) .toBe (2)
   expect (m1 [2]) .toBe (3)
   expect (m1 [3]) .toBe (4)
})

test ("determinant", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix2 (1,2, 4,3) .determinant ()

   expect (d) .toBe (-5)
})

test ("determinant1", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix2 (1,2, 4,3) .determinant1 ()

   expect (d) .toBe (1)
})

test ("multVecMatrix1", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multVecMatrix (5)

   expect (v) .toBeCloseTo (8 / 14)

   const v1 = new Matrix2 (1, 2, 3, 4) .transpose () .multVecMatrix (5)

   expect (v1) .toBeCloseTo (7 / 19)
})

test ("multVecMatrix2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multVecMatrix (new Vector2 (5, 6))

   expect (v [0]) .toBe (23)
   expect (v [1]) .toBe (34)

   const v1 = new Matrix2 (1, 2, 3, 4) .transpose () .multVecMatrix (new Vector2 (5, 6))

   expect (v1 [0]) .toBe (17)
   expect (v1 [1]) .toBe (39)
})

test ("multMatrixVec1", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multMatrixVec (5)

   expect (v) .toBeCloseTo (7 / 19)

   const v1 = new Matrix2 (1, 2, 3, 4) .transpose () .multMatrixVec (5)

   expect (v1) .toBeCloseTo (8 / 14)
})

test ("multMatrixVec2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multMatrixVec (new Vector2 (5, 6))

   expect (v [0]) .toBe (17)
   expect (v [1]) .toBe (39)

   const v1 = new Matrix2 (1, 2, 3, 4) .transpose () .multMatrixVec (new Vector2 (5, 6))

   expect (v1 [0]) .toBe (23)
   expect (v1 [1]) .toBe (34)
})

test ("copy", () =>
{
   const m = new Matrix2 (2,3, 4,5) .copy ()

   expect (m [0]) .toBe (2)
   expect (m [1]) .toBe (3)
   expect (m [2]) .toBe (4)
   expect (m [3]) .toBe (5)
})

test ("assign", () =>
{
   const m = new Matrix2 () .assign (new Matrix2 (2,3, 4,5))

   expect (m [0]) .toBe (2)
   expect (m [1]) .toBe (3)
   expect (m [2]) .toBe (4)
   expect (m [3]) .toBe (5)
})

test ("equals", () =>
{
   const
      a = new Matrix2 (2,3, 4,5),
      b = new Matrix2 (2,3, 4,5)

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
   const m = new Matrix2 (2,3, 4,5, 6,7)

   expect (m .toString ()) .toBe ([... m] .join (" "))
})
