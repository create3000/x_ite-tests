const X3D = require ("../../X3D")

const SFVec2Type = {
   SFMatrix3d: "SFVec2d",
   SFMatrix3f: "SFVec2f",
}

const SFVec3Type = {
   SFMatrix3d: "SFVec3d",
   SFMatrix3f: "SFVec3f",
}

for (const Type of Object .keys (X3D .require ("x_ite/Fields/SFMatrix3")))
{
   const
      SFMatrix3 = X3D .require ("x_ite/Fields/SFMatrix3") [Type],
      SFVec2    = X3D .require ("x_ite/Fields/SFVec2") [SFVec2Type [Type]],
      SFVec3    = X3D .require ("x_ite/Fields/SFVec3") [SFVec3Type [Type]]

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

      const v3 = new SFMatrix3 (new SFVec3 (2,3,4), new SFVec3 (5,6,7), new SFVec3 (8,9,10))

      expect (v3 [0]) .toBe (2)
      expect (v3 [1]) .toBe (3)
      expect (v3 [2]) .toBe (4)
      expect (v3 [3]) .toBe (5)
      expect (v3 [4]) .toBe (6)
      expect (v3 [5]) .toBe (7)
      expect (v3 [6]) .toBe (8)
      expect (v3 [7]) .toBe (9)
      expect (v3 [8]) .toBe (10)
      expect ([...v3]) .toEqual ([2,3,4, 5,6,7, 8,9,10])
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

      const properties = new Array (9) .keys ()

      enumerate (properties, new SFMatrix3 ())
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

   test ("get/setTransform", () =>
   {
      const
         a = new SFMatrix3 (),
         b = new SFMatrix3 ()

      const
         t = new SFVec2 (),
         r = new SFVec3 (),
         s = new SFVec2 (),
         so = new SFVec3 ()

      a .setTransform (new SFVec2 (2,3), null, new SFVec2 (4,5))
      expect ([...a]) .toEqual ([4,0,0, 0,5,0, 2,3,1])

      a .setTransform (new SFVec2 (2,3), 4, new SFVec2 (4,5), 6)
      a .getTransform (t,r,s,so)
      b .setTransform (t,r.z,s,so.z)

      expect (b [0]) .toBeCloseTo (a [0])
      expect (b [1]) .toBeCloseTo (a [1])
      expect (b [2]) .toBeCloseTo (a [2])
      expect (b [3]) .toBeCloseTo (a [3])
      expect (b [4]) .toBeCloseTo (a [4])
      expect (b [5]) .toBeCloseTo (a [5])
      expect (b [6]) .toBeCloseTo (a [6])
      expect (b [7]) .toBeCloseTo (a [7])
      expect (b [8]) .toBeCloseTo (a [8])

      a .setTransform ()
      expect ([...a]) .toEqual ([1,0,0,0,1,0,0,0,1])
   })

   test ("inverse", () =>
   {
      const a = new SFMatrix3 ()

      a .setTransform (new SFVec2 (2,3), 5, new SFVec2 (4,5), 4)

      const
         b = a .multRight (a .inverse ()),
         c = a .multLeft (a .inverse ())

      expect (a) .not .toBe (b)
      expect (a) .not .toBe (c)
      expect (b) .not .toBe (c)
      expect (b) .toBeInstanceOf (SFMatrix3)
      expect (c) .toBeInstanceOf (SFMatrix3)

      expect (b [0]) .toBeCloseTo (1)
      expect (b [1]) .toBeCloseTo (0)
      expect (b [2]) .toBeCloseTo (0)
      expect (b [3]) .toBeCloseTo (0)
      expect (b [4]) .toBeCloseTo (1)
      expect (b [5]) .toBeCloseTo (0)
      expect (b [6]) .toBeCloseTo (0)
      expect (b [7]) .toBeCloseTo (0)
      expect (b [8]) .toBeCloseTo (1)

      expect (c [0]) .toBeCloseTo (1)
      expect (c [1]) .toBeCloseTo (0)
      expect (c [2]) .toBeCloseTo (0)
      expect (c [3]) .toBeCloseTo (0)
      expect (c [4]) .toBeCloseTo (1)
      expect (c [5]) .toBeCloseTo (0)
      expect (c [6]) .toBeCloseTo (0)
      expect (c [7]) .toBeCloseTo (0)
      expect (c [8]) .toBeCloseTo (1)
   })

   test ("transpose", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = a .transpose (),
         c = b .transpose ()

      expect (a) .not .toBe (b)
      expect (a) .not .toBe (c)
      expect (b) .not .toBe (c)
      expect (b) .toBeInstanceOf (SFMatrix3)
      expect (c) .toBeInstanceOf (SFMatrix3)

      expect (b [0]) .toBe (2)
      expect (b [3]) .toBe (3)
      expect (b [6]) .toBe (4)
      expect (b [1]) .toBe (5)
      expect (b [4]) .toBe (6)
      expect (b [7]) .toBe (7)
      expect (b [2]) .toBe (8)
      expect (b [5]) .toBe (9)
      expect (b [8]) .toBe (10)

      expect (c [0]) .toBe (2)
      expect (c [1]) .toBe (3)
      expect (c [2]) .toBe (4)
      expect (c [3]) .toBe (5)
      expect (c [4]) .toBe (6)
      expect (c [5]) .toBe (7)
      expect (c [6]) .toBe (8)
      expect (c [7]) .toBe (9)
      expect (c [8]) .toBe (10)
   })
}
