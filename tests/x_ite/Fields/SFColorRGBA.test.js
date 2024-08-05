const
   X3D         = require ("../../X3D"),
   SFColorRGBA = X3D .SFColorRGBA

test ("constructor", () =>
{
   const v1 = new SFColorRGBA ()

   expect (v1 .r) .toBe (0)
   expect (v1 .g) .toBe (0)
   expect (v1 .b) .toBe (0)
   expect (v1 .a) .toBe (0)
   expect (v1 [0]) .toBe (0)
   expect (v1 [1]) .toBe (0)
   expect (v1 [2]) .toBe (0)
   expect (v1 [3]) .toBe (0)
   expect ([...v1]) .toEqual ([0,0,0,0])

   const v2 = new SFColorRGBA (0.2,0.3,0.4,0.5)

   expect (v2 .r) .toBe (0.2)
   expect (v2 .g) .toBe (0.3)
   expect (v2 .b) .toBe (0.4)
   expect (v2 .a) .toBe (0.5)
   expect (v2 [0]) .toBe (0.2)
   expect (v2 [1]) .toBe (0.3)
   expect (v2 [2]) .toBe (0.4)
   expect (v2 [3]) .toBe (0.5)
   expect ([...v2]) .toEqual ([0.2,0.3,0.4,0.5])
})

test ("enumerate", () =>
{
   const properties = [
      "r",
      "g",
      "b",
      "a",
   ]

   enumerate (properties, new SFColorRGBA ())
})

test ("getter/setter", () =>
{
   const v1 = new SFColorRGBA ()

   v1 .r = 0.2
   v1 .g = 0.3
   v1 .b = 0.4
   v1 .a = 0.5

   expect (v1 .r) .toBe (0.2)
   expect (v1 .g) .toBe (0.3)
   expect (v1 .b) .toBe (0.4)
   expect (v1 .a) .toBe (0.5)
   expect (v1 [0]) .toBe (0.2)
   expect (v1 [1]) .toBe (0.3)
   expect (v1 [2]) .toBe (0.4)
   expect (v1 [3]) .toBe (0.5)
   expect ([...v1]) .toEqual ([0.2,0.3,0.4,0.5])

   v1 [0] = 0.6
   v1 [1] = 0.7
   v1 [2] = 0.8
   v1 [3] = 0.9

   expect (v1 .r) .toBe (0.6)
   expect (v1 .g) .toBe (0.7)
   expect (v1 .b) .toBe (0.8)
   expect (v1 .a) .toBe (0.9)
   expect (v1 [0]) .toBe (0.6)
   expect (v1 [1]) .toBe (0.7)
   expect (v1 [2]) .toBe (0.8)
   expect (v1 [3]) .toBe (0.9)
   expect ([...v1]) .toEqual ([0.6,0.7,0.8,0.9])
})

test ("common", () =>
{
   const field = new SFColorRGBA ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFColorRGBA)
   expect (field .getTypeName ()) .toBe ("SFColorRGBA")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFColorRGBA]")
})

test ("copy", () =>
{
   const
      v1 = new SFColorRGBA (0.2,0.3,0.4,0.5),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
   expect (v2 .equals (v1)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFColorRGBA (0.2,0.3,0.4,0.5),
      b = new SFColorRGBA (0.6,0.7,0.8,0.9)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFColorRGBA (),
      b = new SFColorRGBA (0.2,0.3,0.4,0.5)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("get/setHSVA", () =>
{
   const
      a = new SFColorRGBA (0.2,0.3,0.4,0.5),
      b = new SFColorRGBA (),
      hsva = a .getHSVA ()

   expect (hsva) .toBeInstanceOf (Array)
   expect (hsva) .not .toBe (a .getHSVA ())

   b .setHSVA (...hsva)

   expect (b .r)  .toBeCloseTo (a .r)
   expect (b .g)  .toBeCloseTo (a .g)
   expect (b .b)  .toBeCloseTo (a .b)
   expect (b .a)  .toBeCloseTo (a .a)
   expect (b [0]) .toBeCloseTo (a [0])
   expect (b [1]) .toBeCloseTo (a [1])
   expect (b [2]) .toBeCloseTo (a [2])
   expect (b [3]) .toBeCloseTo (a [3])

   for (let i = 0; i <= 12; ++ i)
   {
      a .setHSVA (i/12 * Math .PI * 2, 0.5, 0.5, 0.5)
      b .setHSVA (... a .getHSVA ())

      expect (b .r)  .toBeCloseTo (a .r)
      expect (b .g)  .toBeCloseTo (a .g)
      expect (b .b)  .toBeCloseTo (a .b)
      expect (b .a)  .toBeCloseTo (a .a)
      expect (b [0]) .toBeCloseTo (a [0])
      expect (b [1]) .toBeCloseTo (a [1])
      expect (b [2]) .toBeCloseTo (a [2])
      expect (b [3]) .toBeCloseTo (a [3])
   }
})

test ("linearToSRGB", () =>
{
   const c1 = new SFColorRGBA (0, 0, 0, 0);

   expect (c1 .linearToSRGB () [0]) .toBe (0);
   expect (c1 .linearToSRGB () [1]) .toBe (0);
   expect (c1 .linearToSRGB () [2]) .toBe (0);
   expect (c1 .linearToSRGB () [3]) .toBe (0);

   const c2 = new SFColorRGBA (1, 1, 1, 1);

   expect (c2 .linearToSRGB () [0]) .toBe (1);
   expect (c2 .linearToSRGB () [1]) .toBe (1);
   expect (c2 .linearToSRGB () [2]) .toBe (1);
   expect (c2 .linearToSRGB () [3]) .toBe (1);

   const c3 = new SFColorRGBA (0.1, 0.2, 0.3, 0.4);

   expect (c3 .linearToSRGB () [0]) .toBeCloseTo (0.1 ** (1 / 2.2));
   expect (c3 .linearToSRGB () [1]) .toBeCloseTo (0.2 ** (1 / 2.2));
   expect (c3 .linearToSRGB () [2]) .toBeCloseTo (0.3 ** (1 / 2.2));
   expect (c3 .linearToSRGB () [3]) .toBeCloseTo (0.4);

   expect (c3 .linearToSRGB ()) .not .toBe (c3 .linearToSRGB ());
});

test ("sRGBToLinear", () =>
{
   const c1 = new SFColorRGBA (0, 0, 0, 0);

   expect (c1 .sRGBToLinear () [0]) .toBe (0);
   expect (c1 .sRGBToLinear () [1]) .toBe (0);
   expect (c1 .sRGBToLinear () [2]) .toBe (0);
   expect (c1 .sRGBToLinear () [3]) .toBe (0);

   const c2 = new SFColorRGBA (1, 1, 1, 1);

   expect (c2 .sRGBToLinear () [0]) .toBe (1);
   expect (c2 .sRGBToLinear () [1]) .toBe (1);
   expect (c2 .sRGBToLinear () [2]) .toBe (1);
   expect (c2 .sRGBToLinear () [3]) .toBe (1);

   const c3 = new SFColorRGBA (0.1, 0.2, 0.3, 0.4);

   expect (c3 .sRGBToLinear () [0]) .toBeCloseTo (0.1 ** 2.2);
   expect (c3 .sRGBToLinear () [1]) .toBeCloseTo (0.2 ** 2.2);
   expect (c3 .sRGBToLinear () [2]) .toBeCloseTo (0.3 ** 2.2);
   expect (c3 .sRGBToLinear () [3]) .toBeCloseTo (0.4);

   expect (c3 .sRGBToLinear ()) .not .toBe (c3 .sRGBToLinear ());
});

test ("lerp", () =>
{
   const
      a = new SFColorRGBA (0,0,0,0),
      b = new SFColorRGBA (1,1,1,1),
      c = a .lerp (b, 0.5)

   expect (c) .toBeInstanceOf (SFColorRGBA)
   expect (c) .not .toBe (a)
   expect (c) .not .toBe (b)
   expect (c .getValue ()) .not .toBe (a .getValue ())
   expect (c .getValue ()) .not .toBe (b .getValue ())

   expect (c .r)  .toBeCloseTo (0.5)
   expect (c .g)  .toBeCloseTo (0.5)
   expect (c .b)  .toBeCloseTo (0.5)
   expect (c .a)  .toBeCloseTo (0.5)
   expect (c [0]) .toBeCloseTo (0.5)
   expect (c [1]) .toBeCloseTo (0.5)
   expect (c [2]) .toBeCloseTo (0.5)
   expect (c [3]) .toBeCloseTo (0.5)
})
