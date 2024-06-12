const
   X3D       = require ("../../../X3D"),
   Color4    = X3D .require ("standard/Math/Numbers/Color4"),
   Algorithm = X3D .require ("standard/Math/Algorithm")

test ("constructor", () =>
{
   const c0 = new Color4 ()

   expect (c0 .r) .toBe (0)
   expect (c0 .g) .toBe (0)
   expect (c0 .b) .toBe (0)
   expect (c0 .a) .toBe (0)
   expect (c0 [0]) .toBe (0)
   expect (c0 [1]) .toBe (0)
   expect (c0 [2]) .toBe (0)
   expect (c0 [3]) .toBe (0)
   expect ([... c0]) .toEqual ([0, 0, 0, 0])
   expect (c0) .toHaveLength (4)

   const c1 = new Color4 (0, 0, 0, 0)

   expect (c1 .r) .toBe (0)
   expect (c1 .g) .toBe (0)
   expect (c1 .b) .toBe (0)
   expect (c1 .a) .toBe (0)
   expect (c1 [0]) .toBe (0)
   expect (c1 [1]) .toBe (0)
   expect (c1 [2]) .toBe (0)
   expect (c1 [3]) .toBe (0)
   expect ([... c1]) .toEqual ([0, 0, 0, 0])
   expect (c1) .toHaveLength (4)

   const c2 = new Color4 (0.1, 0.2, 0.3, 0.4)

   expect (c2 .r) .toBe (0.1)
   expect (c2 .g) .toBe (0.2)
   expect (c2 .b) .toBe (0.3)
   expect (c2 .a) .toBe (0.4)
   expect (c2 [0]) .toBe (0.1)
   expect (c2 [1]) .toBe (0.2)
   expect (c2 [2]) .toBe (0.3)
   expect (c2 [3]) .toBe (0.4)
   expect ([... c2]) .toEqual ([0.1, 0.2, 0.3, 0.4])
   expect (c2) .toHaveLength (4)

   const c3 = new Color4 (2, 3, 4, 5)

   expect (c3 .r) .toBe (2)
   expect (c3 .g) .toBe (3)
   expect (c3 .b) .toBe (4)
   expect (c3 .a) .toBe (5)
   expect (c3 [0]) .toBe (2)
   expect (c3 [1]) .toBe (3)
   expect (c3 [2]) .toBe (4)
   expect (c3 [3]) .toBe (5)
   expect ([... c3]) .toEqual ([2, 3, 4, 5])
   expect (c3) .toHaveLength (4)

   const c4 = new Color4 (0, 0, 0, 0)

   c4 .r = 0.1
   c4 .g = 0.2
   c4 .b = 0.3
   c4 .a = 0.4

   expect (c4 .r) .toBe (0.1)
   expect (c4 .g) .toBe (0.2)
   expect (c4 .b) .toBe (0.3)
   expect (c4 .a) .toBe (0.4)
   expect (c4 [0]) .toBe (0.1)
   expect (c4 [1]) .toBe (0.2)
   expect (c4 [2]) .toBe (0.3)
   expect (c4 [3]) .toBe (0.4)

   c4 .r = 2
   c4 .g = 3
   c4 .b = 4
   c4 .a = 5

   expect (c4 .r) .toBe (1)
   expect (c4 .g) .toBe (1)
   expect (c4 .b) .toBe (1)
   expect (c4 .a) .toBe (1)
   expect (c4 [0]) .toBe (1)
   expect (c4 [1]) .toBe (1)
   expect (c4 [2]) .toBe (1)
   expect (c4 [3]) .toBe (1)
})

test ("enumerate", () =>
{
   const properties = [
      "r",
      "g",
      "b",
      "a",
   ];

   enumerate (properties, new Color4 ());
   enumerate (properties, new Color4 (0.1, 0.2, 0.3, 0.4));
});

test ("copy", () =>
{
   const v1 = new Color4 (0.1, 0.2, 0.3, 0.4)

   expect ([... v1 .copy ()]) .toEqual ([0.1, 0.2, 0.3, 0.4])
})

test ("assign", () =>
{
   const
      v1 = new Color4 (0, 0, 0, 0),
      v2 = new Color4 (0.1, 0.2, 0.3, 0.4)

   expect ([... v1 .assign (v2)]) .toEqual ([0.1, 0.2, 0.3, 0.4])
})

test ("set", () =>
{
   const v1 = new Color4 (0, 0, 0, 0)

   expect ([... v1 .set (0.1, 0.2, 0.3, 0.4)]) .toEqual ([0.1, 0.2, 0.3, 0.4])
})

test ("equals", () =>
{
   const
      a = new Color4 (0.1, 0.2, 0.3, 0.4),
      b = new Color4 (0.1, 0.2, 0.3, 0.4)

   expect (a .equals (b)) .toBe (true)

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ()

      c [i] = 0

      expect (a .equals (c)) .toBe (false)
   }
})

test ("getHSVA", () =>
{
   const c = new Color4 (0, 0, 0, 0)

   expect (c .set (0, 0, 0, 0) .getHSVA ([ ])) .toEqual ([0, 0, 0, 0])
   expect (c .set (1, 1, 1, 1) .getHSVA ([ ])) .toEqual ([0, 0, 1, 1])
   expect (c .set (1, 0, 0, 1) .getHSVA ([ ])) .toEqual ([0, 1, 1, 1])

   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (30))
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (1, 1, 0, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (60))
   expect (c .set (1, 1, 0, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 1, 0, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0.5, 1, 0, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (90))
   expect (c .set (0.5, 1, 0, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0.5, 1, 0, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0, 1, 0, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (120))
   expect (c .set (0, 1, 0, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 1, 0, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0, 1, 0.5, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (150))
   expect (c .set (0, 1, 0.5, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 1, 0.5, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0, 1, 1, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (180))
   expect (c .set (0, 1, 1, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 1, 1, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0, 0.5, 1, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (210))
   expect (c .set (0, 0.5, 1, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 0.5, 1, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0, 0, 1, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (240))
   expect (c .set (0, 0, 1, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 0, 1, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0.5, 0, 1, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (270))
   expect (c .set (0.5, 0, 1, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0.5, 0, 1, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (1, 0, 1, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (300))
   expect (c .set (1, 0, 1, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 0, 1, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (1, 0, 0.5, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (Algorithm .radians (330))
   expect (c .set (1, 0, 0.5, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 0, 0.5, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0, 1) .getHSVA ([ ]) [3]) .toBe (1)

   expect (c .set (0.5, 0.5, 0.5, 1) .getHSVA ([ ]) [0]) .toBeCloseTo (0)
   expect (c .set (0.5, 0.5, 0.5, 1) .getHSVA ([ ]) [1]) .toBeCloseTo (0)
   expect (c .set (0.5, 0.5, 0.5, 1) .getHSVA ([ ]) [2]) .toBeCloseTo (0.5)
   expect (c .set (0.5, 0.5, 0.5, 1) .getHSVA ([ ]) [3]) .toBe (1)
})

test ("toString", () =>
{
   const c = new Color4 (0.1, 0.2, 0.3, 0.4)

   expect (c .toString ()) .toBe ([... c] .join (" "))
})
