const
   X3D     = require ("../../X3D"),
   SFColor = X3D .require ("x_ite/Fields/SFColor")

test ("constructor", () =>
{
   const v1 = new SFColor ()

   expect (v1 .r) .toBe (0)
   expect (v1 .g) .toBe (0)
   expect (v1 .b) .toBe (0)
   expect (v1 [0]) .toBe (0)
   expect (v1 [1]) .toBe (0)
   expect (v1 [2]) .toBe (0)
   expect ([...v1]) .toEqual ([0,0,0])

   const v2 = new SFColor (0.2,0.3,0.4)

   expect (v2 .r) .toBe (0.2)
   expect (v2 .g) .toBe (0.3)
   expect (v2 .b) .toBe (0.4)
   expect (v2 [0]) .toBe (0.2)
   expect (v2 [1]) .toBe (0.3)
   expect (v2 [2]) .toBe (0.4)
   expect ([...v2]) .toEqual ([0.2,0.3,0.4])
})

test ("enumerate", () =>
{
   const properties = [
      "r",
      "g",
      "b",
   ]

   enumerate (properties, new SFColor ())
})

test ("getter/setter", () =>
{
   const v1 = new SFColor ()

   v1 .r = 0.2
   v1 .g = 0.3
   v1 .b = 0.4

   expect (v1 .r) .toBe (0.2)
   expect (v1 .g) .toBe (0.3)
   expect (v1 .b) .toBe (0.4)
   expect (v1 [0]) .toBe (0.2)
   expect (v1 [1]) .toBe (0.3)
   expect (v1 [2]) .toBe (0.4)
   expect ([...v1]) .toEqual ([0.2,0.3,0.4])

   v1 [0] = 0.6
   v1 [1] = 0.7
   v1 [2] = 0.8

   expect (v1 .r) .toBe (0.6)
   expect (v1 .g) .toBe (0.7)
   expect (v1 .b) .toBe (0.8)
   expect (v1 [0]) .toBe (0.6)
   expect (v1 [1]) .toBe (0.7)
   expect (v1 [2]) .toBe (0.8)
   expect ([...v1]) .toEqual ([0.6,0.7,0.8])
})

test ("common", () =>
{
   const field = new SFColor ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFColor)
   expect (field .getTypeName ()) .toBe ("SFColor")
})

test ("copy", () =>
{
   const
      v1 = new SFColor (0.2,0.3,0.4),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
   expect (v2 .equals (v1)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFColor (0.2,0.3,0.4),
      b = new SFColor (0.6,0.7,0.8)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFColor (),
      b = new SFColor (0.2,0.3,0.4)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("get/setHSVA", () =>
{
   const
      a = new SFColor (0.2,0.3,0.4),
      b = new SFColor (),
      hsv = a .getHSV ()

   expect (hsv) .toBeInstanceOf (Array)
   expect (hsv) .not .toBe (a .getHSV ())

   b .setHSV (...hsv)

   expect (b .r)  .toBeCloseTo (a .r)
   expect (b .g)  .toBeCloseTo (a .g)
   expect (b .b)  .toBeCloseTo (a .b)
   expect (b [0]) .toBeCloseTo (a [0])
   expect (b [1]) .toBeCloseTo (a [1])
   expect (b [2]) .toBeCloseTo (a [2])

   for (let i = 0; i <= 12; ++ i)
   {
      a .setHSV (i/12 * Math .PI * 2, 0.5, 0.5)
      b .setHSV (... a .getHSV ())

      expect (b .r)  .toBeCloseTo (a .r)
      expect (b .g)  .toBeCloseTo (a .g)
      expect (b .b)  .toBeCloseTo (a .b)
      expect (b [0]) .toBeCloseTo (a [0])
      expect (b [1]) .toBeCloseTo (a [1])
      expect (b [2]) .toBeCloseTo (a [2])
   }
})

test ("lerp", () =>
{
   const
      a = new SFColor (0,0,0),
      b = new SFColor (1,1,1),
      c = a .lerp (b, 0.5)

   expect (c) .toBeInstanceOf (SFColor)
   expect (c) .not .toBe (a)
   expect (c) .not .toBe (b)
   expect (c .getValue ()) .not .toBe (a .getValue ())
   expect (c .getValue ()) .not .toBe (b .getValue ())

   expect (c .r)  .toBeCloseTo (0.5)
   expect (c .g)  .toBeCloseTo (0.5)
   expect (c .b)  .toBeCloseTo (0.5)
   expect (c [0]) .toBeCloseTo (0.5)
   expect (c [1]) .toBeCloseTo (0.5)
   expect (c [2]) .toBeCloseTo (0.5)
})
