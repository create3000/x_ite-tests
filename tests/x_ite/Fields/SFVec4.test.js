const
   X3D     = require ("../../X3D"),
   Browser = X3D .createBrowser () .browser;

for (const Type of Object .keys (X3D .SFVec4))
{
   const SFVec4 = X3D .SFVec4 [Type]

   test ("constructor", () =>
   {
      const v1 = new SFVec4 ()

      expect (v1 .x) .toBe (0)
      expect (v1 .y) .toBe (0)
      expect (v1 .z) .toBe (0)
      expect (v1 .w) .toBe (1)
      expect (v1 [0]) .toBe (0)
      expect (v1 [1]) .toBe (0)
      expect (v1 [2]) .toBe (0)
      expect (v1 [3]) .toBe (1)
      expect ([...v1]) .toEqual ([0,0,0,1])

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

      const v3 = new SFVec4 (undefined,undefined,undefined,undefined)

      expect (v3 .x) .toBe (NaN)
      expect (v3 .y) .toBe (NaN)
      expect (v3 .z) .toBe (NaN)
      expect (v3 .w) .toBe (NaN)
      expect (v3 [0]) .toBe (NaN)
      expect (v3 [1]) .toBe (NaN)
      expect (v3 [2]) .toBe (NaN)
      expect (v3 [3]) .toBe (NaN)
   })

   test ("enumerate", () =>
   {
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
      const v1 = new SFVec4 ();

      v1 .x = 2;
      v1 .y = 3;
      v1 .z = 4;
      v1 .w = 5;

      expect (v1 .x) .toBe (2);
      expect (v1 .y) .toBe (3);
      expect (v1 .z) .toBe (4);
      expect (v1 .w) .toBe (5);
      expect (v1 [0]) .toBe (2);
      expect (v1 [1]) .toBe (3);
      expect (v1 [2]) .toBe (4);
      expect (v1 [3]) .toBe (5);
      expect ([...v1]) .toEqual ([2,3,4,5]);

      v1 [0] = 6;
      v1 [1] = 7;
      v1 [2] = 8;
      v1 [3] = 9;

      expect (v1 .x) .toBe (6);
      expect (v1 .y) .toBe (7);
      expect (v1 .z) .toBe (8);
      expect (v1 .w) .toBe (9);
      expect (v1 [0]) .toBe (6);
      expect (v1 [1]) .toBe (7);
      expect (v1 [2]) .toBe (8);
      expect (v1 [3]) .toBe (9);
      expect ([...v1]) .toEqual ([6,7,8,9]);

      v1 [0] = undefined;
      v1 [1] = undefined;
      v1 [2] = undefined;
      v1 [3] = undefined;
      expect ([...v1]) .toEqual ([NaN,NaN,NaN,NaN]);

      v1 .assign (new SFVec4 (1,2,3,4));
      v1 .x = undefined;
      v1 .y = undefined;
      v1 .z = undefined;
      v1 .w = undefined;
      expect ([...v1]) .toEqual ([NaN,NaN,NaN,NaN]);
   })

   test ("common", () =>
   {
      const field = new SFVec4 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${Type}]`)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFVec4 (2,3,4,5),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
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
         a = new SFVec4 (0,0,0,1),
         b = new SFVec4 (2,3,4,5),
         c = new SFVec4 ();

      expect (c .isDefaultValue ()) .toBe (true);
      expect (a .isDefaultValue ()) .toBe (true);
      expect (b .isDefaultValue ()) .toBe (false);
   });

   test ("abs", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         b = a .abs (),
         c = a .negate () .abs ()

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

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
      expect (b .getValue ()) .not .toBe (a .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

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
      expect (b .getValue ()) .not .toBe (a .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (d) .toBeInstanceOf (SFVec4)
      expect (d) .not .toBe (a)
      expect (d) .not .toBe (b)
      expect (d .getValue ()) .not .toBe (a .getValue ())
      expect (d .getValue ()) .not .toBe (b .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (d) .toBeInstanceOf (SFVec4)
      expect (d) .not .toBe (a)
      expect (d) .not .toBe (b)
      expect (d .getValue ()) .not .toBe (a .getValue ())
      expect (d .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (b)) .toBe (true)
      expect (d .equals (b)) .toBe (true)
   })

   test ("clamp", () =>
   {
      const
         a = new SFVec4 (2,3,4,5),
         l = new SFVec4 (0,4,0,0),
         h = new SFVec4 (1,5,8,10),
         c = a .clamp (l, h);

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (l)
      expect (c) .not .toBe (h)
      expect (c .getValue ()) .not .toBe (l .getValue ())
      expect (c .getValue ()) .not .toBe (h .getValue ())
      expect (c .getValue ()) .toEqual ({ x: 1, y: 4, z: 4, w: 5 });
   })

   test ("multiply", () =>
   {
      const
         a = new SFVec4 (2,4,6,8),
         b = a .multiply (2)

      expect (b) .toBeInstanceOf (SFVec4)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

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
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (c) .toBeInstanceOf (SFVec4)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

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
      expect (b .getValue ()) .not .toBe (a .getValue ())

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
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec4 (2,3,4,5))) .toBe (true)
   })

   test ("fromString", () =>
   {
      const a = new SFVec4 ();

      a .fromString ("2 3 4 5");

      expect (a .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromString ("1 2 3 4", s);
      expect (a .equals (new SFVec4 (1000, 2000, 3000, 4000))) .toBe (true);

      expect (() => a .fromString ("foo")) .toThrow (Error);
   });

   test ("fromVRMLString", () =>
   {
      const a = new SFVec4 ();

      a .fromVRMLString ("2 3 4 5");

      expect (a .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromVRMLString ("1 2 3 4", s);
      expect (a .equals (new SFVec4 (1000, 2000, 3000, 4000))) .toBe (true);

      expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
   });

   test ("fromXMLString", () =>
   {
      const a = new SFVec4 ();

      a .fromXMLString ("2 3 4 5");

      expect (a .equals (new SFVec4 (2, 3, 4, 5))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromXMLString ("1 2 3 4", s);
      expect (a .equals (new SFVec4 (1000, 2000, 3000, 4000))) .toBe (true);

      expect (() => a .fromXMLString ("foo")) .toThrow (Error);
   });
}
