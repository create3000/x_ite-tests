const
   X3D        = require ("../../X3D"),
   Browser    = X3D .createBrowser () .browser,
   SFRotation = X3D .SFRotation,
   SFVec3d    = X3D .SFVec3d,
   SFVec3f    = X3D .SFVec3f,
   SFMatrix3d = X3D .SFMatrix3d,
   SFMatrix3f = X3D .SFMatrix3f

test ("constructor", () =>
{
   const v1 = new SFRotation ()

   expect (v1 .x) .toBe (0)
   expect (v1 .y) .toBe (0)
   expect (v1 .z) .toBe (1)
   expect (v1 .angle) .toBe (0)
   expect (v1 [0]) .toBe (0)
   expect (v1 [1]) .toBe (0)
   expect (v1 [2]) .toBe (1)
   expect (v1 [3]) .toBe (0)
   expect ([...v1]) .toEqual ([0,0,1,0])

   const v2 = new SFRotation (2,3,4,5)

   expect (v2 .x) .toBe (2)
   expect (v2 .y) .toBe (3)
   expect (v2 .z) .toBe (4)
   expect (v2 .angle) .toBe (5)
   expect (v2 [0]) .toBe (2)
   expect (v2 [1]) .toBe (3)
   expect (v2 [2]) .toBe (4)
   expect (v2 [3]) .toBe (5)
   expect ([...v2]) .toEqual ([2,3,4,5])

   const v3 = new SFRotation (new SFVec3f (2,3,4), 5)

   expect (v3 .x) .toBe (2)
   expect (v3 .y) .toBe (3)
   expect (v3 .z) .toBe (4)
   expect (v3 .angle) .toBe (5)
   expect (v3 [0]) .toBe (2)
   expect (v3 [1]) .toBe (3)
   expect (v3 [2]) .toBe (4)
   expect (v3 [3]) .toBe (5)
   expect ([...v3]) .toEqual ([2,3,4,5])

   const v4 = new SFRotation (new SFVec3f (0,0,1), new SFVec3f (1,0,0))

   expect (v4 .x) .toBeCloseTo (0)
   expect (v4 .y) .toBeCloseTo (1)
   expect (v4 .z) .toBeCloseTo (0)
   expect (v4 .angle) .toBeCloseTo (Math .PI / 2)
   expect (v4 [0]) .toBeCloseTo (0)
   expect (v4 [1]) .toBeCloseTo (1)
   expect (v4 [2]) .toBeCloseTo (0)
   expect (v4 [3]) .toBeCloseTo (Math .PI / 2)

   const v5 = new SFRotation (new SFMatrix3f (0,0,-1,0,1,0,1,0,0))

   expect (v5 .x) .toBeCloseTo (0)
   expect (v5 .y) .toBeCloseTo (1)
   expect (v5 .z) .toBeCloseTo (0)
   expect (v5 .angle) .toBeCloseTo (Math .PI / 2)
   expect (v5 [0]) .toBeCloseTo (0)
   expect (v5 [1]) .toBeCloseTo (1)
   expect (v5 [2]) .toBeCloseTo (0)
   expect (v5 [3]) .toBeCloseTo (Math .PI / 2)

   const v6 = new SFRotation (new SFVec3d (2,3,4), 5)

   expect (v6 .x) .toBe (2)
   expect (v6 .y) .toBe (3)
   expect (v6 .z) .toBe (4)
   expect (v6 .angle) .toBe (5)
   expect (v6 [0]) .toBe (2)
   expect (v6 [1]) .toBe (3)
   expect (v6 [2]) .toBe (4)
   expect (v6 [3]) .toBe (5)

   const v7 = new SFRotation (new SFVec3d (0,0,1), new SFVec3d (1,0,0))

   expect (v7 .x) .toBeCloseTo (0)
   expect (v7 .y) .toBeCloseTo (1)
   expect (v7 .z) .toBeCloseTo (0)
   expect (v7 .angle) .toBeCloseTo (Math .PI / 2)
   expect (v7 [0]) .toBeCloseTo (0)
   expect (v7 [1]) .toBeCloseTo (1)
   expect (v7 [2]) .toBeCloseTo (0)
   expect (v7 [3]) .toBeCloseTo (Math .PI / 2)

   const v8 = new SFRotation (new SFMatrix3d (0,0,-1,0,1,0,1,0,0))

   expect (v8 .x) .toBeCloseTo (0)
   expect (v8 .y) .toBeCloseTo (1)
   expect (v8 .z) .toBeCloseTo (0)
   expect (v8 .angle) .toBeCloseTo (Math .PI / 2)
   expect (v8 [0]) .toBeCloseTo (0)
   expect (v8 [1]) .toBeCloseTo (1)
   expect (v8 [2]) .toBeCloseTo (0)
   expect (v8 [3]) .toBeCloseTo (Math .PI / 2)

   const v9 = new SFRotation (undefined,undefined,undefined,undefined)

   expect (v9 .x) .toBe (NaN)
   expect (v9 .y) .toBe (NaN)
   expect (v9 .z) .toBe (NaN)
   expect (v9 .angle) .toBe (NaN)
   expect (v9 [0]) .toBe (NaN)
   expect (v9 [1]) .toBe (NaN)
   expect (v9 [2]) .toBe (NaN)
   expect (v9 [3]) .toBe (NaN)

})

test ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
      "z",
      "angle",
   ]

   enumerate (properties, new SFRotation ())
})

test ("getter/setter", () =>
{
   const v1 = new SFRotation ()

   v1 .x = 2
   v1 .y = 3
   v1 .z = 4
   v1 .angle = 5

   expect (v1 .x) .toBe (2)
   expect (v1 .y) .toBe (3)
   expect (v1 .z) .toBe (4)
   expect (v1 .angle) .toBe (5)
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
   expect (v1 .angle) .toBe (9)
   expect (v1 [0]) .toBe (6)
   expect (v1 [1]) .toBe (7)
   expect (v1 [2]) .toBe (8)
   expect (v1 [3]) .toBe (9)
   expect ([...v1]) .toEqual ([6,7,8,9])

   v1 [0]  = undefined;
   v1 [1]  = undefined;
   v1 [2]  = undefined;
   v1 [3]  = undefined;

   expect ([...v1]) .toEqual ([NaN,NaN,NaN,NaN])

   v1 .assign (new SFRotation (1,2,3,4));
   v1 .x     = undefined;
   v1 .y     = undefined;
   v1 .z     = undefined;
   v1 .angle = undefined;
   expect ([...v1]) .toEqual ([NaN,NaN,NaN,NaN]);
})

test ("common", () =>
{
   const field = new SFRotation ()

   expect (field .getType ()) .toBe (X3D .X3DConstants .SFRotation)
   expect (field .getTypeName ()) .toBe ("SFRotation")
   expect (Object .prototype .toString .call (field)) .toBe ("[object SFRotation]")
})

test ("copy", () =>
{
   const
      v1 = new SFRotation (2,3,4,5),
      v2 = v1 .copy ()

   expect (v2) .not .toBe (v1)
   expect (v2 .getValue ()) .not .toBe (v1 .getValue ())
   expect (v2 .equals (v1)) .toBe (true)
})

test ("equals", () =>
{
   const
      a = new SFRotation (2,3,4,5),
      b = new SFRotation (6,7,8,9)

   expect (a .equals (a)) .toBe (true)
   expect (b .equals (b)) .toBe (true)
   expect (a .equals (b)) .toBe (false)
})

test ("isDefaultValue", () =>
{
   const
      a = new SFRotation (0,0,1,0),
      b = new SFRotation (2,3,4,5),
      c = new SFRotation ();

   expect (c .isDefaultValue ()) .toBe (true);
   expect (a .isDefaultValue ()) .toBe (true);
   expect (b .isDefaultValue ()) .toBe (false);
});

test ("get/setAxis", () =>
{
   const a = new SFRotation (2,3,4,5)

   expect (a .getAxis ()) .toBeInstanceOf (SFVec3f)
   expect (a .getAxis ()) .not .toBe (a .getAxis ())
   expect (a .getAxis () .getValue ()) .not .toBe (a .getAxis ().getValue ())
   expect (a .getAxis () .equals (new SFVec3f (2,3,4))) .toBe (true)

   a .setAxis (new SFVec3f (6,7,8))

   expect (a .getAxis () .equals (new SFVec3f (6,7,8))) .toBe (true)
})

test ("get/setMatrix", () =>
{
   const a = new SFRotation (new SFVec3f (0,0,1), new SFVec3f (1,0,0))

   expect (a .getMatrix ()) .toBeInstanceOf (SFMatrix3f)
   expect (a .getMatrix ()) .not .toBe (a .getMatrix ())
   expect (a .getMatrix () .getValue ()) .not .toBe (a .getMatrix () .getValue ())
   expect (a .getMatrix () [0]) .toBeCloseTo (0)
   expect (a .getMatrix () [1]) .toBeCloseTo (0)
   expect (a .getMatrix () [2]) .toBeCloseTo (-1)
   expect (a .getMatrix () [3]) .toBeCloseTo (0)
   expect (a .getMatrix () [4]) .toBeCloseTo (1)
   expect (a .getMatrix () [5]) .toBeCloseTo (0)
   expect (a .getMatrix () [6]) .toBeCloseTo (1)
   expect (a .getMatrix () [7]) .toBeCloseTo (0)
   expect (a .getMatrix () [8]) .toBeCloseTo (0)

   const b = new SFRotation ()

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
   expect (b .y) .toBeCloseTo (1)
   expect (b .z) .toBeCloseTo (0)
   expect (b .angle) .toBeCloseTo (Math .PI / 2)
   expect (b [0]) .toBeCloseTo (0)
   expect (b [1]) .toBeCloseTo (1)
   expect (b [2]) .toBeCloseTo (0)
   expect (b [3]) .toBeCloseTo (Math .PI / 2)
})

test ("get/setQuaternion", () =>
{
   const r1 = new SFRotation (1, 0, 0, Math .PI/2);

   expect (r1 .getQuaternion ()) .toHaveLength (4);
   expect (r1 .getQuaternion ()) .not .toBe (r1 .getQuaternion ());
   expect (r1 .getQuaternion ()) .toEqual (r1 .getQuaternion ());

   expect (r1 .getQuaternion () [0]) .toBeCloseTo (Math .SQRT1_2);
   expect (r1 .getQuaternion () [1]) .toBeCloseTo (0);
   expect (r1 .getQuaternion () [2]) .toBeCloseTo (0);
   expect (r1 .getQuaternion () [3]) .toBeCloseTo (Math .SQRT1_2);

   const r2 = new SFRotation (0, 1, 0, Math .PI);

   expect (r2 .getQuaternion ()) .toHaveLength (4);
   expect (r2 .getQuaternion ()) .not .toBe (r2 .getQuaternion ());
   expect (r2 .getQuaternion ()) .toEqual (r2 .getQuaternion ());

   expect (r2 .getQuaternion () [0]) .toBeCloseTo (0);
   expect (r2 .getQuaternion () [1]) .toBeCloseTo (1);
   expect (r2 .getQuaternion () [2]) .toBeCloseTo (0);
   expect (r2 .getQuaternion () [3]) .toBeCloseTo (0);

   const r3 = new SFRotation (0, 0, 1, Math .PI);

   expect (r3 .getQuaternion ()) .toHaveLength (4);
   expect (r3 .getQuaternion ()) .not .toBe (r3 .getQuaternion ());
   expect (r3 .getQuaternion ()) .toEqual (r3 .getQuaternion ());

   expect (r3 .getQuaternion () [0]) .toBeCloseTo (0);
   expect (r3 .getQuaternion () [1]) .toBeCloseTo (0);
   expect (r3 .getQuaternion () [2]) .toBeCloseTo (1);
   expect (r3 .getQuaternion () [3]) .toBeCloseTo (0);

   const r4 = new SFRotation ();

   expect (r4 .getQuaternion ()) .toHaveLength (4);
   expect (r4 .getQuaternion () [0]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [1]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [2]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [3]) .toBeCloseTo (1);

   r4 .setQuaternion (Math .SQRT1_2, 0, 0, Math .SQRT1_2);

   expect (r4 .getQuaternion ()) .toHaveLength (4);
   expect (r4 .getQuaternion () [0]) .toBeCloseTo (Math .SQRT1_2);
   expect (r4 .getQuaternion () [1]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [2]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [3]) .toBeCloseTo (Math .SQRT1_2);

   expect (r4 .x) .toBeCloseTo (1);
   expect (r4 .y) .toBeCloseTo (0);
   expect (r4 .z) .toBeCloseTo (0);
   expect (r4 .angle) .toBeCloseTo (Math .PI/2);

   r4 .setQuaternion (0, 0, 0, 1);

   expect (r4 .getQuaternion ()) .toHaveLength (4);
   expect (r4 .getQuaternion () [0]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [1]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [2]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [3]) .toBeCloseTo (1);

   r4 .setQuaternion (1, 0, 0, 1);

   expect (r4 .getQuaternion ()) .toHaveLength (4);
   expect (r4 .getQuaternion () [0]) .toBeCloseTo (Math .SQRT1_2);
   expect (r4 .getQuaternion () [1]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [2]) .toBeCloseTo (0);
   expect (r4 .getQuaternion () [3]) .toBeCloseTo (Math .SQRT1_2);

   expect (r4 .x) .toBeCloseTo (1);
   expect (r4 .y) .toBeCloseTo (0);
   expect (r4 .z) .toBeCloseTo (0);
   expect (r4 .angle) .toBeCloseTo (Math .PI/2);

   const v4 = new X3D .Vector4 (1, 2, 3, 4) .normalize ();

   r4 .setQuaternion (1, 2, 3, 4);

   expect (r4 .getQuaternion ()) .toEqual ([... v4]);
});

test ("inverse", () =>
{
   const
      a = new SFRotation (2,3,4,5),
      b = a .inverse () .multiply (new SFRotation (2,3,4,5));

   expect (b) .toBeInstanceOf (SFRotation)
   expect (b) .not .toBe (a)
   expect (b .getValue ()) .not .toBe (a .getValue ())

   expect (b .x) .toBeCloseTo (0)
   expect (b .y) .toBeCloseTo (0)
   expect (b .z) .toBeCloseTo (1)
   expect (b .angle) .toBeCloseTo (0)
   expect (b [0]) .toBeCloseTo (0)
   expect (b [1]) .toBeCloseTo (0)
   expect (b [2]) .toBeCloseTo (1)
   expect (b [3]) .toBeCloseTo (0)

   const
      c = new SFRotation (2,3,4,5) .inverse () .inverse () .inverse (),
      d = new SFRotation (2,3,4,5) .inverse ()

   expect (c .x) .toBeCloseTo (d .x)
   expect (c .y) .toBeCloseTo (d .y)
   expect (c .z) .toBeCloseTo (d .z)
   expect (c .angle) .toBeCloseTo (d .angle)
   expect (c [0]) .toBeCloseTo (d [0])
   expect (c [1]) .toBeCloseTo (d [1])
   expect (c [2]) .toBeCloseTo (d [2])
   expect (c [3]) .toBeCloseTo (d [3])
})

test ("multiply", () =>
{
   const
      a = new SFRotation (new SFVec3f (1,2,3) .normalize (), 4),
      b = new SFRotation (5,6,7,8),
      c = a .multiply (b),
      d = new SFRotation (a .getMatrix () .multRight (b .getMatrix ())),
      e = a .multiply (b) .multiply (b .inverse ()),
      f = new SFRotation (a .getMatrix () .multRight (b .getMatrix ()) .multRight (b .getMatrix () .inverse ()))

   expect (c) .toBeInstanceOf (SFRotation)
   expect (c) .not .toBe (a)
   expect (c) .not .toBe (b)
   expect (c .getValue ()) .not .toBe (a .getValue ())
   expect (c .getValue ()) .not .toBe (b .getValue ())

   expect (d .x) .toBeCloseTo (-c .x)
   expect (d .y) .toBeCloseTo (-c .y)
   expect (d .z) .toBeCloseTo (-c .z)
   expect (d .angle) .toBeCloseTo (Math .PI * 2 - c .angle)
   expect (d [0]) .toBeCloseTo (-c [0])
   expect (d [1]) .toBeCloseTo (-c [1])
   expect (d [2]) .toBeCloseTo (-c [2])
   expect (d [3]) .toBeCloseTo (Math .PI * 2 - c [3])

   expect (e) .toBeInstanceOf (SFRotation)
   expect (e) .not .toBe (a)
   expect (e) .not .toBe (b)

   expect (e .x) .toBeCloseTo (a .x)
   expect (e .y) .toBeCloseTo (a .y)
   expect (e .z) .toBeCloseTo (a .z)
   expect (e .angle) .toBeCloseTo (a .angle)
   expect (e [0]) .toBeCloseTo (a [0])
   expect (e [1]) .toBeCloseTo (a [1])
   expect (e [2]) .toBeCloseTo (a [2])
   expect (e [3]) .toBeCloseTo (a [3])

   expect (f .x) .toBeCloseTo (e .x)
   expect (f .y) .toBeCloseTo (e .y)
   expect (f .z) .toBeCloseTo (e .z)
   expect (f .angle) .toBeCloseTo (e .angle)
   expect (f [0]) .toBeCloseTo (e [0])
   expect (f [1]) .toBeCloseTo (e [1])
   expect (f [2]) .toBeCloseTo (e [2])
   expect (f [3]) .toBeCloseTo (e [3])
})

test ("multVec", () =>
{
   const zAxis = new SFVec3f (0,0,1)

   const
      r1 = new SFRotation (zAxis, new SFVec3f (1,0,0)),
      v1 = r1 .multVec (zAxis)

   expect (v1) .toBeInstanceOf (SFVec3f)
   expect (v1) .not .toBe (r1 .multVec (zAxis))
   expect (v1 .getValue ()) .not .toBe (r1 .multVec (zAxis) .getValue ())
   expect (v1 [0]) .toBeCloseTo (1)
   expect (v1 [1]) .toBeCloseTo (0)
   expect (v1 [2]) .toBeCloseTo (0)

   const
      r2 = new SFRotation (zAxis, new SFVec3f (1,0,1)),
      v2 = r2 .multVec (zAxis)

   expect (v2) .toBeInstanceOf (SFVec3f)
   expect (v2) .not .toBe (r2 .multVec (zAxis))
   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (Math .SQRT1_2)

   const
      r3 = new SFRotation (zAxis, new SFVec3f (1,1,0)),
      v3 = r3 .multVec (zAxis)

   expect (v3) .toBeInstanceOf (SFVec3f)
   expect (v3) .not .toBe (r3 .multVec (zAxis))
   expect (v3 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (0)
})

test ("multVec-double", () =>
{
   const zAxis = new SFVec3d (0,0,1)

   const
      r1 = new SFRotation (zAxis, new SFVec3d (1,0,0)),
      v1 = r1 .multVec (zAxis)

   expect (v1) .toBeInstanceOf (SFVec3d)
   expect (v1) .not .toBe (r1 .multVec (zAxis))
   expect (v1 .getValue ()) .not .toBe (r1 .multVec (zAxis) .getValue ())
   expect (v1 [0]) .toBeCloseTo (1)
   expect (v1 [1]) .toBeCloseTo (0)
   expect (v1 [2]) .toBeCloseTo (0)

   const
      r2 = new SFRotation (zAxis, new SFVec3d (1,0,1)),
      v2 = r2 .multVec (zAxis)

   expect (v2) .toBeInstanceOf (SFVec3d)
   expect (v2) .not .toBe (r2 .multVec (zAxis))
   expect (v2 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v2 [1]) .toBeCloseTo (0)
   expect (v2 [2]) .toBeCloseTo (Math .SQRT1_2)

   const
      r3 = new SFRotation (zAxis, new SFVec3d (1,1,0)),
      v3 = r3 .multVec (zAxis)

   expect (v3) .toBeInstanceOf (SFVec3d)
   expect (v3) .not .toBe (r3 .multVec (zAxis))
   expect (v3 [0]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [1]) .toBeCloseTo (Math .SQRT1_2)
   expect (v3 [2]) .toBeCloseTo (0)
})

test ("slerp", () =>
{
   const
      a = new SFRotation (),
      b = new SFRotation (new SFVec3f (0,0,1), new SFVec3f (1,0,0)),
      c = a .slerp (b, 0.5)

   expect (c) .toBeInstanceOf (SFRotation)
   expect (c) .not .toBe (a)
   expect (c) .not .toBe (b)
   expect (c .getValue ()) .not .toBe (a .getValue ())
   expect (c .getValue ()) .not .toBe (b .getValue ())

   expect (c .x) .toBeCloseTo (0)
   expect (c .y) .toBeCloseTo (1)
   expect (c .z) .toBeCloseTo (0)
   expect (c .angle) .toBeCloseTo (Math .PI / 4)
   expect (c [0]) .toBeCloseTo (0)
   expect (c [1]) .toBeCloseTo (1)
   expect (c [2]) .toBeCloseTo (0)
   expect (c [3]) .toBeCloseTo (Math .PI / 4)
})

test ("fromString", () =>
{
   const a = new SFRotation ();

   a .fromString ("2 3 4 5");

   expect (a .equals (new SFRotation (2, 3, 4, 5))) .toBe (true);

   const s = Browser .currentScene;

   s .updateUnit ("angle", "degree", Math .PI / 180);
   a .setUnit ("angle");

   a .fromString ("1 2 3 90", s);
   expect (a .x) .toBe (1);
   expect (a .y) .toBe (2);
   expect (a .z) .toBe (3);
   expect (a .angle) .toBeCloseTo (Math .PI / 2);

   expect (() => a .fromString ("foo")) .toThrow (Error);
});

test ("fromVRMLString", () =>
{
   const a = new SFRotation ();

   a .fromVRMLString ("2 3 4 5");

   expect (a .equals (new SFRotation (2, 3, 4, 5))) .toBe (true);

   const s = Browser .currentScene;

   s .updateUnit ("angle", "degree", Math .PI / 180);
   a .setUnit ("angle");

   a .fromVRMLString ("1 2 3 90", s);
   expect (a .x) .toBe (1);
   expect (a .y) .toBe (2);
   expect (a .z) .toBe (3);
   expect (a .angle) .toBeCloseTo (Math .PI / 2);

   expect (() => a .fromVRMLString ("foo")) .toThrow (Error);
});

test ("fromXMLString", () =>
{
   const a = new SFRotation ();

   a .fromXMLString ("2 3 4 5");

   expect (a .equals (new SFRotation (2, 3, 4, 5))) .toBe (true);

   const s = Browser .currentScene;

   s .updateUnit ("angle", "degree", Math .PI / 180);
   a .setUnit ("angle");

   a .fromXMLString ("1 2 3 90", s);
   expect (a .x) .toBe (1);
   expect (a .y) .toBe (2);
   expect (a .z) .toBe (3);
   expect (a .angle) .toBeCloseTo (Math .PI / 2);

   expect (() => a .fromXMLString ("foo")) .toThrow (Error);
});

test ("toString", () =>
{
   const a = new SFRotation (1,2,3,4);
   const b = new SFRotation (5,6,7,8);

   expect (a .toString ()) .toBe ("1 2 3 4");
   expect (b .toString ()) .toBe ("5 6 7 8");
});
