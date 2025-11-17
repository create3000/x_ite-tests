const X3D = require ("../../X3D")

const SFVec2Type = {
   SFMatrix3d: "SFVec2d",
   SFMatrix3f: "SFVec2f",
}

const SFVec3Type = {
   SFMatrix3d: "SFVec3d",
   SFMatrix3f: "SFVec3f",
}

for (const Type of Object .keys (X3D .SFMatrix3))
{
   const
      SFMatrix3 = X3D .SFMatrix3 [Type],
      SFVec2    = X3D .SFVec2 [SFVec2Type [Type]],
      SFVec3    = X3D .SFVec3 [SFVec3Type [Type]]

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

      const v4 = new SFMatrix3 (undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined)

      expect (v4 [0]) .toBe (NaN)
      expect (v4 [1]) .toBe (NaN)
      expect (v4 [2]) .toBe (NaN)
      expect (v4 [3]) .toBe (NaN)
      expect (v4 [4]) .toBe (NaN)
      expect (v4 [5]) .toBe (NaN)
      expect (v4 [6]) .toBe (NaN)
      expect (v4 [7]) .toBe (NaN)
      expect (v4 [8]) .toBe (NaN)
   })

   test ("enumerate", () =>
   {
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

      v1 [0]  = undefined;
      v1 [1]  = undefined;
      v1 [2]  = undefined;
      v1 [3]  = undefined;
      v1 [4]  = undefined;
      v1 [5]  = undefined;
      v1 [6]  = undefined;
      v1 [7]  = undefined;
      v1 [8]  = undefined;

      expect ([...v1]) .toEqual ([NaN,NaN,NaN, NaN,NaN,NaN, NaN,NaN,NaN])
   })

   test ("common", () =>
   {
      const field = new SFMatrix3 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${Type}]`)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
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
         a = new SFMatrix3 (1,0,0, 0,1,0, 0,0,1),
         b = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         c = new SFMatrix3 ();

      expect (c .isDefaultValue ()) .toBe (true);
      expect (a .isDefaultValue ()) .toBe (true);
      expect (b .isDefaultValue ()) .toBe (false);
   });

   test ("get/setTransform", () =>
   {
      let
         a = new SFMatrix3 (),
         b = new SFMatrix3 ();

      let
         t = new SFVec2 (),
         r = new SFVec3 (),
         s = new SFVec2 (),
         so = new SFVec3 ();

      a .setTransform (new SFVec2 (2,3), null, new SFVec2 (4,5))
      expect ([...a]) .toEqual ([4,0,0, 0,5,0, 2,3,1])

      a .setTransform (new SFVec2 (2,3), 4, new SFVec2 (4,5), 6)
      a .getTransform (t,r,s,so)
      b .setTransform (t,r.z,s,so.z)

      for (let i = 0; i < 9; ++ i)
         expect (b [i]) .toBeCloseTo (a [i]);

      b = new SFMatrix3 ();
      t = new SFVec2 ();
      r = new SFVec3 ();
      s = new SFVec2 ();

      a .getTransform (t,r,s)
      b .setTransform (t,r.z,s,so.z)

      for (let i = 0; i < 9; ++ i)
         expect (b [i]) .toBeCloseTo (a [i]);

      b = new SFMatrix3 ();
      t = new SFVec2 ();
      r = new SFVec3 ();

      a .getTransform (t,r)
      b .setTransform (t,r.z,s,so.z)

      for (let i = 0; i < 9; ++ i)
         expect (b [i]) .toBeCloseTo (a [i]);

      b = new SFMatrix3 ();
      t = new SFVec2 ();

      a .getTransform (t)
      b .setTransform (t,r.z,s,so.z)

      for (let i = 0; i < 9; ++ i)
         expect (b [i]) .toBeCloseTo (a [i]);

      a .setTransform ()
      expect ([...a]) .toEqual ([1,0,0,0,1,0,0,0,1])
   })

   test ("determinant", () =>
   {
      const a = new SFMatrix3 (4,3,2, 5,6,7, 10,9,14)

      expect (a .determinant ()) .toBe (54)
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
      expect (a .getValue ()) .not .toBe (b .getValue ())
      expect (a .getValue ()) .not .toBe (c .getValue ())
      expect (b .getValue ()) .not .toBe (c .getValue ())
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
      expect (a .getValue ()) .not .toBe (b .getValue ())
      expect (a .getValue ()) .not .toBe (c .getValue ())
      expect (b .getValue ()) .not .toBe (c .getValue ())
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

   test ("multRight", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFMatrix3 (11,12,13, 14,15,16, 17,18,19),
         c = a .multRight (b)

      expect (a) .not .toBe (b)
      expect (a) .not .toBe (c)
      expect (b) .not .toBe (c)
      expect (a .getValue ()) .not .toBe (b .getValue ())
      expect (a .getValue ()) .not .toBe (c .getValue ())
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFMatrix3)

      expect (c [ 0]) .toBe (132)
      expect (c [ 1]) .toBe (141)
      expect (c [ 2]) .toBe (150)
      expect (c [ 3]) .toBe (258)
      expect (c [ 4]) .toBe (276)
      expect (c [ 5]) .toBe (294)
      expect (c [ 6]) .toBe (384)
      expect (c [ 7]) .toBe (411)
      expect (c [ 8]) .toBe (438)
   })

   test ("multLeft", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFMatrix3 (11,12,13, 14,15,16, 17,18,19),
         c = b .multLeft (a)

      expect (a) .not .toBe (b)
      expect (a) .not .toBe (c)
      expect (b) .not .toBe (c)
      expect (a .getValue ()) .not .toBe (b .getValue ())
      expect (a .getValue ()) .not .toBe (c .getValue ())
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFMatrix3)

      expect (c [ 0]) .toBe (132)
      expect (c [ 1]) .toBe (141)
      expect (c [ 2]) .toBe (150)
      expect (c [ 3]) .toBe (258)
      expect (c [ 4]) .toBe (276)
      expect (c [ 5]) .toBe (294)
      expect (c [ 6]) .toBe (384)
      expect (c [ 7]) .toBe (411)
      expect (c [ 8]) .toBe (438)
   })

   test ("multVecMatrix 2", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFVec2 (11,12),
         c = a .transpose () .multVecMatrix (b)

      expect (b) .not .toBe (c)
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFVec2)

      expect (c [0]) .toBe (62/206)
      expect (c [1]) .toBe (134/206)
   })

   test ("multVecMatrix 3", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 6,7,8, 10,11,12),
         b = new SFVec3 (18,19,20),
         c = a .transpose () .multVecMatrix (b)

      expect (b) .not .toBe (c)
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFVec3)

      expect (c [0]) .toBe (173)
      expect (c [1]) .toBe (401)
      expect (c [2]) .toBe (629)
   })

   test ("multMatrixVec 2", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFVec2 (11,12),
         c = a .multMatrixVec (b)

      expect (b) .not .toBe (c)
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFVec2)

      expect (c [0]) .toBe (62/206)
      expect (c [1]) .toBe (134/206)
   })

   test ("multMatrixVec 3", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 6,7,8, 10,11,12),
         b = new SFVec3 (18,19,20),
         c = a .multMatrixVec (b)

      expect (b) .not .toBe (c)
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFVec3)

      expect (c [0]) .toBe (173)
      expect (c [1]) .toBe (401)
      expect (c [2]) .toBe (629)
   })

   test ("multDirMatrix", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFVec2 (11,12),
         c = a .transpose () .multDirMatrix (b)

      expect (b) .not .toBe (c)
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFVec2)

      expect (c [0]) .toBe (58)
      expect (c [1]) .toBe (127)
   })

   test ("multMatrixDir", () =>
   {
      const
         a = new SFMatrix3 (2,3,4, 5,6,7, 8,9,10),
         b = new SFVec2 (11,12),
         c = a .multMatrixDir (b)

      expect (b) .not .toBe (c)
      expect (b .getValue ()) .not .toBe (c .getValue ())
      expect (c) .toBeInstanceOf (SFVec2)

      expect (c [0]) .toBe (58)
      expect (c [1]) .toBe (127)
   })

   test ("translate", () =>
   {
      const
         a = new SFMatrix3 (),
         b = new SFVec2 (2,3),
         c = a .translate (b);

      expect (a) .not .toBe (c);
      expect (a .getValue ()) .not .toBe (c .getValue ());
      expect (c) .toBeInstanceOf (SFMatrix3);

      expect (c [0]) .toBe (1);
      expect (c [1]) .toBe (0);
      expect (c [2]) .toBe (0);

      expect (c [3]) .toBe (0);
      expect (c [4]) .toBe (1);
      expect (c [5]) .toBe (0);

      expect (c [6]) .toBe (2);
      expect (c [7]) .toBe (3);
      expect (c [8]) .toBe (1);
   });

   test ("rotate", () =>
   {
      const
         a = new SFMatrix3 (),
         c = a .rotate (Math .PI / 4);

      expect (a) .not .toBe (c);
      expect (a .getValue ()) .not .toBe (c .getValue ());
      expect (c) .toBeInstanceOf (SFMatrix3);

      expect (c [0]) .toBeCloseTo (Math .SQRT1_2);
      expect (c [1]) .toBeCloseTo (Math .SQRT1_2);
      expect (c [2]) .toBe (0);

      expect (c [3]) .toBeCloseTo (-Math .SQRT1_2);
      expect (c [4]) .toBeCloseTo (Math .SQRT1_2);
      expect (c [5]) .toBe (0);

      expect (c [6]) .toBe (0);
      expect (c [7]) .toBe (0);
      expect (c [8]) .toBe (1);
   });

   test ("scale", () =>
   {
      const
         a = new SFMatrix3 (),
         b = new SFVec2 (2,3),
         c = a .scale (b);

      expect (a) .not .toBe (c);
      expect (a .getValue ()) .not .toBe (c .getValue ());
      expect (c) .toBeInstanceOf (SFMatrix3);

      expect (c [0]) .toBe (2);
      expect (c [1]) .toBe (0);
      expect (c [2]) .toBe (0);

      expect (c [3]) .toBe (0);
      expect (c [4]) .toBe (3);
      expect (c [5]) .toBe (0);

      expect (c [6]) .toBe (0);
      expect (c [7]) .toBe (0);
      expect (c [8]) .toBe (1);
   });

   test ("skewX", () =>
   {
      const
         a = new SFMatrix3 (),
         c = a .skewX (Math .PI / 8);

      expect (a) .not .toBe (c);
      expect (a .getValue ()) .not .toBe (c .getValue ());
      expect (c) .toBeInstanceOf (SFMatrix3);

      expect (c [0]) .toBe (1);
      expect (c [1]) .toBe (0);
      expect (c [2]) .toBe (0);

      expect (c [3]) .toBeCloseTo (Math .SQRT2 - 1);
      expect (c [4]) .toBe (1);
      expect (c [5]) .toBe (0);

      expect (c [6]) .toBe (0);
      expect (c [7]) .toBe (0);
      expect (c [8]) .toBe (1);
   });

   test ("skewY", () =>
   {
      const
         a = new SFMatrix3 (),
         c = a .skewY (Math .PI / 8);

      expect (a) .not .toBe (c);
      expect (a .getValue ()) .not .toBe (c .getValue ());
      expect (c) .toBeInstanceOf (SFMatrix3);

      expect (c [0]) .toBe (1);
      expect (c [1]) .toBeCloseTo (Math .SQRT2 - 1);
      expect (c [2]) .toBe (0);

      expect (c [3]) .toBe (0);
      expect (c [4]) .toBe (1);
      expect (c [5]) .toBe (0);

      expect (c [6]) .toBe (0);
      expect (c [7]) .toBe (0);
      expect (c [8]) .toBe (1);
   });

   test ("fromString", () =>
   {
      const a = new SFMatrix3 ();

      a .fromString ("2 3 4 5 6 7 8 9 10");

      expect (a .equals (new SFMatrix3 (2, 3, 4, 5, 6, 7, 8, 9, 10))) .toBe (true);

      expect (() => a .fromString ("foo")) .toThrow (Error);
   });

   test ("fromVRMLString", () =>
   {
      const a = new SFMatrix3 ();

      a .fromVRMLString ("2 3 4 5 6 7 8 9 10");

      expect (a .equals (new SFMatrix3 (2, 3, 4, 5, 6, 7, 8, 9, 10))) .toBe (true);

      expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
   });

   test ("fromXMLString", () =>
   {
      const a = new SFMatrix3 ();

      a .fromXMLString ("2 3 4 5 6 7 8 9 10");

      expect (a .equals (new SFMatrix3 (2, 3, 4, 5, 6, 7, 8, 9, 10))) .toBe (true);

      expect (() => a .fromXMLString ("foo")) .toThrow (Error);
   });

   test ("toString", () =>
   {
      const a = new SFMatrix3 (1,2,3,4,5,6,7,8,9);
      const b = new SFMatrix3 (10,11,12,13,14,15,16,17,18);

      expect (a .toString ()) .toBe ("1 2 3 4 5 6 7 8 9");
      expect (b .toString ()) .toBe ("10 11 12 13 14 15 16 17 18");
   });
}
