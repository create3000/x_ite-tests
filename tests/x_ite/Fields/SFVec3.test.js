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
}
