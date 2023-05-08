const
   X3D       = require ("../../../X3D"),
   Complex = X3D .require ("standard/Math/Numbers/Complex")

test ("constructor", () =>
{
   const c1 = new Complex (1,2)

   expect (c1 .real) .toBe (1)
   expect (c1 .imag) .toBe (2)
   expect (c1 [0]) .toBe (1)
   expect (c1 [1]) .toBe (2)
   expect ([... c1]) .toEqual ([1,2])
   expect (c1) .toHaveLength (2)

   c1 .real = 5
   c1 .imag = 6

   expect (c1 .real) .toBe (5)
   expect (c1 .imag) .toBe (6)
   expect (c1 [0]) .toBe (5)
   expect (c1 [1]) .toBe (6)
   expect ([... c1]) .toEqual ([5,6])
   expect (c1) .toHaveLength (2)

   c1 [0] = 7
   c1 [1] = 8

   expect (c1 .real) .toBe (7)
   expect (c1 .imag) .toBe (8)
   expect (c1 [0]) .toBe (7)
   expect (c1 [1]) .toBe (8)
   expect ([... c1]) .toEqual ([7,8])
   expect (c1) .toHaveLength (2)
})

test ("copy", () =>
{
   const c1 = new Complex (1,2)

   expect ([... c1 .copy ()]) .toEqual ([1,2])
})

test ("assign", () =>
{
   const
      c1 = new Complex (0, 0),
      v2 = new Complex (1,2)

   expect ([... c1 .assign (v2)]) .toEqual ([1,2])
})

test ("set", () =>
{
   const c1 = new Complex (0, 0)

   expect ([... c1 .set (1,2)]) .toEqual ([1,2])
})

test ("setPolar", () =>
{
   const c1 = Complex .Polar (1, Math .PI / 4)

   expect (c1 .real) .toBeCloseTo (Math .SQRT1_2)
   expect (c1 .imag) .toBeCloseTo (Math .SQRT1_2)

   c1 .setPolar (1, Math .PI * 5 / 4)

   expect (c1 .real) .toBeCloseTo (-Math .SQRT1_2)
   expect (c1 .imag) .toBeCloseTo (-Math .SQRT1_2)
})

test ("equals", () =>
{
   const
      a = new Complex (1,2),
      b = new Complex (1,2)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})

test ("conjugate", () =>
{
   const c1 = new Complex (1, 2)

   c1 .conjugate ()

   expect ([... c1]) .toEqual ([1,-2])
})

test ("negate", () =>
{
   const c1 = new Complex (1, 2)

   c1 .negate ()

   expect ([... c1]) .toEqual ([-1,-2])
})

test ("magnitude", () =>
{
   const c1 = new Complex (2, 3)

   expect (c1 .magnitude) .toBeCloseTo (Math .sqrt (13))
})

test ("angle", () =>
{
   const c1 = new Complex (2, 3)

   expect (c1 .angle) .toBeCloseTo (Math .atan (3/2))
})

test ("inverse", () =>
{
   const c1 = new Complex (2,3)

   c1 .inverse ()

   expect (c1 .real) .toBeCloseTo (2/13)
   expect (c1 .imag) .toBeCloseTo (-3/13)
})

test ("add", () =>
{
   const
      c1 = new Complex (2,3),
      c2 = new Complex (3,4)

   c1 .add (c2)

   expect (c1 .real) .toBe (5)
   expect (c1 .imag) .toBe (7)
})

test ("subtract", () =>
{
   const
      c1 = new Complex (2,3),
      c2 = new Complex (3,4)

   c1 .subtract (c2)

   expect (c1 .real) .toBe (-1)
   expect (c1 .imag) .toBe (-1)
})

test ("multiply", () =>
{
   const c1 = new Complex (2,3)

   c1 .multiply (5)

   expect (c1 .real) .toBe (10)
   expect (c1 .imag) .toBe (15)
})

test ("multComp", () =>
{
   const
      c1 = new Complex (2,3),
      c2 = new Complex (3,4)

   c1 .multComp (c2)

   expect (c1 .real) .toBe (-6)
   expect (c1 .imag) .toBe (17)
})

test ("divide", () =>
{
   const c1 = new Complex (10,15)

   c1 .divide (5)

   expect (c1 .real) .toBe (2)
   expect (c1 .imag) .toBe (3)
})

test ("divComp", () =>
{
   const
      c1 = new Complex (2,3),
      c2 = new Complex (3,4)

   c1 .divComp (c2)

   expect (c1 .real) .toBeCloseTo (18/25)
   expect (c1 .imag) .toBeCloseTo (1/25)
})
