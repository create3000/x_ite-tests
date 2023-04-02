const
   X3D       = require ("../../../X3D"),
   Matrix4   = X3D .require ("standard/Math/Numbers/Matrix4"),
   Vector3   = X3D .require ("standard/Math/Numbers/Vector3"),
   Vector4   = X3D .require ("standard/Math/Numbers/Vector4"),
   Rotation4 = X3D .require ("standard/Math/Numbers/Rotation4")

test ("constructor", () =>
{
   const m1 = new Matrix4 ()

   expect (m1) .toEqual ({
      0:1, 1:0, 2:0, 3:0,
      4:0, 5:1, 6:0, 7:0,
      8:0, 9:0, 10:1, 11:0,
      12:0, 13:0, 14:0, 15:1,
   })

   expect ([... m1]) .toEqual ([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
   ])

   expect (m1 .length) .toBe (16)
   expect (m1 .order)  .toBe (4)

   const m2 = new Matrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17)

   expect (m2) .toEqual ({
      0:2, 1:3, 2:4, 3:5,
      4:6, 5:7, 6:8, 7:9,
      8:10, 9:11, 10:12, 11:13,
      12:14, 13:15, 14:16, 15:17,
   })

   expect ([... m2]) .toEqual ([
      2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17
   ])

   expect (m2 .length) .toBe (16)
   expect (m2 .order)  .toBe (4)
})

test ("set1", () =>
{
   const m1 = new Matrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17)

   m1 .set ()

   expect ([... m1]) .toEqual ([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
   ])

   m1 .set (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17)

   expect ([... m1]) .toEqual ([
      2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17
   ])
})

test ("set2", () =>
{
   const
      m1 = new Matrix4 (),
      t  = new Vector3 (2, 3, 4),
      r  = new Rotation4 (2, 3, 4, 5),
      s  = new Vector3 (5, 6, 7)

   m1 .set (t, null, s)

   expect ([... m1]) .toEqual ([
      5, 0, 0, 0,
      0, 6, 0, 0,
      0, 0, 7, 0,
      2, 3, 4, 1,
   ])

   m1 .set (t, r, s)

   expect (m1 [ 0]) .toBeCloseTo (1.91233700630701)
   expect (m1 [ 1]) .toBeCloseTo (-2.820316230908796)
   expect (m1 [ 2]) .toBeCloseTo (3.6590686700280917)
   expect (m1 [ 3]) .toBeCloseTo (0)
   expect (m1 [ 4]) .toBeCloseTo (5.1628733614577165)
   expect (m1 [ 5]) .toBeCloseTo (3.03584352605473)
   expect (m1 [ 6]) .toBeCloseTo (-0.35831932526990584)
   expect (m1 [ 7]) .toBeCloseTo (0)
   expect (m1 [ 8]) .toBeCloseTo (-2.356150095690409)
   expect (m1 [ 9]) .toBeCloseTo (4.567858276338269)
   expect (m1 [10]) .toBeCloseTo (4.752181340591503)
   expect (m1 [11]) .toBeCloseTo (0)
   expect (m1 [12]) .toBeCloseTo (2)
   expect (m1 [13]) .toBeCloseTo (3)
   expect (m1 [14]) .toBeCloseTo (4)
   expect (m1 [15]) .toBeCloseTo (1)
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

   const m2 = new Matrix4 (1,2,4,0.4, 5,6,8,0.8, 9,10,12,0.12, 14,15,16,17) .inverse ()

   expect (m2 [ 0]) .toBeCloseTo (-932/27)
   expect (m2 [ 1]) .toBeCloseTo (1729/27)
   expect (m2 [ 2]) .toBeCloseTo (-770/27)
   expect (m2 [ 3]) .toBeCloseTo (-2)
   expect (m2 [ 4]) .toBeCloseTo (457/9)
   expect (m2 [ 5]) .toBeCloseTo (-860/9)
   expect (m2 [ 6]) .toBeCloseTo (385/9)
   expect (m2 [ 7]) .toBeCloseTo (3)
   expect (m2 [ 8]) .toBeCloseTo (-197/12)
   expect (m2 [ 9]) .toBeCloseTo (379/12)
   expect (m2 [10]) .toBeCloseTo (-85/6)
   expect (m2 [11]) .toBeCloseTo (-1)
   expect (m2 [12]) .toBeCloseTo (-25/27)
   expect (m2 [13]) .toBeCloseTo (50/27)
   expect (m2 [14]) .toBeCloseTo (-25/27)
   expect (m2 [15]) .toBeCloseTo (0)
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

test ("translate", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const m = new Matrix4 (1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 1) .translate (new Vector3 (17, 18, 19))

   expect (m [ 0]) .toBe (1)
   expect (m [ 1]) .toBe (2)
   expect (m [ 2]) .toBe (3)
   expect (m [ 3]) .toBe (0)
   expect (m [ 4]) .toBe (5)
   expect (m [ 5]) .toBe (6)
   expect (m [ 6]) .toBe (7)
   expect (m [ 7]) .toBe (0)
   expect (m [ 8]) .toBe (9)
   expect (m [ 9]) .toBe (10)
   expect (m [10]) .toBe (11)
   expect (m [11]) .toBe (0)
   expect (m [12]) .toBe (291)
   expect (m [13]) .toBe (346)
   expect (m [14]) .toBe (401)
   expect (m [15]) .toBe (1)
})

test ("rotate", () =>
{
   const m = new Matrix4 (1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 1) .rotate (new Rotation4 (2, 3, 4, 5))

   expect (m [ 0]) .toBeCloseTo (4.14847477640317)
   expect (m [ 1]) .toBeCloseTo (4.698692665488432)
   expect (m [ 2]) .toBeCloseTo (5.248910554573694)
   expect (m [ 3]) .toBeCloseTo (0)
   expect (m [ 4]) .toBeCloseTo (2.852869510717036)
   expect (m [ 5]) .toBeCloseTo (4.159602437757459)
   expect (m [ 6]) .toBeCloseTo (5.4663353647978825)
   expect (m [ 7]) .toBeCloseTo (0)
   expect (m [ 8]) .toBeCloseTo (9.036110478760637)
   expect (m [ 9]) .toBeCloseTo (10.030951838937689)
   expect (m [10]) .toBeCloseTo (11.02579319911474)
   expect (m [11]) .toBeCloseTo (0)
   expect (m [12]) .toBeCloseTo (13)
   expect (m [13]) .toBeCloseTo (14)
   expect (m [14]) .toBeCloseTo (15)
   expect (m [15]) .toBeCloseTo (1)
})

test ("scale", () =>
{
   // https://www.wolframalpha.com/calculators/determinant-calculator

   const m = new Matrix4 (1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 1) .scale (new Vector3 (17, 18, 19))

   expect (m [ 0]) .toBe (17)
   expect (m [ 1]) .toBe (34)
   expect (m [ 2]) .toBe (51)
   expect (m [ 3]) .toBe (0)
   expect (m [ 4]) .toBe (90)
   expect (m [ 5]) .toBe (108)
   expect (m [ 6]) .toBe (126)
   expect (m [ 7]) .toBe (0)
   expect (m [ 8]) .toBe (171)
   expect (m [ 9]) .toBe (190)
   expect (m [10]) .toBe (209)
   expect (m [11]) .toBe (0)
   expect (m [12]) .toBe (13)
   expect (m [13]) .toBe (14)
   expect (m [14]) .toBe (15)
   expect (m [15]) .toBe (1)
})

test ("copy", () =>
{
   const m = new Matrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17) .copy ()

   expect (m [ 0]) .toBe (2)
   expect (m [ 1]) .toBe (3)
   expect (m [ 2]) .toBe (4)
   expect (m [ 3]) .toBe (5)
   expect (m [ 4]) .toBe (6)
   expect (m [ 5]) .toBe (7)
   expect (m [ 6]) .toBe (8)
   expect (m [ 7]) .toBe (9)
   expect (m [ 8]) .toBe (10)
   expect (m [ 9]) .toBe (11)
   expect (m [10]) .toBe (12)
   expect (m [11]) .toBe (13)
   expect (m [12]) .toBe (14)
   expect (m [13]) .toBe (15)
   expect (m [14]) .toBe (16)
   expect (m [15]) .toBe (17)
})

test ("assign", () =>
{
   const m = new Matrix4 () .assign (new Matrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17))

   expect (m [ 0]) .toBe (2)
   expect (m [ 1]) .toBe (3)
   expect (m [ 2]) .toBe (4)
   expect (m [ 3]) .toBe (5)
   expect (m [ 4]) .toBe (6)
   expect (m [ 5]) .toBe (7)
   expect (m [ 6]) .toBe (8)
   expect (m [ 7]) .toBe (9)
   expect (m [ 8]) .toBe (10)
   expect (m [ 9]) .toBe (11)
   expect (m [10]) .toBe (12)
   expect (m [11]) .toBe (13)
   expect (m [12]) .toBe (14)
   expect (m [13]) .toBe (15)
   expect (m [14]) .toBe (16)
   expect (m [15]) .toBe (17)
})

test ("equals", () =>
{
   const
      a = new Matrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17),
      b = new Matrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})
