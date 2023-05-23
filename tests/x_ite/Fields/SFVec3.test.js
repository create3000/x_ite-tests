const X3D = require ("../../X3D")

for (const Type of Object .keys (X3D .require ("x_ite/Fields/SFVec3")))
{
   const SFVec3 = X3D .require ("x_ite/Fields/SFVec3") [Type]

   test ("constructor", () =>
   {
      const v1 = new SFVec3 ()

      expect (v1 .x) .toBe (0)
      expect (v1 .y) .toBe (0)
      expect (v1 .z) .toBe (0)
      expect (v1 [0]) .toBe (0)
      expect (v1 [1]) .toBe (0)
      expect (v1 [2]) .toBe (0)
      expect ([...v1]) .toEqual ([0,0,0])

      const v2 = new SFVec3 (2,3,4)

      expect (v2 .x) .toBe (2)
      expect (v2 .y) .toBe (3)
      expect (v2 .z) .toBe (4)
      expect (v2 [0]) .toBe (2)
      expect (v2 [1]) .toBe (3)
      expect (v2 [2]) .toBe (4)
      expect ([...v2]) .toEqual ([2,3,4])
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
      ]

      enumerate (properties, new SFVec3 ())
   })

   test ("getter/setter", () =>
   {
      const v1 = new SFVec3 ()

      v1 .x = 2
      v1 .y = 3
      v1 .z = 4

      expect (v1 .x) .toBe (2)
      expect (v1 .y) .toBe (3)
      expect (v1 .z) .toBe (4)
      expect (v1 [0]) .toBe (2)
      expect (v1 [1]) .toBe (3)
      expect (v1 [2]) .toBe (4)
      expect ([...v1]) .toEqual ([2,3,4])

      v1 [0] = 6
      v1 [1] = 7
      v1 [2] = 8

      expect (v1 .x) .toBe (6)
      expect (v1 .y) .toBe (7)
      expect (v1 .z) .toBe (8)
      expect (v1 [0]) .toBe (6)
      expect (v1 [1]) .toBe (7)
      expect (v1 [2]) .toBe (8)
      expect ([...v1]) .toEqual ([6,7,8])
   })

   test ("common", () =>
   {
      const field = new SFVec3 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFVec3 (2,3,4),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .equals (v1)) .toBe (true)
   })

   test ("equals", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = new SFVec3 (6,7,8)

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new SFVec3 (),
         b = new SFVec3 (2,3,4)

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })

   test ("abs", () =>
   {
      expect (new SFVec3 (-2,-3,-4) .abs () .equals (new SFVec3 (2,3,4))) .toBe (true)
      expect (new SFVec3 (2,3,4) .abs () .equals (new SFVec3 (2,3,4))) .toBe (true)
   })

   test ("add", () =>
   {
      expect (new SFVec3 (2,3,4) .add (new SFVec3 (6,7,8)) .equals (new SFVec3 (8,10,12))) .toBe (true)
   })

   test ("cross", () =>
   {
      expect (new SFVec3 (2,3,4) .cross (new SFVec3 (6,7,8)) .equals (new SFVec3 (-4,8,-4))) .toBe (true)
   })

   test ("distance", () =>
   {
      expect (new SFVec3 (2,3,4) .distance (new SFVec3 (6,7,8))) .toBeCloseTo (6.928203230275509)
   })

   test ("divide", () =>
   {
      expect (new SFVec3 (2,4,6) .divide (2) .equals (new SFVec3 (1,2,3))) .toBe (true)
   })

   test ("divVec", () =>
   {
      expect (new SFVec3 (4,9,16) .divVec (new SFVec3 (2,3,4)) .equals (new SFVec3 (2,3,4))) .toBe (true)
   })

   test ("dot", () =>
   {
      expect (new SFVec3 (2,3,4) .dot (new SFVec3 (6,7,8))) .toBe (65)
   })

   test ("inverse", () =>
   {
      expect (new SFVec3 (2,3,4) .inverse () .equals (new SFVec3 (1/2,1/3,1/4))) .toBe (true)
   })

   test ("length", () =>
   {
      expect (new SFVec3 (2,3,4) .length ()) .toBe (Math .hypot (2,3,4))
   })

   test ("lerp", () =>
   {
      expect (new SFVec3 (2,3,4) .lerp (new SFVec3 (4,6,8), 0.5) .equals (new SFVec3 (3,4.5,6))) .toBe (true)
   })

   test ("min", () =>
   {
      expect (new SFVec3 (4,9,16) .min (new SFVec3 (2,3,4)) .equals (new SFVec3 (2,3,4))) .toBe (true)
      expect (new SFVec3 (2,3,4) .min (new SFVec3 (4,9,16)) .equals (new SFVec3 (2,3,4))) .toBe (true)
   })

   test ("max", () =>
   {
      expect (new SFVec3 (4,9,16) .max (new SFVec3 (2,3,4)) .equals (new SFVec3 (4,9,16))) .toBe (true)
      expect (new SFVec3 (2,3,4) .max (new SFVec3 (4,9,16)) .equals (new SFVec3 (4,9,16))) .toBe (true)
   })

   test ("multiply", () =>
   {
      expect (new SFVec3 (2,4,6) .multiply (2) .equals (new SFVec3 (4,8,12))) .toBe (true)
   })

   test ("multVec", () =>
   {
      expect (new SFVec3 (4,9,16) .multVec (new SFVec3 (2,3,4)) .equals (new SFVec3 (8,27,64))) .toBe (true)
   })

   test ("negate", () =>
   {
      expect (new SFVec3 (2,3,4) .negate () .equals (new SFVec3 (-2,-3,-4))) .toBe (true)
      expect (new SFVec3 (-2,-3,-4) .negate () .equals (new SFVec3 (2,3,4))) .toBe (true)
   })

   test ("normalize", () =>
   {
      expect (new SFVec3 (4,9,16) .normalize () .length ()) .toBeCloseTo (1)
   })

   test ("subtract", () =>
   {
      expect (new SFVec3 (8,10,12) .subtract (new SFVec3 (6,7,8)) .equals (new SFVec3 (2,3,4))) .toBe (true)
   })
}
