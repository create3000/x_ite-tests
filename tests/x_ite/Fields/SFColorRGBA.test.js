const
   X3D         = require ("../../X3D"),
   SFColorRGBA = X3D .require ("x_ite/Fields/SFColorRGBA")

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
})

test ("copy", () =>
{
   const
      v1 = new SFColorRGBA (0.2,0.3,0.4,0.5),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
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
