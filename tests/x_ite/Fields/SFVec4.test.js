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
      const
         a = new SFVec4 (2,3,4,5),
         b = a .abs (),
         c = a .negate () .abs ()

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)

      expect (b .equals (a)) .toBe (true)
      expect (c .equals (a)) .toBe (true)
   })

   test ("add", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = new SFVec4 (6,7,8,9),
         c = a .add (b)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (c .equals (new SFVec4 (8,10,12,14))) .toBe (true)
   })

   test ("distance", () =>
   {
      expect (new SFVec4 (2,3,4,5) .distance (new SFVec4 (6,7,8,9))) .toBe (8)
   })

   test ("divide", () =>
   {
      const
         a = new SFVec4 (2,4,6,8),
         b = a .divide (2)

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)

      expect (b .equals (new SFVec4 (1,2,3,4))) .toBe (true)
   })

   test ("divVec", () =>
   {
      const
         a = new SFVec4 (4,9,16,25),
         b = new SFVec4 (2,3,4,5),
         c = a .divVec (b)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (c .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })

   test ("dot", () =>
   {
      expect (new SFVec4 (2,3,4,5) .dot (new SFVec4 (6,7,8,9))) .toBe (110)
   })

   test ("inverse", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = a .inverse ()

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)

      expect (b .equals (new SFVec4 (1/2,1/3,1/4,1/5))) .toBe (true)
   })

   test ("length", () =>
   {
      expect (new SFVec4 (2,3,4,5) .length ()) .toBe (Math .hypot (2,3,4,5))
   })

   test ("lerp", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = new SFVec4 (4,6,8,10),
         c = a .lerp (b, 0.5)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (c .equals (new SFVec4 (3,4.5,6,7.5))) .toBe (true)
   })

   test ("min", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = new SFVec4 (4,9,16,25),
         c = a .min (b),
         d = b .min (a)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (d) .toBeInstanceOf (SFVec4)
      expect (d) .not .toBe (a)
      expect (d) .not .toBe (b)

      expect (c .equals (a)) .toBe (true)
      expect (d .equals (a)) .toBe (true)
   })

   test ("max", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = new SFVec4 (4,9,16,25),
         c = a .max (b),
         d = b .max (a)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (d) .toBeInstanceOf (SFVec4)
      expect (d) .not .toBe (a)
      expect (d) .not .toBe (b)

      expect (c .equals (b)) .toBe (true)
      expect (d .equals (b)) .toBe (true)
   })

   test ("multiply", () =>
   {
      const
         a = new SFVec4 (2,4,6,8),
         b = a .multiply (2)

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)

      expect (b .equals (new SFVec4 (4,8,12,16))) .toBe (true)
   })

   test ("multVec", () =>
   {
      const
         a = new SFVec4 (4,9,16,25),
         b = new SFVec4 (2,3,4,5),
         c = a .multVec (b)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (c .equals (new SFVec4 (8,27,64,125))) .toBe (true)
   })

   test ("negate", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = a .negate (),
         c = b .negate ()

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (b .equals (new SFVec4 (-2,-3,-4,-5))) .toBe (true)
      expect (c .equals (a)) .toBe (true)
   })

   test ("normalize", () =>
   {
      const
         a = new SFVec4 (4,9,16,25),
         b = a .normalize ()

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)

      expect (b .length ()) .toBeCloseTo (1)
   })

   test ("subtract", () =>
   {
      const
         a = new SFVec4 (8,10,12,14),
         b = new SFVec4 (6,7,8,9),
         c = a .subtract (b)

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)

      expect (c .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })
}
