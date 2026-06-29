const
   X3D          = require ("../../X3D"),
   Browser      = X3D .createBrowser () .browser,
   SFQuaternion = X3D .SFQuaternion,
   SFVec3d      = X3D .SFVec3d,
   SFVec3f      = X3D .SFVec3f,
   SFMatrix3f   = X3D .SFMatrix3f

test ("constants", () =>
{
   expect (SFQuaternion .ZERO     .equals (new SFQuaternion (0,0,0,0))) .toBe (true);
   expect (SFQuaternion .IDENTITY .equals (new SFQuaternion (0,0,0,1))) .toBe (true);
});

test ("constructor", () =>
{
   const v1 = new SFQuaternion ();

   expect (v1 .x) .toBe (0);
   expect (v1 .y) .toBe (0);
   expect (v1 .z) .toBe (0);
   expect (v1 .w) .toBe (0);
   expect (v1 [0]) .toBe (0);
   expect (v1 [1]) .toBe (0);
   expect (v1 [2]) .toBe (0);
   expect (v1 [3]) .toBe (0);
   expect ([...v1]) .toEqual ([0,0,0,0]);

   const v2 = new SFQuaternion (2,3,4,5)

   expect (v2 .x) .toBe (2)
   expect (v2 .y) .toBe (3)
   expect (v2 .z) .toBe (4)
   expect (v2 .w) .toBe (5)
   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect (v2 [2]) .toBe (4)
   expect (v2 [3]) .toBe (5)
   expect ([...v2]) .toEqual ([2,3,4,5])

   const v3 = new SFQuaternion (undefined,undefined,undefined,undefined)

   expect (v3 .x) .toBe (0);
   expect (v3 .y) .toBe (0);
   expect (v3 .z) .toBe (0);
   expect (v3 .w) .toBe (0);
   expect (v3 [0]) .toBe (0);
   expect (v3 [1]) .toBe (0);
   expect (v3 [2]) .toBe (0);
   expect (v3 [3]) .toBe (0);
});

test ("fromMatrix", () =>
{
   const v1 = SFQuaternion .fromMatrix (new SFMatrix3f (0,0,-1,0,1,0,1,0,0));

   expect (v1 .x) .toBeCloseTo (0);
   expect (v1 .y) .toBeCloseTo (Math .SQRT1_2);
   expect (v1 .z) .toBeCloseTo (0);
   expect (v1 .w) .toBeCloseTo (Math .SQRT1_2);
   expect (v1 [0]) .toBeCloseTo (0);
   expect (v1 [1]) .toBeCloseTo (Math .SQRT1_2);
   expect (v1 [2]) .toBeCloseTo (0);
   expect (v1 [3]) .toBeCloseTo (Math .SQRT1_2);
});

test ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
      "z",
      "w",
   ];

   enumerate (properties, new SFQuaternion ());
});

test ("getter/setter", () =>
{
   const v1 = new SFQuaternion ()

   v1 .x = 2
   v1 .y = 3
   v1 .z = 4
   v1 .w = 5

   expect (v1 .x) .toBe (2)
   expect (v1 .y) .toBe (3)
   expect (v1 .z) .toBe (4)
   expect (v1 .w) .toBe (5)
   expect (v1 [0]) .toBe (2)
   expect (v1 [1]) .toBe (3)
   expect (v1 [2]) .toBe (4)
   expect (v1 [3]) .toBe (5)
   expect ([...v1]) .toEqual ([2,3,4,5])

   v1 [0] = 6
   v1 [1] = 7
   v1 [2] = 8
   v1 [3] = 9

   expect (v1 .x) .toBe (6)
   expect (v1 .y) .toBe (7)
   expect (v1 .z) .toBe (8)
   expect (v1 .w) .toBe (9)
   expect (v1 [0]) .toBe (6)
   expect (v1 [1]) .toBe (7)
   expect (v1 [2]) .toBe (8)
   expect (v1 [3]) .toBe (9)
   expect ([...v1]) .toEqual ([6,7,8,9])

   v1 [0] = undefined;
   v1 [1] = undefined;
   v1 [2] = undefined;
   v1 [3] = undefined;

   expect ([...v1]) .toEqual ([NaN,NaN,NaN,NaN])

   v1 .assign (new SFQuaternion (1,2,3,4));
   v1 .x = undefined;
   v1 .y = undefined;
   v1 .z = undefined;
   v1 .w = undefined;
   expect ([...v1]) .toEqual ([NaN,NaN,NaN,NaN]);
})

test ("common", () =>
{
   const field = new SFQuaternion ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFQuaternion)
   expect (field .getTypeName ()) .toBe ("SFQuaternion")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFQuaternion]")
})

test ("copy", () =>
{
   const
      v1 = new SFQuaternion (2,3,4,5),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
   expect (v2 .equals (v1)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFQuaternion (2,3,4,5),
      b = new SFQuaternion (6,7,8,9)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFQuaternion (0,0,0,0),
      b = new SFQuaternion (2,3,4,5),
      c = new SFQuaternion ();

   expect (c .isDefaultValue ()) .toBe (true);
   expect (a .isDefaultValue ()) .toBe (true);
   expect (b .isDefaultValue ()) .toBe (false);
});

test ("add", () =>
{
   const
      a = new SFQuaternion (2,3,4,5),
      b = new SFQuaternion (6,7,8,9),
      c = a .add (b);

   expect (c) .toBeInstanceOf (SFQuaternion);
   expect (c) .not .toBe (a);
   expect (c) .not .toBe (b);
   expect (c .getValue ()) .not .toBe (a .getValue ());
   expect (c .getValue ()) .not .toBe (b .getValue ());

   expect (c .equals (new SFQuaternion (8,10,12,14))) .toBe (true);
});

test ("divide", () =>
{
   const
      a = new SFQuaternion (2,4,6,8),
      b = a .divide (2);

   expect (b) .toBeInstanceOf (SFQuaternion);
   expect (b) .not .toBe (a);
   expect (b .getValue ()) .not .toBe (a .getValue ());

   expect (b .equals (new SFQuaternion (1,2,3,4))) .toBe (true);
});

test ("get/setMatrix", () =>
{
   const a = new SFQuaternion (0,0,0,1);
   const b = new SFQuaternion ();

   b .setMatrix (new SFMatrix3f (0,0,-1,0,1,0,1,0,0))

   expect (b .getMatrix ()) .toBeInstanceOf (SFMatrix3f)
   expect (b .getMatrix ()) .not .toBe (a .getMatrix ())
   expect (b .getMatrix () [0]) .toBeCloseTo (0)
   expect (b .getMatrix () [1]) .toBeCloseTo (0)
   expect (b .getMatrix () [2]) .toBeCloseTo (-1)
   expect (b .getMatrix () [3]) .toBeCloseTo (0)
   expect (b .getMatrix () [4]) .toBeCloseTo (1)
   expect (b .getMatrix () [5]) .toBeCloseTo (0)
   expect (b .getMatrix () [6]) .toBeCloseTo (1)
   expect (b .getMatrix () [7]) .toBeCloseTo (0)
   expect (b .getMatrix () [8]) .toBeCloseTo (0)

   expect (b .x) .toBeCloseTo (0)
   expect (b .y) .toBeCloseTo (Math .SQRT1_2)
   expect (b .z) .toBeCloseTo (0)
   expect (b .w) .toBeCloseTo (Math .SQRT1_2)
   expect (b [0]) .toBeCloseTo (0)
   expect (b [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (b [2]) .toBeCloseTo (0)
   expect (b [3]) .toBeCloseTo (Math .SQRT1_2)
})

test ("dot", () =>
{
   expect (new SFQuaternion (2,3,4,5) .dot (new SFQuaternion (6,7,8,9))) .toBe (110);
});

test ("inverse", () =>
{
   const
      a = new SFQuaternion (2,3,4,5),
      i = a .inverse (),
      b = i .multRight (new SFQuaternion (2,3,4,5));

   expect (i) .toBeInstanceOf (SFQuaternion);
   expect (i) .not .toBe (a);
   expect (i .getValue ()) .not .toBe (a .getValue ());

   expect (b) .toBeInstanceOf (SFQuaternion);
   expect (b) .not .toBe (a);
   expect (b .getValue ()) .not .toBe (a .getValue ());

   expect (b .x) .toBeCloseTo (0);
   expect (b .y) .toBeCloseTo (0);
   expect (b .z) .toBeCloseTo (0);
   expect (b .w) .toBeCloseTo (54);
   expect (b [0]) .toBeCloseTo (0);
   expect (b [1]) .toBeCloseTo (0);
   expect (b [2]) .toBeCloseTo (0);
   expect (b [3]) .toBeCloseTo (54);

   const
      c = new SFQuaternion (2,3,4,5) .inverse () .inverse () .inverse (),
      d = new SFQuaternion (2,3,4,5) .inverse ();

   expect (c .x) .toBeCloseTo (d .x);
   expect (c .y) .toBeCloseTo (d .y);
   expect (c .z) .toBeCloseTo (d .z);
   expect (c .w) .toBeCloseTo (d .w);
   expect (c [0]) .toBeCloseTo (d [0]);
   expect (c [1]) .toBeCloseTo (d [1]);
   expect (c [2]) .toBeCloseTo (d [2]);
   expect (c [3]) .toBeCloseTo (d [3]);
});

test ("length", () =>
{
   expect (new SFQuaternion (2,3,4,5) .length ()) .toBe (Math .hypot (2,3,4,5));
});

test ("multiply", () =>
{
   const
      a = new SFQuaternion (2,4,6,8),
      b = a .multiply (2);

   expect (b) .toBeInstanceOf (SFQuaternion);
   expect (b) .not .toBe (a);
   expect (b .getValue ()) .not .toBe (a .getValue ());

   expect (b .equals (new SFQuaternion (4,8,12,16))) .toBe (true);
});

test ("multLeft", () =>
{
   const
      a = new SFQuaternion (1, 2, 3, 4),
      b = new SFQuaternion (8, 7, 6, 5),
      c = b .multLeft (a),
      d = a .multLeft (b);

   expect (c) .toBeInstanceOf (SFQuaternion);
   expect (c) .not .toBe (a);
   expect (c) .not .toBe (b);
   expect (c .getValue ()) .not .toBe (a .getValue ());
   expect (c .getValue ()) .not .toBe (b .getValue ());

   expect ([... c]) .toEqual ([46, 20, 48, -20]);
   expect ([... d]) .toEqual ([28, 56, 30, -20]);
});

test ("multQuatVec", () =>
{
   const
      r1 = new SFQuaternion (1, 2, 3, 4),
      v1 = r1 .multQuatVec (SFVec3f .Z_AXIS);

   expect (v1) .toBeInstanceOf (SFVec3f);
   expect (v1) .not .toBe (r1 .multVecQuat (SFVec3f .Z_AXIS));
   expect (v1 .getValue ()) .not .toBe (r1 .multVecQuat (SFVec3f .Z_AXIS) .getValue ());

   expect ([... v1]) .toEqual ([-10, 20, -9]);
});

test ("multVecQuat:double", () =>
{
   const
      r1 = new SFQuaternion (1, 2, 3, 4),
      v1 = r1 .multQuatVec (SFVec3d .Z_AXIS);

   expect (v1) .toBeInstanceOf (SFVec3d);
   expect (v1) .not .toBe (r1 .multVecQuat (SFVec3d .Z_AXIS));
   expect (v1 .getValue ()) .not .toBe (r1 .multVecQuat (SFVec3d .Z_AXIS) .getValue ());

   expect ([... v1]) .toEqual ([-10, 20, -9]);
});

test ("multRight", () =>
{
   const
      a = new SFQuaternion (1, 2, 3, 4),
      b = new SFQuaternion (8, 7, 6, 5),
      c = a .multRight (b),
      d = b .multRight (a);

   expect (c) .toBeInstanceOf (SFQuaternion);
   expect (c) .not .toBe (a);
   expect (c) .not .toBe (b);
   expect (c .getValue ()) .not .toBe (a .getValue ());
   expect (c .getValue ()) .not .toBe (b .getValue ());

   expect ([... c]) .toEqual ([46, 20, 48, -20]);
   expect ([... d]) .toEqual ([28, 56, 30, -20]);
});

test ("multVecQuat", () =>
{
   const
      r1 = new SFQuaternion (1, 2, 3, 4),
      v1 = r1 .multVecQuat (SFVec3f .Z_AXIS);

   expect (v1) .toBeInstanceOf (SFVec3f);
   expect (v1) .not .toBe (r1 .multVecQuat (SFVec3f .Z_AXIS));
   expect (v1 .getValue ()) .not .toBe (r1 .multVecQuat (SFVec3f .Z_AXIS) .getValue ());

   expect ([... v1]) .toEqual ([22, 4, -9]);
});

test ("multVecQuat:double", () =>
{
   const
      r1 = new SFQuaternion (1, 2, 3, 4),
      v1 = r1 .multVecQuat (SFVec3d .Z_AXIS)

   expect (v1) .toBeInstanceOf (SFVec3d);
   expect (v1) .not .toBe (r1 .multVecQuat (SFVec3d .Z_AXIS));
   expect (v1 .getValue ()) .not .toBe (r1 .multVecQuat (SFVec3d .Z_AXIS) .getValue ());

   expect ([... v1]) .toEqual ([22, 4, -9]);
});

test ("negate", () =>
{
   const
      a = new SFQuaternion (2,3,4,5),
      b = a .negate (),
      c = b .negate ();

   expect (b) .toBeInstanceOf (SFQuaternion);
   expect (b) .not .toBe (a);
   expect (b .getValue ()) .not .toBe (a .getValue ());

   expect (c) .toBeInstanceOf (SFQuaternion);
   expect (c) .not .toBe (a);
   expect (c) .not .toBe (b);
   expect (c .getValue ()) .not .toBe (a .getValue ());
   expect (c .getValue ()) .not .toBe (b .getValue ());

   expect (b .equals (new SFQuaternion (-2,-3,-4,-5))) .toBe (true);
   expect (c .equals (a)) .toBe (true);
});

test ("normalize", () =>
{
   const
      a = new SFQuaternion (4,9,16,25),
      b = a .normalize ();

   expect (b) .toBeInstanceOf (SFQuaternion);
   expect (b) .not .toBe (a);
   expect (b .getValue ()) .not .toBe (a .getValue ());

   expect (b .length ()) .toBeCloseTo (1);
});

test ("slerp", () =>
{
   const
      a = new SFQuaternion (8, -4, -9 ,2) .normalize (),
      b = new SFQuaternion (1, -4, 6, -7) .normalize (),
      c = a .slerp (b, 0.5);

   expect (c) .toBeInstanceOf (SFQuaternion);
   expect (c) .not .toBe (a);
   expect (c) .not .toBe (b);
   expect (c .getValue ()) .not .toBe (a .getValue ());
   expect (c .getValue ()) .not .toBe (b .getValue ());

   expect (c [0]) .toBeCloseTo (0.622799155329218);
   expect (c [1]) .toBeCloseTo (-0.311399577664609);
   expect (c [2]) .toBeCloseTo (-0.700649049745371);
   expect (c [3]) .toBeCloseTo (0.155699788832305);
});

test ("subtract", () =>
{
   const
      a = new SFQuaternion (8,10,12,14),
      b = new SFQuaternion (6,7,8,9),
      c = a .subtract (b);

   expect (c) .toBeInstanceOf (SFQuaternion);
   expect (c) .not .toBe (a);
   expect (c) .not .toBe (b);
   expect (c .getValue ()) .not .toBe (a .getValue ());
   expect (c .getValue ()) .not .toBe (b .getValue ());

   expect (c .equals (new SFQuaternion (2,3,4,5))) .toBe (true);
});

test ("fromString", () =>
{
   const a = new SFQuaternion ();

   a .fromString ("2 3 4 5");

   expect (a .equals (new SFQuaternion (2, 3, 4, 5))) .toBe (true);

   const s = Browser .currentScene;

   a .fromString ("1 2 3 90", s);
   expect (a .x) .toBe (1);
   expect (a .y) .toBe (2);
   expect (a .z) .toBe (3);
   expect (a .w) .toBe (90);

   expect (() => a .fromString ("foo")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new SFQuaternion ();

   a .fromVRMLString ("2 3 4 5");

   expect (a .equals (new SFQuaternion (2, 3, 4, 5))) .toBe (true);

   const s = Browser .currentScene;

   a .fromVRMLString ("1 2 3 90", s);
   expect (a .x) .toBe (1);
   expect (a .y) .toBe (2);
   expect (a .z) .toBe (3);
   expect (a .w) .toBe (90);

   expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new SFQuaternion ();

   a .fromXMLString ("2 3 4 5");

   expect (a .equals (new SFQuaternion (2, 3, 4, 5))) .toBe (true);

   const s = Browser .currentScene;

   a .fromXMLString ("1 2 3 90", s);
   expect (a .x) .toBe (1);
   expect (a .y) .toBe (2);
   expect (a .z) .toBe (3);
   expect (a .w) .toBe (90);

   expect (() => a .fromXMLString ("foo")) .toThrow (Error);
});

test ("toString", () =>
{
   const a = new SFQuaternion (1,2,3,4);
   const b = new SFQuaternion (5,6,7,8);

   expect (a .toString ()) .toBe ("1 2 3 4");
   expect (b .toString ()) .toBe ("5 6 7 8");
});
