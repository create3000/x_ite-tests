const
   X3D     = require ("../../../X3D"),
   Matrix4 = X3D .require ("standard/Math/Numbers/Matrix4"),
   Vector3 = X3D .require ("standard/Math/Numbers/Vector3"),
   Vector4 = X3D .require ("standard/Math/Numbers/Vector4")

test ("constructor", () =>
{
   expect (new Matrix4 ()) .toEqual ({
      0:1, 1:0, 2:0, 3:0,
      4:0, 5:1, 6:0, 7:0,
      8:0, 9:0, 10:1, 11:0,
      12:0, 13:0, 14:0, 15:1,
   })
})

test ("inverse", () =>
{
   // https://www.wolframalpha.com/calculators/matrix-inverse-calculator

   const m = new Matrix4 (3,2,1,0.1, 2,3,1,0.2, 2,1,3,0.3, 1,2,3,4) .inverse ()

   expect (m [ 0]) .toBeCloseTo (0.678241)
   expect (m [ 1]) .toBeCloseTo (-0.428241)
   expect (m [ 2]) .toBeCloseTo (-0.0949074)
   expect (m [ 3]) .toBeCloseTo (0.0115741)
   expect (m [ 4]) .toBeCloseTo (-0.349537)
   expect (m [ 5]) .toBeCloseTo (0.599537)
   expect (m [ 6]) .toBeCloseTo (-0.0671296)
   expect (m [ 7]) .toBeCloseTo (-0.0162037)
   expect (m [ 8]) .toBeCloseTo (-0.363426)
   expect (m [ 9]) .toBeCloseTo (0.113426)
   expect (m [10]) .toBeCloseTo (0.446759)
   expect (m [11]) .toBeCloseTo (-0.0300926)
   expect (m [12]) .toBeCloseTo (0.277778)
   expect (m [13]) .toBeCloseTo (-0.277778)
   expect (m [14]) .toBeCloseTo (-0.277778)
   expect (m [15]) .toBeCloseTo (0.277778)
})

test ("multRight", () =>
{
   // https://www.matopt.de/werkzeuge/grundlagen/matrixmultiplikation.html

   const
      m1 = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16),
      m2 = new Matrix4 (17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32),
      m  = m1 .multRight (m2)

   expect (m [ 0]) .toBe (250)
   expect (m [ 1]) .toBe (260)
   expect (m [ 2]) .toBe (270)
   expect (m [ 3]) .toBe (280)
   expect (m [ 4]) .toBe (618)
   expect (m [ 5]) .toBe (644)
   expect (m [ 6]) .toBe (670)
   expect (m [ 7]) .toBe (696)
   expect (m [ 8]) .toBe (986)
   expect (m [ 9]) .toBe (1028)
   expect (m [10]) .toBe (1070)
   expect (m [11]) .toBe (1112)
   expect (m [12]) .toBe (1354)
   expect (m [13]) .toBe (1412)
   expect (m [14]) .toBe (1470)
   expect (m [15]) .toBe (1528)
})

test ("multLeft", () =>
{
   // https://www.matopt.de/werkzeuge/grundlagen/matrixmultiplikation.html

   const
      m1 = new Matrix4 (17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32),
      m2 = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16),
      m  = m1 .multLeft (m2)

   expect (m [ 0]) .toBe (250)
   expect (m [ 1]) .toBe (260)
   expect (m [ 2]) .toBe (270)
   expect (m [ 3]) .toBe (280)
   expect (m [ 4]) .toBe (618)
   expect (m [ 5]) .toBe (644)
   expect (m [ 6]) .toBe (670)
   expect (m [ 7]) .toBe (696)
   expect (m [ 8]) .toBe (986)
   expect (m [ 9]) .toBe (1028)
   expect (m [10]) .toBe (1070)
   expect (m [11]) .toBe (1112)
   expect (m [12]) .toBe (1354)
   expect (m [13]) .toBe (1412)
   expect (m [14]) .toBe (1470)
   expect (m [15]) .toBe (1528)
})

test ("transpose", () =>
{
   const m = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) .transpose ()

   expect (m [ 0]) .toBe (1)
   expect (m [ 1]) .toBe (5)
   expect (m [ 2]) .toBe (9)
   expect (m [ 3]) .toBe (13)
   expect (m [ 4]) .toBe (2)
   expect (m [ 5]) .toBe (6)
   expect (m [ 6]) .toBe (10)
   expect (m [ 7]) .toBe (14)
   expect (m [ 8]) .toBe (3)
   expect (m [ 9]) .toBe (7)
   expect (m [10]) .toBe (11)
   expect (m [11]) .toBe (15)
   expect (m [12]) .toBe (4)
   expect (m [13]) .toBe (8)
   expect (m [14]) .toBe (12)
   expect (m [15]) .toBe (16)
})

test ("determinant", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix4 (1,2,3,4, 4,3,2,1, 2,1,3,4, 3,4,1,2) .determinant ()

   expect (d) .toBe (-40)
})

test ("determinant3", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const d = new Matrix4 (1,2,3,4, 3,2,1,4, 2,1,3,4) .determinant3 ()

   expect (d) .toBe (-12)
})

test ("multVecMatrix4", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) .multVecMatrix (new Vector3 (17, 18, 19))

   expect (v [0]) .toBeCloseTo (291 / 456)
   expect (v [1]) .toBeCloseTo (346 / 456)
   expect (v [2]) .toBeCloseTo (401 / 456)
})

test ("multVec4Matrix", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) .multVecMatrix (new Vector4 (17, 18, 19, 20))

   expect (v [0]) .toBe (538)
   expect (v [1]) .toBe (612)
   expect (v [2]) .toBe (686)
   expect (v [3]) .toBe (760)
})

test ("multMatrixVec4", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) .multMatrixVec (new Vector3 (17, 18, 19))

   expect (v [0]) .toBeCloseTo (114 / 774)
   expect (v [1]) .toBeCloseTo (334 / 774)
   expect (v [2]) .toBeCloseTo (554 / 774)
})

test ("multMatrixVec4", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const v = new Matrix4 (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16) .multMatrixVec (new Vector4 (17, 18, 19, 20))

   expect (v [0]) .toBe (190)
   expect (v [1]) .toBe (486)
   expect (v [2]) .toBe (782)
   expect (v [3]) .toBe (1078)
})
