const
   X3D    = require ("../../../X3D"),
   Color3 = X3D .require ("standard/Math/Numbers/Color3")

test ("constructor", () =>
{
   const c1 = new Color3 (0, 0, 0)

   expect (c1 .r) .toBe (0)
   expect (c1 .g) .toBe (0)
   expect (c1 .b) .toBe (0)
   expect (c1 [0]) .toBe (0)
   expect (c1 [1]) .toBe (0)
   expect (c1 [2]) .toBe (0)
   expect ([... c1]) .toEqual ([0, 0, 0])
   expect (c1 .length) .toBe (3)

   const c2 = new Color3 (0.1, 0.2, 0.3)

   expect (c2 .r) .toBe (0.1)
   expect (c2 .g) .toBe (0.2)
   expect (c2 .b) .toBe (0.3)
   expect (c2 [0]) .toBe (0.1)
   expect (c2 [1]) .toBe (0.2)
   expect (c2 [2]) .toBe (0.3)
   expect ([... c2]) .toEqual ([0.1, 0.2, 0.3])
   expect (c2 .length) .toBe (3)

   const c3 = new Color3 (2, 3, 4)

   expect (c3 .r) .toBe (1)
   expect (c3 .g) .toBe (1)
   expect (c3 .b) .toBe (1)
   expect (c3 [0]) .toBe (1)
   expect (c3 [1]) .toBe (1)
   expect (c3 [2]) .toBe (1)
   expect ([... c3]) .toEqual ([1, 1, 1])
   expect (c3 .length) .toBe (3)

   const c4 = new Color3 (0, 0, 0)

   c4 .r = 0.1
   c4 .g = 0.2
   c4 .b = 0.3

   expect (c4 .r) .toBe (0.1)
   expect (c4 .g) .toBe (0.2)
   expect (c4 .b) .toBe (0.3)
   expect (c4 [0]) .toBe (0.1)
   expect (c4 [1]) .toBe (0.2)
   expect (c4 [2]) .toBe (0.3)

   c4 .r = 2
   c4 .g = 3
   c4 .b = 4

   expect (c4 .r) .toBe (1)
   expect (c4 .g) .toBe (1)
   expect (c4 .b) .toBe (1)
   expect (c4 [0]) .toBe (1)
   expect (c4 [1]) .toBe (1)
   expect (c4 [2]) .toBe (1)
})

test ("copy", () =>
{
   const v1 = new Color3 (0.1, 0.2, 0.3)

   expect ([... v1 .copy ()]) .toEqual ([0.1, 0.2, 0.3])
})

test ("assign", () =>
{
   const
      v1 = new Color3 (0, 0, 0),
      v2 = new Color3 (0.1, 0.2, 0.3)

   expect ([... v1 .assign (v2)]) .toEqual ([0.1, 0.2, 0.3])
})

test ("set", () =>
{
   const v1 = new Color3 (0, 0, 0)

   expect ([... v1 .set (0.1, 0.2, 0.3)]) .toEqual ([0.1, 0.2, 0.3])
})

test ("equals", () =>
{
   const
      a = new Color3 (0.1, 0.2, 0.3),
      b = new Color3 (0.1, 0.2, 0.3)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})