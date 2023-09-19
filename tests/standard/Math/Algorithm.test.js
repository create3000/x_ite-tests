const
   X3D       = require ("../../X3D"),
   Algorithm = X3D .require ("standard/Math/Algorithm")

test ("radians", () =>
{
   expect (Algorithm .radians (0))   .toBe (0)
   expect (Algorithm .radians (90))  .toBeCloseTo (Math .PI / 2)
   expect (Algorithm .radians (180)) .toBeCloseTo (Math .PI)
   expect (Algorithm .radians (360)) .toBeCloseTo (Math .PI * 2)
   expect (Algorithm .radians (720)) .toBeCloseTo (Math .PI * 4)

   expect (Algorithm .radians (-90))  .toBeCloseTo (-Math .PI / 2)
   expect (Algorithm .radians (-180)) .toBeCloseTo (-Math .PI)
   expect (Algorithm .radians (-360)) .toBeCloseTo (-Math .PI * 2)
   expect (Algorithm .radians (-720)) .toBeCloseTo (-Math .PI * 4)
})

test ("degrees", () =>
{
   expect (Algorithm .degrees (0))            .toBe (0)
   expect (Algorithm .degrees (Math .PI / 2)) .toBeCloseTo (90)
   expect (Algorithm .degrees (Math .PI))     .toBeCloseTo (180)
   expect (Algorithm .degrees (Math .PI * 2)) .toBeCloseTo (360)
   expect (Algorithm .degrees (Math .PI * 4)) .toBeCloseTo (720)

   expect (Algorithm .degrees (-Math .PI / 2)) .toBeCloseTo (-90)
   expect (Algorithm .degrees (-Math .PI))     .toBeCloseTo (-180)
   expect (Algorithm .degrees (-Math .PI * 2)) .toBeCloseTo (-360)
   expect (Algorithm .degrees (-Math .PI * 4)) .toBeCloseTo (-720)
})

test ("random", () =>
{
   for (let i = 0; i < 10; ++ i)
   {
      const v = Algorithm .random (-2, 2)

      expect (v) .toBeGreaterThanOrEqual (-2)
      expect (v) .toBeLessThanOrEqual (2)
   }
})

test ("clamp", () =>
{
   expect (Algorithm .clamp ( 1.5, -1, 1)) .toBe ( 1.0)
   expect (Algorithm .clamp ( 1.0, -1, 1)) .toBe ( 1.0)
   expect (Algorithm .clamp ( 0.5, -1, 1)) .toBe ( 0.5)
   expect (Algorithm .clamp ( 0.0, -1, 1)) .toBe ( 0.0)
   expect (Algorithm .clamp (-0.5, -1, 1)) .toBe (-0.5)
   expect (Algorithm .clamp (-1.0, -1, 1)) .toBe (-1.0)
   expect (Algorithm .clamp (-1.5, -1, 1)) .toBe (-1.0)
})

test ("fract", () =>
{
   expect (Algorithm .fract (0))    .toBe (0)
   expect (Algorithm .fract (1.5))  .toBeCloseTo (0.5)
   expect (Algorithm .fract (2.4))  .toBeCloseTo (0.4)
   expect (Algorithm .fract (-3.3)) .toBeCloseTo (-0.3)
   expect (Algorithm .fract (-0.5)) .toBeCloseTo (-0.5)
})

test ("roundToMultiple", () =>
{
   expect (Algorithm .roundToMultiple (0, 2)) .toBe (0)
   expect (Algorithm .roundToMultiple (1, 2)) .toBe (2)
   expect (Algorithm .roundToMultiple (2, 2)) .toBe (2)
   expect (Algorithm .roundToMultiple (3, 2)) .toBe (4)
   expect (Algorithm .roundToMultiple (4, 2)) .toBe (4)
   expect (Algorithm .roundToMultiple (5, 2)) .toBe (6)
   expect (Algorithm .roundToMultiple (6, 2)) .toBe (6)
   expect (Algorithm .roundToMultiple (7, 2)) .toBe (8)
   expect (Algorithm .roundToMultiple (8, 2)) .toBe (8)

   expect (Algorithm .roundToMultiple ( 0, 4)) .toBe (0)
   expect (Algorithm .roundToMultiple ( 1, 4)) .toBe (4)
   expect (Algorithm .roundToMultiple ( 2, 4)) .toBe (4)
   expect (Algorithm .roundToMultiple ( 3, 4)) .toBe (4)
   expect (Algorithm .roundToMultiple ( 4, 4)) .toBe (4)
   expect (Algorithm .roundToMultiple ( 5, 4)) .toBe (8)
   expect (Algorithm .roundToMultiple ( 6, 4)) .toBe (8)
   expect (Algorithm .roundToMultiple ( 7, 4)) .toBe (8)
   expect (Algorithm .roundToMultiple ( 8, 4)) .toBe (8)
   expect (Algorithm .roundToMultiple ( 9, 4)) .toBe (12)
   expect (Algorithm .roundToMultiple (10, 4)) .toBe (12)
   expect (Algorithm .roundToMultiple (11, 4)) .toBe (12)
   expect (Algorithm .roundToMultiple (12, 4)) .toBe (12)
})

test ("isPowerOfTwo", () =>
{
   expect (Algorithm .isPowerOfTwo (0)) .toBe (true)
   expect (Algorithm .isPowerOfTwo (1)) .toBe (true)
   expect (Algorithm .isPowerOfTwo (2)) .toBe (true)
   expect (Algorithm .isPowerOfTwo (3)) .toBe (false)
   expect (Algorithm .isPowerOfTwo (4)) .toBe (true)
   expect (Algorithm .isPowerOfTwo (5)) .toBe (false)
   expect (Algorithm .isPowerOfTwo (6)) .toBe (false)
   expect (Algorithm .isPowerOfTwo (7)) .toBe (false)
   expect (Algorithm .isPowerOfTwo (8)) .toBe (true)
})

test ("nextPowerOfTwo", () =>
{
   expect (Algorithm .nextPowerOfTwo (0)) .toBe (0)
   expect (Algorithm .nextPowerOfTwo (1)) .toBe (1)
   expect (Algorithm .nextPowerOfTwo (2)) .toBe (2)
   expect (Algorithm .nextPowerOfTwo (3)) .toBe (4)
   expect (Algorithm .nextPowerOfTwo (4)) .toBe (4)
   expect (Algorithm .nextPowerOfTwo (5)) .toBe (8)
   expect (Algorithm .nextPowerOfTwo (6)) .toBe (8)
   expect (Algorithm .nextPowerOfTwo (7)) .toBe (8)
   expect (Algorithm .nextPowerOfTwo (8)) .toBe (8)
})

test ("bitCount", () =>
{
   expect (Algorithm .bitCount (0)) .toBe (0)
   expect (Algorithm .bitCount (0xffffffff)) .toBe (32)
   expect (Algorithm .bitCount (0b1010101)) .toBe (4)
   expect (Algorithm .bitCount (0b1100110011)) .toBe (6)
})
