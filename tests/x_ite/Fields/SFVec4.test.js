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

   test ("common", () =>
   {
      const field = new SFVec4 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
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
}
