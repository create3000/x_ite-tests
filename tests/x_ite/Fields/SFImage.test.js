const
   X3D     = require ("../../X3D"),
   SFImage = X3D .SFImage,
   MFInt32 = X3D .Fields .MFInt32

test ("constructor", () =>
{
   const v1 = new SFImage ()

   expect (v1 .x) .toBe (0)
   expect (v1 .y) .toBe (0)
   expect (v1 .width) .toBe (0)
   expect (v1 .height) .toBe (0)
   expect (v1 .comp) .toBe (0)
   expect (v1 .array) .toHaveLength (0)

   const v2 = new SFImage (1,2,3,new MFInt32 (5,6))

   expect (v2 .x) .toBe (1)
   expect (v2 .y) .toBe (2)
   expect (v2 .width) .toBe (1)
   expect (v2 .height) .toBe (2)
   expect (v2 .comp) .toBe (3)
   expect (v2 .array) .toHaveLength (2)
   expect (v2 .array [0]) .toBe (5)
   expect (v2 .array [1]) .toBe (6)

   const v3 = new SFImage (2,3,4)

   expect (v3 .x) .toBe (2)
   expect (v3 .y) .toBe (3)
   expect (v3 .width) .toBe (2)
   expect (v3 .height) .toBe (3)
   expect (v3 .comp) .toBe (4)
   expect (v3 .array) .toHaveLength (6)
   expect (v3 .array [0]) .toBe (0)
   expect (v3 .array [1]) .toBe (0)
   expect (v3 .array [2]) .toBe (0)
   expect (v3 .array [3]) .toBe (0)
   expect (v3 .array [4]) .toBe (0)
   expect (v3 .array [5]) .toBe (0)

   const v4 = [... v2];

   expect (v4 [0]) .toBe (v2 .width);
   expect (v4 [1]) .toBe (v2 .height);
   expect (v4 [2]) .toBe (v2 .comp);
   expect (v4 .slice (3)) .toEqual ([... v2 .array]);

   const v5 = new SFImage (1,2,3)

   expect (v5 .x) .toBe (1)
   expect (v5 .y) .toBe (2)
   expect (v5 .width) .toBe (1)
   expect (v5 .height) .toBe (2)
   expect (v5 .comp) .toBe (3)
   expect (v5 .array) .toHaveLength (2)
   expect (v5 .array [0]) .toBe (0)
   expect (v5 .array [1]) .toBe (0)

})

test ("enumerate", () =>
{
   enumerate (["width", "height", "comp", "array"], new SFImage ())
})

test ("getter/setter", () =>
{
   const
      v1 = new SFImage (),
      array = v1 .array

   v1 .width  = 1
   v1 .height = 2
   v1 .comp   = 3
   v1 .array  = new MFInt32 (5,6)

   expect (v1 .x) .toBe (1)
   expect (v1 .y) .toBe (2)
   expect (v1 .width) .toBe (1)
   expect (v1 .height) .toBe (2)
   expect (v1 .comp) .toBe (3)
   expect (v1 .array) .toBe (array)
   expect (v1 .array) .toHaveLength (2)
   expect (v1 .array [0]) .toBe (5)
   expect (v1 .array [1]) .toBe (6)

   v1 .x     = 2
   v1 .y     = 3
   v1 .comp  = 4
   v1 .array = new MFInt32 (1,2,3,4,5,6)

   expect (v1 .x) .toBe (2)
   expect (v1 .y) .toBe (3)
   expect (v1 .width) .toBe (2)
   expect (v1 .height) .toBe (3)
   expect (v1 .comp) .toBe (4)
   expect (v1 .array) .toBe (array)
   expect (v1 .array) .toHaveLength (6)
   expect (v1 .array [0]) .toBe (1)
   expect (v1 .array [1]) .toBe (2)
   expect (v1 .array [2]) .toBe (3)
   expect (v1 .array [3]) .toBe (4)
   expect (v1 .array [4]) .toBe (5)
   expect (v1 .array [5]) .toBe (6)
})

test ("common", () =>
{
   const field = new SFImage ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFImage)
   expect (field .getTypeName ()) .toBe ("SFImage")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFImage]")
})

test ("copy", () =>
{
   const
      v1 = new SFImage (1,2,3,new MFInt32 (5,6)),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
   expect (v2 .equals (v1)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFImage (1,2,3),
      b = new SFImage (2,3,4)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFImage (),
      b = new SFImage (1,2,3)

   expect (a .isDefaultValue ()) .toBe (true)
   expect (b .isDefaultValue ()) .toBe (false)
})

test ("fromString", () =>
{
   const a = new SFImage ();

   a .fromString ("2 3 4 1 2 3 4 5 6");

   expect (a .equals (new SFImage (2, 3, 4, new MFInt32 (1, 2, 3, 4, 5, 6)))) .toBe (true);
});

test ("fromVRMLString", () =>
{
   const a = new SFImage ();

   a .fromVRMLString ("2 3 4 1 2 3 4 5 6");

   expect (a .equals (new SFImage (2, 3, 4, new MFInt32 (1, 2, 3, 4, 5, 6)))) .toBe (true);
});

test ("fromXMLString", () =>
{
   const a = new SFImage ();

   a .fromXMLString ("2 3 4 1 2 3 4 5 6");

   expect (a .equals (new SFImage (2, 3, 4, new MFInt32 (1, 2, 3, 4, 5, 6)))) .toBe (true);
});
