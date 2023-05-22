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

test ("common", () =>
{
   const field = new SFColor ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFColor)
   expect (field .getTypeName ()) .toBe ("SFColor")
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
