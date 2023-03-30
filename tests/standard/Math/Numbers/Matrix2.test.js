const
   X3D     = require ("../../../X3D"),
   Matrix2 = X3D .require ("standard/Math/Numbers/Matrix2")

test ("constructor", () =>
{
   expect (new Matrix2 ()) .toEqual ({
      0:1, 1:0,
      2:0, 3:1,
   })
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

test ("determinan1", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix2 (1,2, 4,3) .determinant1 ()

   expect (d) .toBe (1)
})
