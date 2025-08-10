const
   X3D       = require ("../../../X3D"),
   Color3    = X3D .Color3,
   Algorithm = X3D .Algorithm

test ("constants", () =>
{
   expect (Color3 .BLACK .equals (new Color3 (0,0,0))) .toBe (true);
   expect (Color3 .WHITE .equals (new Color3 (1))) .toBe (true);
});

test ("constructor", () =>
{
   const c0 = new Color3 ()

   expect (c0 .r) .toBe (0)
   expect (c0 .g) .toBe (0)
   expect (c0 .b) .toBe (0)
   expect (c0 [0]) .toBe (0)
   expect (c0 [1]) .toBe (0)
   expect (c0 [2]) .toBe (0)
   expect ([... c0]) .toEqual ([0, 0, 0])
   expect (c0) .toHaveLength (3)

   const c1 = new Color3 (0, 0, 0)

   expect (c1 .r) .toBe (0)
   expect (c1 .g) .toBe (0)
   expect (c1 .b) .toBe (0)
   expect (c1 [0]) .toBe (0)
   expect (c1 [1]) .toBe (0)
   expect (c1 [2]) .toBe (0)
   expect ([... c1]) .toEqual ([0, 0, 0])
   expect (c1) .toHaveLength (3)

   const c2 = new Color3 (0.1, 0.2, 0.3)

   expect (c2 .r) .toBe (0.1)
   expect (c2 .g) .toBe (0.2)
   expect (c2 .b) .toBe (0.3)
   expect (c2 [0]) .toBe (0.1)
   expect (c2 [1]) .toBe (0.2)
   expect (c2 [2]) .toBe (0.3)
   expect ([... c2]) .toEqual ([0.1, 0.2, 0.3])
   expect (c2) .toHaveLength (3)

   const c3 = new Color3 (2, 3, 4)

   expect (c3 .r) .toBe (2)
   expect (c3 .g) .toBe (3)
   expect (c3 .b) .toBe (4)
   expect (c3 [0]) .toBe (2)
   expect (c3 [1]) .toBe (3)
   expect (c3 [2]) .toBe (4)
   expect ([... c3]) .toEqual ([2, 3, 4])
   expect (c3) .toHaveLength (3)

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

   expect (c4 .r) .toBe (2)
   expect (c4 .g) .toBe (3)
   expect (c4 .b) .toBe (4)
   expect (c4 [0]) .toBe (2)
   expect (c4 [1]) .toBe (3)
   expect (c4 [2]) .toBe (4)

   const c5 = new Color3 (2)

   expect (c5 .r) .toBe (2)
   expect (c5 .g) .toBe (2)
   expect (c5 .b) .toBe (2)
   expect (c5 [0]) .toBe (2)
   expect (c5 [1]) .toBe (2)
   expect (c5 [2]) .toBe (2)
   expect ([... c5]) .toEqual ([2, 2, 2])
   expect (c5) .toHaveLength (3)

   const c6 = new Color3 (2, 3)

   expect (c6 .r) .toBe (2)
   expect (c6 .g) .toBe (3)
   expect (c6 .b) .toBe (3)
   expect (c6 [0]) .toBe (2)
   expect (c6 [1]) .toBe (3)
   expect (c6 [2]) .toBe (3)
   expect ([... c6]) .toEqual ([2, 3, 3])
   expect (c6) .toHaveLength (3)
})

test ("enumerate", () =>
{
   const properties = [
      "r",
      "g",
      "b",
   ];

   enumerate (properties, new Color3 ());
   enumerate (properties, new Color3 (0.1, 0.2, 0.3));
});

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
   expect ([... v1 .set ()]) .toEqual ([0, 0, 0])
   expect ([... v1 .set (2)]) .toEqual ([2, 2, 2])
   expect ([... v1 .set (2, 3)]) .toEqual ([2, 3, 3])
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

test ("getHSV", () =>
{
   const c = new Color3 (0, 0, 0)

   expect (c .set (0, 0, 0) .getHSV ([ ])) .toEqual ([0, 0, 0])
   expect (c .set (1, 1, 1) .getHSV ([ ])) .toEqual ([0, 0, 1])
   expect (c .set (1, 0, 0) .getHSV ([ ])) .toEqual ([0, 1, 1])

   expect (c .set (1, 0.5, 0) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (30))
   expect (c .set (1, 0.5, 0) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 0.5, 0) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (1, 1, 0) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (60))
   expect (c .set (1, 1, 0) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 1, 0) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0.5, 1, 0) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (90))
   expect (c .set (0.5, 1, 0) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0.5, 1, 0) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0, 1, 0) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (120))
   expect (c .set (0, 1, 0) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 1, 0) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0, 1, 0.5) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (150))
   expect (c .set (0, 1, 0.5) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 1, 0.5) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0, 1, 1) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (180))
   expect (c .set (0, 1, 1) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 1, 1) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0, 0.5, 1) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (210))
   expect (c .set (0, 0.5, 1) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 0.5, 1) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0, 0, 1) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (240))
   expect (c .set (0, 0, 1) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0, 0, 1) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0.5, 0, 1) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (270))
   expect (c .set (0.5, 0, 1) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (0.5, 0, 1) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (1, 0, 1) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (300))
   expect (c .set (1, 0, 1) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 0, 1) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (1, 0, 0.5) .getHSV ([ ]) [0]) .toBeCloseTo (Algorithm .radians (330))
   expect (c .set (1, 0, 0.5) .getHSV ([ ]) [1]) .toBeCloseTo (1)
   expect (c .set (1, 0, 0.5) .getHSV ([ ]) [2]) .toBeCloseTo (1)

   expect (c .set (0.5, 0.5, 0.5) .getHSV ([ ]) [0]) .toBeCloseTo (0)
   expect (c .set (0.5, 0.5, 0.5) .getHSV ([ ]) [1]) .toBeCloseTo (0)
   expect (c .set (0.5, 0.5, 0.5) .getHSV ([ ]) [2]) .toBeCloseTo (0.5)
})

test ("linearToSRGB", () =>
{
   const c = new Color3 (0, 0, 0);

   expect (c .set (0, 0, 0) .linearToSRGB () [0]) .toBe (0);
   expect (c .set (0, 0, 0) .linearToSRGB () [1]) .toBe (0);
   expect (c .set (0, 0, 0) .linearToSRGB () [2]) .toBe (0);

   expect (c .set (1, 1, 1) .linearToSRGB () [0]) .toBe (1);
   expect (c .set (1, 1, 1) .linearToSRGB () [1]) .toBe (1);
   expect (c .set (1, 1, 1) .linearToSRGB () [2]) .toBe (1);

   expect (c .set (0.1, 0.2, 0.3) .linearToSRGB () [0]) .toBeCloseTo (0.1 ** (1 / 2.2));
   expect (c .set (0.1, 0.2, 0.3) .linearToSRGB () [1]) .toBeCloseTo (0.2 ** (1 / 2.2));
   expect (c .set (0.1, 0.2, 0.3) .linearToSRGB () [2]) .toBeCloseTo (0.3 ** (1 / 2.2));

   expect (c .linearToSRGB ()) .not .toBe (c .linearToSRGB ());
   expect (c .linearToSRGB (c)) .toBe (c .linearToSRGB (c));
});

test ("sRGBToLinear", () =>
{
   const c = new Color3 (0, 0, 0);

   expect (c .set (0, 0, 0) .sRGBToLinear () [0]) .toBe (0);
   expect (c .set (0, 0, 0) .sRGBToLinear () [1]) .toBe (0);
   expect (c .set (0, 0, 0) .sRGBToLinear () [2]) .toBe (0);

   expect (c .set (1, 1, 1) .sRGBToLinear () [0]) .toBe (1);
   expect (c .set (1, 1, 1) .sRGBToLinear () [1]) .toBe (1);
   expect (c .set (1, 1, 1) .sRGBToLinear () [2]) .toBe (1);

   expect (c .set (0.1, 0.2, 0.3) .sRGBToLinear () [0]) .toBeCloseTo (0.1 ** 2.2);
   expect (c .set (0.1, 0.2, 0.3) .sRGBToLinear () [1]) .toBeCloseTo (0.2 ** 2.2);
   expect (c .set (0.1, 0.2, 0.3) .sRGBToLinear () [2]) .toBeCloseTo (0.3 ** 2.2);

   expect (c .sRGBToLinear ()) .not .toBe (c .sRGBToLinear ());
   expect (c .sRGBToLinear (c)) .toBe (c .sRGBToLinear (c));
});

test ("toString", () =>
{
   const c = new Color3 (0.1, 0.2, 0.3);

   expect (c .toString ()) .toBe ([... c] .join (" "));
});
