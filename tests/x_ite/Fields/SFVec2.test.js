const X3D = require ("../../X3D")

for (const Type of Object .keys (X3D .require ("x_ite/Fields/SFVec2")))
{
   const SFVec2 = X3D .require ("x_ite/Fields/SFVec2") [Type]

   test ("constructor", () =>
   {
      const v1 = new SFVec2 ()

      expect (v1 .x) .toBe (0)
      expect (v1 .y) .toBe (0)
      expect (v1 [0]) .toBe (0)
      expect (v1 [1]) .toBe (0)
      expect ([...v1]) .toEqual ([0,0])

      const v2 = new SFVec2 (2,3)

      expect (v2 .x) .toBe (2)
      expect (v2 .y) .toBe (3)
      expect (v2 [0]) .toBe (2)
      expect (v2 [1]) .toBe (3)
      expect ([...v2]) .toEqual ([2,3])
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
      ]

      enumerate (properties, new SFVec2 ())
   })

   test ("getter/setter", () =>
   {
      const v1 = new SFVec2 ()

      v1 .x = 2
      v1 .y = 3

      expect (v1 .x) .toBe (2)
      expect (v1 .y) .toBe (3)
      expect (v1 [0]) .toBe (2)
      expect (v1 [1]) .toBe (3)
      expect ([...v1]) .toEqual ([2,3])

      v1 [0] = 6
      v1 [1] = 7

      expect (v1 .x) .toBe (6)
      expect (v1 .y) .toBe (7)
      expect (v1 [0]) .toBe (6)
      expect (v1 [1]) .toBe (7)
      expect ([...v1]) .toEqual ([6,7])
   })

   test ("common", () =>
   {
      const field = new SFVec2 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFVec2 (2,3),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .equals (v1)) .toBe (true)
   })

   test ("equals", () =>
   {
      const
         a = new SFVec2 (2,3),
         b = new SFVec2 (6,7)

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new SFVec2 (),
         b = new SFVec2 (2,3)

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })

   test ("abs", () =>
   {
      expect (new SFVec2 (-2,-3) .abs () .equals (new SFVec2 (2,3))) .toBe (true)
      expect (new SFVec2 (2,3) .abs () .equals (new SFVec2 (2,3))) .toBe (true)
   })

   test ("add", () =>
   {
      expect (new SFVec2 (2,3) .add (new SFVec2 (6,7)) .equals (new SFVec2 (8,10))) .toBe (true)
   })

   test ("distance", () =>
   {
      expect (new SFVec2 (2,3) .distance (new SFVec2 (6,7))) .toBeCloseTo (5.656854249492381)
   })

   test ("divide", () =>
   {
      expect (new SFVec2 (2,4) .divide (2) .equals (new SFVec2 (1,2))) .toBe (true)
   })

   test ("divVec", () =>
   {
      expect (new SFVec2 (4,9) .divVec (new SFVec2 (2,3)) .equals (new SFVec2 (2,3))) .toBe (true)
   })

   test ("dot", () =>
   {
      expect (new SFVec2 (2,3) .dot (new SFVec2 (6,7))) .toBe (33)
   })

   test ("inverse", () =>
   {
      expect (new SFVec2 (2,3) .inverse () .equals (new SFVec2 (1/2,1/3))) .toBe (true)
   })

   test ("length", () =>
   {
      expect (new SFVec2 (2,3) .length ()) .toBe (Math .hypot (2,3))
   })

   test ("lerp", () =>
   {
      expect (new SFVec2 (2,3) .lerp (new SFVec2 (4,6), 0.5) .equals (new SFVec2 (3,4.5))) .toBe (true)
   })

   test ("min", () =>
   {
      expect (new SFVec2 (4,9) .min (new SFVec2 (2,3)) .equals (new SFVec2 (2,3))) .toBe (true)
      expect (new SFVec2 (2,3) .min (new SFVec2 (4,9)) .equals (new SFVec2 (2,3))) .toBe (true)
   })

   test ("max", () =>
   {
      expect (new SFVec2 (4,9) .max (new SFVec2 (2,3)) .equals (new SFVec2 (4,9))) .toBe (true)
      expect (new SFVec2 (2,3) .max (new SFVec2 (4,9)) .equals (new SFVec2 (4,9))) .toBe (true)
   })

   test ("multiply", () =>
   {
      expect (new SFVec2 (2,4) .multiply (2) .equals (new SFVec2 (4,8))) .toBe (true)
   })

   test ("multVec", () =>
   {
      expect (new SFVec2 (4,9) .multVec (new SFVec2 (2,3)) .equals (new SFVec2 (8,27))) .toBe (true)
   })

   test ("negate", () =>
   {
      expect (new SFVec2 (2,3) .negate () .equals (new SFVec2 (-2,-3))) .toBe (true)
      expect (new SFVec2 (-2,-3) .negate () .equals (new SFVec2 (2,3))) .toBe (true)
   })

   test ("normalize", () =>
   {
      expect (new SFVec2 (4,9) .normalize () .length ()) .toBeCloseTo (1)
   })

   test ("subtract", () =>
   {
      expect (new SFVec2 (8,10) .subtract (new SFVec2 (6,7)) .equals (new SFVec2 (2,3))) .toBe (true)
   })
}
