const X3D = require ("../../X3D")

const SFVec3Type = {
   SFMatrix4d: "SFVec3d",
   SFMatrix4f: "SFVec3f",
   VrmlMatrix: "SFVec3f",
}

const SFVec4Type = {
   SFMatrix4d: "SFVec4d",
   SFMatrix4f: "SFVec4f",
   VrmlMatrix: "SFVec4f",
}

for (const Type of Object .keys (X3D .require ("x_ite/Fields/SFMatrix4")))
{
   const
      SFMatrix4 = X3D .require ("x_ite/Fields/SFMatrix4") [Type],
      SFVec3    = X3D .require ("x_ite/Fields/SFVec3") [SFVec3Type [Type]],
      SFVec4    = X3D .require ("x_ite/Fields/SFVec4") [SFVec4Type [Type]]

   test ("constructor", () =>
   {
      const v1 = new SFMatrix4 ()

      expect (v1 [0]) .toBe (1)
      expect (v1 [1]) .toBe (0)
      expect (v1 [2]) .toBe (0)
      expect (v1 [3]) .toBe (0)
      expect (v1 [4]) .toBe (0)
      expect (v1 [5]) .toBe (1)
      expect (v1 [6]) .toBe (0)
      expect (v1 [7]) .toBe (0)
      expect (v1 [8]) .toBe (0)
      expect (v1 [9]) .toBe (0)
      expect (v1 [10]) .toBe (1)
      expect (v1 [11]) .toBe (0)
      expect (v1 [12]) .toBe (0)
      expect (v1 [13]) .toBe (0)
      expect (v1 [14]) .toBe (0)
      expect (v1 [15]) .toBe (1)
      expect ([...v1]) .toEqual ([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])

      const v2 = new SFMatrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17)

      expect (v2 [0]) .toBe (2)
      expect (v2 [1]) .toBe (3)
      expect (v2 [2]) .toBe (4)
      expect (v2 [3]) .toBe (5)
      expect (v2 [4]) .toBe (6)
      expect (v2 [5]) .toBe (7)
      expect (v2 [6]) .toBe (8)
      expect (v2 [7]) .toBe (9)
      expect (v2 [8]) .toBe (10)
      expect (v2 [9]) .toBe (11)
      expect (v2 [10]) .toBe (12)
      expect (v2 [11]) .toBe (13)
      expect (v2 [12]) .toBe (14)
      expect (v2 [13]) .toBe (15)
      expect (v2 [14]) .toBe (16)
      expect (v2 [15]) .toBe (17)
      expect ([...v2]) .toEqual ([2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17])

      const v3 = new SFMatrix4 (new SFVec4 (2,3,4,5), new SFVec4 (6,7,8,9), new SFVec4 (10,11,12,13), new SFVec4 (14,15,16,17))

      expect (v3 [0]) .toBe (2)
      expect (v3 [1]) .toBe (3)
      expect (v3 [2]) .toBe (4)
      expect (v3 [3]) .toBe (5)
      expect (v3 [4]) .toBe (6)
      expect (v3 [5]) .toBe (7)
      expect (v3 [6]) .toBe (8)
      expect (v3 [7]) .toBe (9)
      expect (v3 [8]) .toBe (10)
      expect (v3 [9]) .toBe (11)
      expect (v3 [10]) .toBe (12)
      expect (v3 [11]) .toBe (13)
      expect (v3 [12]) .toBe (14)
      expect (v3 [13]) .toBe (15)
      expect (v3 [14]) .toBe (16)
      expect (v3 [15]) .toBe (17)
      expect ([...v3]) .toEqual ([2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17])
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

      const properties = new Array (16) .keys ()

      enumerate (properties, new SFMatrix4 ())
   })

   test ("getter/setter", () =>
   {
      const v1 = new SFMatrix4 ()

      v1 [0] = 2
      v1 [1] = 3
      v1 [2] = 4
      v1 [3] = 5
      v1 [4] = 6
      v1 [5] = 7
      v1 [6] = 8
      v1 [7] = 9
      v1 [8] = 10
      v1 [9] = 11
      v1 [10] = 12
      v1 [11] = 13
      v1 [12] = 14
      v1 [13] = 15
      v1 [14] = 16
      v1 [15] = 17

      expect (v1 [0]) .toBe (2)
      expect (v1 [1]) .toBe (3)
      expect (v1 [2]) .toBe (4)
      expect (v1 [3]) .toBe (5)
      expect (v1 [4]) .toBe (6)
      expect (v1 [5]) .toBe (7)
      expect (v1 [6]) .toBe (8)
      expect (v1 [7]) .toBe (9)
      expect (v1 [8]) .toBe (10)
      expect (v1 [9]) .toBe (11)
      expect (v1 [10]) .toBe (12)
      expect (v1 [11]) .toBe (13)
      expect (v1 [12]) .toBe (14)
      expect (v1 [13]) .toBe (15)
      expect (v1 [14]) .toBe (16)
      expect (v1 [15]) .toBe (17)
      expect ([...v1]) .toEqual ([2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17])
   })

   test ("common", () =>
   {
      const field = new SFMatrix4 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFMatrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .equals (v1)) .toBe (true)
   })

   test ("equals", () =>
   {
      const
         a = new SFMatrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17),
         b = new SFMatrix4 (18,19,20,21, 22,23,24,25, 26,27,28,29, 30,31,32,33)

      expect (a .equals (a)) .toBe (true)
      expect (b .equals (b)) .toBe (true)
      expect (a .equals (b)) .toBe (false)
   })

   test ("isDefaultValue", () =>
   {
      const
         a = new SFMatrix4 (),
         b = new SFMatrix4 (2,3,4,5, 6,7,8,9, 10,11,12,13, 14,15,16,17)

      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })
}
