const
   X3D     = require ("../../X3D"),
   Browser = X3D .createBrowser () .browser;

for (const Type of Object .keys (X3D .SFVec3))
{
   const SFVec3 = X3D .SFVec3 [Type]

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

      const v3 = new SFVec3 (undefined,undefined,undefined)

      expect (v3 .x) .toBe (NaN)
      expect (v3 .y) .toBe (NaN)
      expect (v3 .z) .toBe (NaN)
      expect (v3 [0]) .toBe (NaN)
      expect (v3 [1]) .toBe (NaN)
      expect (v3 [2]) .toBe (NaN)
   })

   test ("enumerate", () =>
   {
      const properties = [
         "x",
         "y",
         "z",
      ]

      enumerate (properties, new SFVec3 ())
   })

   test ("getter/setter", () =>
   {
      const v1 = new SFVec3 ();

      v1 .x = 2;
      v1 .y = 3;
      v1 .z = 4;

      expect (v1 .x) .toBe (2);
      expect (v1 .y) .toBe (3);
      expect (v1 .z) .toBe (4);
      expect (v1 [0]) .toBe (2);
      expect (v1 [1]) .toBe (3);
      expect (v1 [2]) .toBe (4);
      expect ([...v1]) .toEqual ([2,3,4]);

      v1 [0] = 6;
      v1 [1] = 7;
      v1 [2] = 8;

      expect (v1 .x) .toBe (6);
      expect (v1 .y) .toBe (7);
      expect (v1 .z) .toBe (8);
      expect (v1 [0]) .toBe (6);
      expect (v1 [1]) .toBe (7);
      expect (v1 [2]) .toBe (8);
      expect ([...v1]) .toEqual ([6,7,8]);

      v1 [0] = undefined;
      v1 [1] = undefined;
      v1 [2] = undefined;
      expect ([...v1]) .toEqual ([NaN,NaN,NaN]);
   });

   test ("common", () =>
   {
      const field = new SFVec3 ()

      expect (field .getType ()) .toBe (X3D .X3DConstants [Type])
      expect (field .getTypeName ()) .toBe (Type)
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${Type}]`)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFVec3 (2,3,4),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
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
         a = new SFVec3 (0,0,0),
         b = new SFVec3 (2,3,4),
         c = new SFVec3 ();

      expect (c .isDefaultValue ()) .toBe (true);
      expect (a .isDefaultValue ()) .toBe (true)
      expect (b .isDefaultValue ()) .toBe (false)
   })

   test ("abs", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = a .abs (),
         c = a .negate () .abs ()

      expect (b) .toBeInstanceOf (SFVec3)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (a)) .toBe (true)
      expect (c .equals (a)) .toBe (true)
   })

   test ("add", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = new SFVec3 (6,7,8),
         c = a .add (b)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec3 (8,10,12))) .toBe (true)
   })

   test ("cross", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = new SFVec3 (6,7,8),
         c = a .cross (b)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec3 (-4,8,-4))) .toBe (true)
   })

   test ("distance", () =>
   {
      expect (new SFVec3 (2,3,4) .distance (new SFVec3 (6,7,8))) .toBeCloseTo (6.928203230275509)
   })

   test ("divide", () =>
   {
      const
         a = new SFVec3 (2,4,6),
         b = a .divide (2)

      expect (b) .toBeInstanceOf (SFVec3)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (new SFVec3 (1,2,3))) .toBe (true)
   })

   test ("divVec", () =>
   {
      const
         a = new SFVec3 (4,9,16),
         b = new SFVec3 (2,3,4),
         c = a .divVec (b)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec3 (2,3,4))) .toBe (true)
   })

   test ("dot", () =>
   {
      expect (new SFVec3 (2,3,4) .dot (new SFVec3 (6,7,8))) .toBe (65)
   })

   test ("inverse", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = a .inverse ()

      expect (b) .toBeInstanceOf (SFVec3)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (new SFVec3 (1/2,1/3,1/4))) .toBe (true)
   })

   test ("length", () =>
   {
      expect (new SFVec3 (2,3,4) .length ()) .toBe (Math .hypot (2,3,4))
   })

   test ("lerp", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = new SFVec3 (4,6,8),
         c = a .lerp (b, 0.5)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec3 (3,4.5,6))) .toBe (true)
   })

   test ("min", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = new SFVec3 (4,9,16),
         c = a .min (b),
         d = b .min (a)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (d) .toBeInstanceOf (SFVec3)
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
         a = new SFVec3 (2,3,4),
         b = new SFVec3 (4,9,16),
         c = a .max (b),
         d = b .max (a)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (d) .toBeInstanceOf (SFVec3)
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
         a = new SFVec3 (2,3,4),
         l = new SFVec3 (0,4,0),
         h = new SFVec3 (1,5,8),
         c = a .clamp (l, h);

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (l)
      expect (c) .not .toBe (h)
      expect (c .getValue ()) .not .toBe (l .getValue ())
      expect (c .getValue ()) .not .toBe (h .getValue ())
      expect (c .getValue ()) .toEqual ({ x: 1, y: 4, z: 4 });
   })

   test ("multiply", () =>
   {
      const
         a = new SFVec3 (2,4,6),
         b = a .multiply (2)

      expect (b) .toBeInstanceOf (SFVec3)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (new SFVec3 (4,8,12))) .toBe (true)
   })

   test ("multVec", () =>
   {
      const
         a = new SFVec3 (4,9,16),
         b = new SFVec3 (2,3,4),
         c = a .multVec (b)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec3 (8,27,64))) .toBe (true)
   })

   test ("negate", () =>
   {
      const
         a = new SFVec3 (2,3,4),
         b = a .negate (),
         c = b .negate ()

      expect (b) .toBeInstanceOf (SFVec3)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (b .equals (new SFVec3 (-2,-3,-4))) .toBe (true)
      expect (c .equals (a)) .toBe (true)
   })

   test ("normalize", () =>
   {
      const
         a = new SFVec3 (4,9,16),
         b = a .normalize ()

      expect (b) .toBeInstanceOf (SFVec3)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .length ()) .toBeCloseTo (1)
   })

   test ("subtract", () =>
   {
      const
         a = new SFVec3 (8,10,12),
         b = new SFVec3 (6,7,8),
         c = a .subtract (b)

      expect (c) .toBeInstanceOf (SFVec3)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec3 (2,3,4))) .toBe (true)
   })

   test ("fromString", () =>
   {
      const a = new SFVec3 ();

      a .fromString ("2 3 4");

      expect (a .equals (new SFVec3 (2, 3, 4))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromString ("1 2 3", s);
      expect (a .equals (new SFVec3 (1000, 2000, 3000))) .toBe (true);

      expect (() => a .fromString ("foo")) .toThrow (Error);
   });

   test ("fromVRMLString", () =>
   {
      const a = new SFVec3 ();

      a .fromVRMLString ("2 3 4");

      expect (a .equals (new SFVec3 (2, 3, 4))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromVRMLString ("1 2 3", s);
      expect (a .equals (new SFVec3 (1000, 2000, 3000))) .toBe (true);

      expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
   });

   test ("fromXMLString", () =>
   {
      const a = new SFVec3 ();

      a .fromXMLString ("2 3 4");

      expect (a .equals (new SFVec3 (2, 3, 4))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromXMLString ("1 2 3", s);
      expect (a .equals (new SFVec3 (1000, 2000, 3000))) .toBe (true);

      expect (() => a .fromXMLString ("foo")) .toThrow (Error);
   });
}
