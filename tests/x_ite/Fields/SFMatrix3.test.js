const X3D = require ("../../X3D")

for (const Type of Object .keys (X3D .require ("x_ite/Fields/SFMatrix3")))
{
   const SFMatrix3 = X3D .require ("x_ite/Fields/SFMatrix3") [Type]

   test ("constructor", () =>
   {
      const v1 = new SFMatrix3 ()

      expect (v1 [0]) .toBe (1)
      expect (v1 [1]) .toBe (0)
      expect (v1 [2]) .toBe (0)
      expect (v1 [3]) .toBe (0)
      expect (v1 [4]) .toBe (1)
      expect (v1 [5]) .toBe (0)
      expect (v1 [6]) .toBe (0)
      expect (v1 [7]) .toBe (0)
      expect (v1 [8]) .toBe (1)
      expect ([...v1]) .toEqual ([1,0,0,0,1,0,0,0,1])

      const v2 = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10)

      expect (v2 [0]) .toBe (2)
      expect (v2 [1]) .toBe (3)
      expect (v2 [2]) .toBe (4)
      expect (v2 [3]) .toBe (5)
      expect (v2 [4]) .toBe (6)
      expect (v2 [5]) .toBe (7)
      expect (v2 [6]) .toBe (8)
      expect (v2 [7]) .toBe (9)
      expect (v2 [8]) .toBe (10)
      expect ([...v2]) .toEqual ([2,3,4, 5,6,7, 8,9,10])

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

      const properties = new Array (9) .keys ()

      enumerate (properties, v1)
   })

   test ("getter/setter", () =>
   {
      const v1 = new SFMatrix3 ()

      v1 [0] = 2
      v1 [1] = 3
      v1 [2] = 4
      v1 [3] = 5
      v1 [4] = 6
      v1 [5] = 7
      v1 [6] = 8
      v1 [7] = 9
      v1 [8] = 10

      expect (v1 [0]) .toBe (2)
      expect (v1 [1]) .toBe (3)
      expect (v1 [2]) .toBe (4)
      expect (v1 [3]) .toBe (5)
      expect (v1 [4]) .toBe (6)
      expect (v1 [5]) .toBe (7)
      expect (v1 [6]) .toBe (8)
      expect (v1 [7]) .toBe (9)
      expect (v1 [8]) .toBe (10)
      expect ([...v1]) .toEqual ([2,3,4, 5,6,7, 8,9,10])
   })

   test ("common", () =>
   {
      const field = new SFMatrix3 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .equals (v1)) .toBe (true)
   })

   test ("equals", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFMatrix3 (18,19,20, 21,22,23, 24,25,26)

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new SFMatrix3 (),
         b = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10)

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })
}
