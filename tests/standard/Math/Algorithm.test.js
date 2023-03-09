const
   X3D       = require ("../../X3D"),
   Algorithm = X3D .require ("standard/Math/Algorithm")

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
