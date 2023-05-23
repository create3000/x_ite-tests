const X3D = require ("../../X3D")

for (const Type of Object .keys (X3D .require ("x_ite/Fields/SFVec4")))
{
   const SFVec4 = X3D .require ("x_ite/Fields/SFVec4") [Type]

   test ("constructor", () =>
   {
      const v1 = new SFVec4 ()

      expect (v1 .x) .toBe (0)
      expect (v1 .y) .toBe (0)
      expect (v1 .z) .toBe (0)
      expect (v1 .w) .toBe (0)
      expect (v1 [0]) .toBe (0)
      expect (v1 [1]) .toBe (0)
      expect (v1 [2]) .toBe (0)
      expect (v1 [3]) .toBe (0)
      expect ([...v1]) .toEqual ([0,0,0,0])

      const v2 = new SFVec4 (2,3,4,5)

      expect (v2 .x) .toBe (2)
      expect (v2 .y) .toBe (3)
      expect (v2 .z) .toBe (4)
      expect (v2 .w) .toBe (5)
      expect (v2 [0]) .toBe (2)
      expect (v2 [1]) .toBe (3)
      expect (v2 [2]) .toBe (4)
      expect (v2 [3]) .toBe (5)
      expect ([...v2]) .toEqual ([2,3,4,5])
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

      const properties = [
         "x",
         "y",
         "z",
         "w",
      ]

      enumerate (properties, new SFVec4 ())
   })

   test ("getter/setter", () =>
   {
      const v1 = new SFVec4 ()

      v1 .x = 2
      v1 .y = 3
      v1 .z = 4
      v1 .w = 5

      expect (v1 .x) .toBe (2)
      expect (v1 .y) .toBe (3)
      expect (v1 .z) .toBe (4)
      expect (v1 .w) .toBe (5)
      expect (v1 [0]) .toBe (2)
      expect (v1 [1]) .toBe (3)
      expect (v1 [2]) .toBe (4)
      expect (v1 [3]) .toBe (5)
      expect ([...v1]) .toEqual ([2,3,4,5])

      v1 [0] = 6
      v1 [1] = 7
      v1 [2] = 8
      v1 [3] = 9

      expect (v1 .x) .toBe (6)
      expect (v1 .y) .toBe (7)
      expect (v1 .z) .toBe (8)
      expect (v1 .w) .toBe (9)
      expect (v1 [0]) .toBe (6)
      expect (v1 [1]) .toBe (7)
      expect (v1 [2]) .toBe (8)
      expect (v1 [3]) .toBe (9)
      expect ([...v1]) .toEqual ([6,7,8,9])
   })

   test ("common", () =>
   {
      const field = new SFVec4 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFVec4 (2,3,4,5),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .equals (v1)) .toBe (true)
   })

   test ("equals", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = new SFVec4 (6,7,8,9)

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new SFVec4 (),
         b = new SFVec4 (2,3,4,5)

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })

   test ("abs", () =>
   {
      expect (new SFVec4 (-2,-3,-4,-5) .abs () .equals (new SFVec4 (2,3,4,5))) .toBe (true)
      expect (new SFVec4 (2,3,4,5) .abs () .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })

   test ("add", () =>
   {
      expect (new SFVec4 (2,3,4,5) .add (new SFVec4 (6,7,8,9)) .equals (new SFVec4 (8,10,12,14))) .toBe (true)
   })

   test ("distance", () =>
   {
      expect (new SFVec4 (2,3,4,5) .distance (new SFVec4 (6,7,8,9))) .toBe (8)
   })

   test ("divide", () =>
   {
      expect (new SFVec4 (2,4,6,8) .divide (2) .equals (new SFVec4 (1,2,3,4))) .toBe (true)
   })

   test ("divVec", () =>
   {
      expect (new SFVec4 (4,9,16,25) .divVec (new SFVec4 (2,3,4,5)) .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })

   test ("dot", () =>
   {
      expect (new SFVec4 (2,3,4,5) .dot (new SFVec4 (6,7,8,9))) .toBe (110)
   })

   test ("inverse", () =>
   {
      expect (new SFVec4 (2,3,4,5) .inverse () .equals (new SFVec4 (1/2,1/3,1/4,1/5))) .toBe (true)
   })

   test ("length", () =>
   {
      expect (new SFVec4 (2,3,4,5) .length ()) .toBe (Math .hypot (2,3,4,5))
   })

   test ("min", () =>
   {
      expect (new SFVec4 (4,9,16,25) .min (new SFVec4 (2,3,4,5)) .equals (new SFVec4 (2,3,4,5))) .toBe (true)
      expect (new SFVec4 (2,3,4,5) .min (new SFVec4 (4,9,16,25)) .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })

   test ("max", () =>
   {
      expect (new SFVec4 (4,9,16,25) .max (new SFVec4 (2,3,4,5)) .equals (new SFVec4 (4,9,16,25))) .toBe (true)
      expect (new SFVec4 (2,3,4,5) .max (new SFVec4 (4,9,16,25)) .equals (new SFVec4 (4,9,16,25))) .toBe (true)
   })

   test ("multiply", () =>
   {
      expect (new SFVec4 (2,4,6,8) .multiply (2) .equals (new SFVec4 (4,8,12,16))) .toBe (true)
   })

   test ("multVec", () =>
   {
      expect (new SFVec4 (4,9,16,25) .multVec (new SFVec4 (2,3,4,5)) .equals (new SFVec4 (8,27,64,125))) .toBe (true)
   })

   test ("negate", () =>
   {
      expect (new SFVec4 (2,3,4,5) .negate () .equals (new SFVec4 (-2,-3,-4,-5))) .toBe (true)
      expect (new SFVec4 (-2,-3,-4,-5) .negate () .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })

   test ("normalize", () =>
   {
      expect (new SFVec4 (4,9,16,25) .normalize () .length ()) .toBeCloseTo (1)
   })

   test ("subtract", () =>
   {
      expect (new SFVec4 (8,10,12,14) .subtract (new SFVec4 (6,7,8,9)) .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })
}
