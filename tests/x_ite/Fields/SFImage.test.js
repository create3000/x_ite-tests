const
   X3D     = require ("../../X3D"),
   SFImage = X3D .require ("x_ite/Fields/SFImage"),
   MFInt32 = X3D .require ("x_ite/Fields") .MFInt32

test ("constructor", () =>
{
   const v1 = new SFImage ()

   expect (v1 .x) .toBe (0)
   expect (v1 .y) .toBe (0)
   expect (v1 .width) .toBe (0)
   expect (v1 .height) .toBe (0)
   expect (v1 .comp) .toBe (0)
   expect (v1 .array) .toHaveLength (0)

   const v2 = new SFImage (1,2,3,new MFInt32 (5,6))

   expect (v2 .x) .toBe (1)
   expect (v2 .y) .toBe (2)
   expect (v2 .width) .toBe (1)
   expect (v2 .height) .toBe (2)
   expect (v2 .comp) .toBe (3)
   expect (v2 .array) .toHaveLength (2)
   expect (v2 .array [0]) .toBe (5)
   expect (v2 .array [1]) .toBe (6)

   const v3 = new SFImage (2,3,4)

   expect (v3 .x) .toBe (2)
   expect (v3 .y) .toBe (3)
   expect (v3 .width) .toBe (2)
   expect (v3 .height) .toBe (3)
   expect (v3 .comp) .toBe (4)
   expect (v3 .array) .toHaveLength (6)
   expect (v3 .array [0]) .toBe (0)
   expect (v3 .array [1]) .toBe (0)
   expect (v3 .array [2]) .toBe (0)
   expect (v3 .array [3]) .toBe (0)
   expect (v3 .array [4]) .toBe (0)
   expect (v3 .array [5]) .toBe (0)

   const v4 = new SFImage (... v2)

   expect (v4 .equals (v2)) .toBe (true)
   expect (v4 .array) .not .toBe (v2 .array)
   expect (v4 .array .equals (v2 .array)) .toBe (true)
})

test ("enumerate", () =>
{
   function enumerate (properties, target)
   {
      const
         a = { },
         b = { }

      for (const property in target)
         a [property] = true

      for (const property of properties)
         b [property] = true

      expect (a) .toEqual (b)
   }

   enumerate (["width", "height", "comp", "array"], new SFImage ())
})

test ("getter/setter", () =>
{
   const v1 = new SFImage ()

   v1 .width  = 1
   v1 .height = 2
   v1 .comp   = 3
   v1 .array  = new MFInt32 (5,6)

   expect (v1 .x) .toBe (1)
   expect (v1 .y) .toBe (2)
   expect (v1 .width) .toBe (1)
   expect (v1 .height) .toBe (2)
   expect (v1 .comp) .toBe (3)
   expect (v1 .array) .toHaveLength (2)
   expect (v1 .array [0]) .toBe (5)
   expect (v1 .array [1]) .toBe (6)

   v1 .x     = 2
   v1 .y     = 3
   v1 .comp  = 4
   v1 .array = new MFInt32 (1,2,3,4,5,6)

   expect (v1 .x) .toBe (2)
   expect (v1 .y) .toBe (3)
   expect (v1 .width) .toBe (2)
   expect (v1 .height) .toBe (3)
   expect (v1 .comp) .toBe (4)
   expect (v1 .array) .toHaveLength (6)
   expect (v1 .array [0]) .toBe (1)
   expect (v1 .array [1]) .toBe (2)
   expect (v1 .array [2]) .toBe (3)
   expect (v1 .array [3]) .toBe (4)
   expect (v1 .array [4]) .toBe (5)
   expect (v1 .array [5]) .toBe (6)
})

test ("common", () =>
{
   const field = new SFImage ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFImage)
   expect (field .getTypeName ()) .toBe ("SFImage")
})

test ("copy", () =>
{
   const
      v1 = new SFImage (1,2,3,new MFInt32 (5,6)),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .equals (v1)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFImage (1,2,3),
      b = new SFImage (2,3,4)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFImage (),
      b = new SFImage (1,2,3)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})
