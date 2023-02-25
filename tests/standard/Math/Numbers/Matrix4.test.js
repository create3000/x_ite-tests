const
   X3D     = require ("../../../X3D"),
   Matrix4 = X3D .require ("standard/Math/Numbers/Matrix4")

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

   const m = new Matrix4 (3,2,1,0.1, 2,3,1,0.2, 2,1,3,0.3, 1,2,3,4) .inverse ();

   expect (m [0]) .toBeCloseTo (0.678241)
   expect (m [1]) .toBeCloseTo (-0.428241)
   expect (m [2]) .toBeCloseTo (-0.0949074)
   expect (m [3]) .toBeCloseTo (0.0115741)
   expect (m [4]) .toBeCloseTo (-0.349537)
   expect (m [5]) .toBeCloseTo (0.599537)
   expect (m [6]) .toBeCloseTo (-0.0671296)
   expect (m [7]) .toBeCloseTo (-0.0162037)
   expect (m [8]) .toBeCloseTo (-0.363426)
   expect (m [9]) .toBeCloseTo (0.113426)
   expect (m [10]) .toBeCloseTo (0.446759)
   expect (m [11]) .toBeCloseTo (-0.0300926)
   expect (m [12]) .toBeCloseTo (0.277778)
   expect (m [13]) .toBeCloseTo (-0.277778)
   expect (m [14]) .toBeCloseTo (-0.277778)
   expect (m [15]) .toBeCloseTo (0.277778)
})
