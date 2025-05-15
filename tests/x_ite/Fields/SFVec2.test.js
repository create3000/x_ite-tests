const
   X3D     = require ("../../X3D"),
   Browser = X3D .createBrowser () .browser;

for (const Type of Object .keys (X3D .SFVec2))
{
   const SFVec2 = X3D .SFVec2 [Type]

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
      expect (Object .prototype .toString .call (field)) .toBe (`[object ${Type}]`)
   })

   test ("copy", () =>
   {
      const
         v1 = new SFVec2 (2,3),
         v2 = v1 .copy ()

      expect (v2) .not .toBe (v1)
      expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
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
      const
         a = new SFVec2 (2,3),
         b = a .abs (),
         c = a .negate () .abs ()

      expect (b) .toBeInstanceOf (SFVec2)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (a)) .toBe (true)
      expect (c .equals (a)) .toBe (true)
   })

   test ("add", () =>
   {
      const
         a = new SFVec2 (2,3),
         b = new SFVec2 (6,7),
         c = a .add (b)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec2 (8,10))) .toBe (true)
   })

   test ("distance", () =>
   {
      expect (new SFVec2 (2,3) .distance (new SFVec2 (6,7))) .toBeCloseTo (5.656854249492381)
   })

   test ("divide", () =>
   {
      const
         a = new SFVec2 (2,4),
         b = a .divide (2)

      expect (b) .toBeInstanceOf (SFVec2)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (new SFVec2 (1,2))) .toBe (true)
   })

   test ("divVec", () =>
   {
      const
         a = new SFVec2 (4,9),
         b = new SFVec2 (2,3),
         c = a .divVec (b)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec2 (2,3))) .toBe (true)
   })

   test ("dot", () =>
   {
      expect (new SFVec2 (2,3) .dot (new SFVec2 (6,7))) .toBe (33)
   })

   test ("inverse", () =>
   {
      const
         a = new SFVec2 (2,3),
         b = a .inverse ()

      expect (b) .toBeInstanceOf (SFVec2)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (new SFVec2 (1/2,1/3))) .toBe (true)
   })

   test ("length", () =>
   {
      expect (new SFVec2 (2,3) .length ()) .toBe (Math .hypot (2,3))
   })

   test ("lerp", () =>
   {
      const
         a = new SFVec2 (2,3),
         b = new SFVec2 (4,6),
         c = a .lerp (b, 0.5)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec2 (3,4.5))) .toBe (true)
   })

   test ("min", () =>
   {
      const
         a = new SFVec2 (2,3),
         b = new SFVec2 (4,9),
         c = a .min (b),
         d = b .min (a)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (d) .toBeInstanceOf (SFVec2)
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
         a = new SFVec2 (2,3),
         b = new SFVec2 (4,9),
         c = a .max (b),
         d = b .max (a)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (d) .toBeInstanceOf (SFVec2)
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
         a = new SFVec2 (2,3),
         l = new SFVec2 (0,4),
         h = new SFVec2 (1,5),
         c = a .clamp (l, h);

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (l)
      expect (c) .not .toBe (h)
      expect (c .getValue ()) .not .toBe (l .getValue ())
      expect (c .getValue ()) .not .toBe (h .getValue ())
      expect (c .getValue ()) .toEqual ({ x: 1, y: 4 });
   })

   test ("clamp2", () =>
   {
      const
         a = new SFVec2 (3,4),
         l = new SFVec2 (4,0),
         h = new SFVec2 (5,8),
         c = a .clamp (l, h);

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (l)
      expect (c) .not .toBe (h)
      expect (c .getValue ()) .not .toBe (l .getValue ())
      expect (c .getValue ()) .not .toBe (h .getValue ())
      expect (c .getValue ()) .toEqual ({ x: 4, y: 4 });
   })

   test ("multiply", () =>
   {
      const
         a = new SFVec2 (2,4),
         b = a .multiply (2)

      expect (b) .toBeInstanceOf (SFVec2)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .equals (new SFVec2 (4,8))) .toBe (true)
   })

   test ("multVec", () =>
   {
      const
         a = new SFVec2 (4,9),
         b = new SFVec2 (2,3),
         c = a .multVec (b)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec2 (8,27))) .toBe (true)
   })

   test ("negate", () =>
   {
      const
         a = new SFVec2 (2,3),
         b = a .negate (),
         c = b .negate ()

      expect (b) .toBeInstanceOf (SFVec2)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (b .equals (new SFVec2 (-2,-3))) .toBe (true)
      expect (c .equals (a)) .toBe (true)
   })

   test ("normalize", () =>
   {
      const
         a = new SFVec2 (4,9),
         b = a .normalize ()

      expect (b) .toBeInstanceOf (SFVec2)
      expect (b) .not .toBe (a)
      expect (b .getValue ()) .not .toBe (a .getValue ())

      expect (b .length ()) .toBeCloseTo (1)
   })

   test ("subtract", () =>
   {
      const
         a = new SFVec2 (8,10),
         b = new SFVec2 (6,7),
         c = a .subtract (b)

      expect (c) .toBeInstanceOf (SFVec2)
      expect (c) .not .toBe (a)
      expect (c) .not .toBe (b)
      expect (c .getValue ()) .not .toBe (a .getValue ())
      expect (c .getValue ()) .not .toBe (b .getValue ())

      expect (c .equals (new SFVec2 (2,3))) .toBe (true)
   })

   test ("fromString", () =>
   {
      const a = new SFVec2 ();

      a .fromString ("2 3");

      expect (a .equals (new SFVec2 (2, 3))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromString ("1 2", s);
      expect (a .equals (new SFVec2 (1000, 2000))) .toBe (true);
   });

   test ("fromVRMLString", () =>
   {
      const a = new SFVec2 ();

      a .fromVRMLString ("2 3");

      expect (a .equals (new SFVec2 (2, 3))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromVRMLString ("1 2", s);
      expect (a .equals (new SFVec2 (1000, 2000))) .toBe (true);
   });

   test ("fromXMLString", () =>
   {
      const a = new SFVec2 ();

      a .fromXMLString ("2 3");

      expect (a .equals (new SFVec2 (2, 3))) .toBe (true);

      const s = Browser .currentScene;

      s .updateUnit ("length", "kilometers", 1000);
      a .setUnit ("length");

      a .fromXMLString ("1 2", s);
      expect (a .equals (new SFVec2 (1000, 2000))) .toBe (true);
   });
}
