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

   expect (m1 .length) .toBe (4)
   expect (m1 .order)  .toBe (2)

   const m2 = new Matrix2 (2,3, 4,5)

   expect (m2) .toEqual ({
      0:2, 1:3,
      2:4, 3:5,
   })

   expect ([... m2]) .toEqual ([
      2,3, 4,5
   ])

   expect (m2 .length) .toBe (4)
   expect (m2 .order)  .toBe (2)
})

test ("inverse", () =>
{
   // https://www.wolframalpha.com/calculators/matrix-inverse-calculator

   const m = new Matrix2 (1,2, 4,3) .inverse ()

   expect (m [0]) .toBeCloseTo (-3 / 5)
   expect (m [1]) .toBeCloseTo ( 2 / 5)
   expect (m [2]) .toBeCloseTo ( 4 / 5)
   expect (m [3]) .toBeCloseTo (-1 / 5)
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
})

test ("multVecMatrix2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multVecMatrix (new Vector2 (5, 6))

   expect (v [0]) .toBe (23)
   expect (v [1]) .toBe (34)
})

test ("multMatrixVec1", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multMatrixVec (5)

   expect (v) .toBeCloseTo (7 / 19)
})

test ("multMatrixVec2", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix2 (1, 2, 3, 4) .multMatrixVec (new Vector2 (5, 6))

   expect (v [0]) .toBe (17)
   expect (v [1]) .toBe (39)
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
