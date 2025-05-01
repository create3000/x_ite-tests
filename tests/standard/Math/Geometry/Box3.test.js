const
   X3D     = require ("../../../X3D"),
   Box3    = X3D .Box3,
   Vector3 = X3D .Vector3,
   Matrix4 = X3D .Matrix4;

test ("constructor", () =>
{
   const b1 = new Box3 ();

   expect (b1 .isEmpty ()) .toBe (true);
   expect (b1 .size .equals (Vector3 .Zero)) .toBe (true);
   expect (b1 .center .equals (Vector3 .Zero)) .toBe (true);

   const b2 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   expect (b2 .isEmpty ()) .toBe (false);
   expect (b2 .size .equals (new Vector3 (2, 3, 4))) .toBe (true);
   expect (b2 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);

   const min = new Vector3 (4, 4.5, 5);
   const max = new Vector3 (6, 7.5, 9);
   const b3 = Box3 .Extents (min, max);

   expect (b3 .size .equals (new Vector3 (2, 3, 4))) .toBe (true);
   expect (b3 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);

   const b4 = Box3 .Points ([min, max]);

   expect (b4 .size .equals (new Vector3 (2, 3, 4))) .toBe (true);
   expect (b4 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);
});

test ("copy", () =>
{
   const b1 = new Box3 ();
   const c1 = b1 .copy ();

   expect (c1) .not .toBe (b1);
   expect (c1 .equals (b1)) .toBe (true);
   expect (c1 .isEmpty ()) .toBe (true);
   expect (c1 .size .equals (Vector3 .Zero)) .toBe (true);
   expect (c1 .center .equals (Vector3 .Zero)) .toBe (true);

   const b2 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));
   const c2 = b2 .copy ();

   expect (c2) .not .toBe (b2);
   expect (c2 .equals (b2)) .toBe (true);
   expect (c2 .isEmpty ()) .toBe (false);
   expect (c2 .size .equals (new Vector3 (2, 3, 4))) .toBe (true);
   expect (c2 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);
});

test ("assign", () =>
{
   const b1 = new Box3 ();
   const b2 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));
   const b3 = new Box3 ();

   b1 .assign (b2);

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .equals (b2)) .toBe (true);
   expect (b1 .size .equals (new Vector3 (2, 3, 4))) .toBe (true);
   expect (b1 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);

   b2 .assign (b3);

   expect (b2 .isEmpty ()) .toBe (true);
   expect (b2 .equals (b3)) .toBe (true);
   expect (b2 .size .equals (Vector3 .Zero)) .toBe (true);
   expect (b2 .center .equals (Vector3 .Zero)) .toBe (true);
});

test ("equals", () =>
{
   const b1 = new Box3 ();
   const b2 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   expect (b1 .equals (b1)) .toBe (true);
   expect (b2 .equals (b2)) .toBe (true);
   expect (b1 .equals (b2)) .toBe (false);
   expect (b2 .equals (b1)) .toBe (false);
});

test ("getExtents", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));
   const min = new Vector3 ();
   const max = new Vector3 ();

   b1 .getExtents (min, max);

   expect (min .equals (new Vector3 (4, 4.5, 5))) .toBe (true);
   expect (max .equals (new Vector3 (6, 7.5, 9))) .toBe (true);
});

test ("setExtents", () =>
{
   const b1 = new Box3 ();
   const min = new Vector3 (4, 4.5, 5);
   const max = new Vector3 (6, 7.5, 9);

   b1 .setExtents (min, max);

   expect (b1 .size .equals (new Vector3 (2, 3, 4))) .toBe (true);
   expect (b1 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);
});

test ("getAbsoluteExtents", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));
   const min = new Vector3 ();
   const max = new Vector3 ();

   b1 .getAbsoluteExtents (min, max);

   expect (min .equals (new Vector3 (-1, -1.5, -2))) .toBe (true);
   expect (max .equals (new Vector3 (1, 1.5, 2))) .toBe (true);
});

test ("getPoints", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   const points = Array .from ({ length: 8 }, () => new Vector3 ());

   b1 .getPoints (points);

   expect ([... points [0]]) .toEqual ([6, 7.5, 9]);
   expect ([... points [1]]) .toEqual ([4, 7.5, 9]);
   expect ([... points [2]]) .toEqual ([4, 4.5, 9]);
   expect ([... points [3]]) .toEqual ([6, 4.5, 9]);

   expect ([... points [4]]) .toEqual ([6, 7.5, 5]);
   expect ([... points [5]]) .toEqual ([4, 7.5, 5]);
   expect ([... points [6]]) .toEqual ([4, 4.5, 5]);
   expect ([... points [7]]) .toEqual ([6, 4.5, 5]);
});

test ("getAxes", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   const axes = Array .from ({ length: 3 }, () => new Vector3 ());

   b1 .getAxes (axes);

   expect ([... axes [0]]) .toEqual ([1, 0, 0]);
   expect ([... axes [1]]) .toEqual ([0, 1.5, 0]);
   expect ([... axes [2]]) .toEqual ([0, 0, 2]);
});

test ("getNormals", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   const normals = Array .from ({ length: 3 }, () => new Vector3 ());

   b1 .getNormals (normals);

   expect ([... normals [0]]) .toEqual ([1, 0, 0]);
   expect ([... normals [1]]) .toEqual ([0, 1, 0]);
   expect ([... normals [2]]) .toEqual ([0, 0, 1]);
});

test ("isEmpty", () =>
{
   const b1 = new Box3 ();
   const b2 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   expect (b1 .isEmpty ()) .toBe (true);
   expect (b2 .isEmpty ()) .toBe (false);
});

test ("add", () =>
{
   const b1 = new Box3 ();
   const b2 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));
   const b3 = new Box3 (new Vector3 (4, 6, 8), new Vector3 (5, 6, 7));

   b1 .add (b2);

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .equals (b2)) .toBe (true);

   b1 .add (b3);

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .equals (b3)) .toBe (true);
   expect (b1 .size .equals (new Vector3 (4, 6, 8))) .toBe (true);
   expect (b1 .center .equals (new Vector3 (5, 6, 7))) .toBe (true);
});

test ("multRight", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   b1 .multRight (new Matrix4 (2, 0, 0, 0,  0, 2, 0, 0,  0, 0, 2, 0,  1, 2, 3, 1));

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .size .equals (new Vector3 (4, 6, 8))) .toBe (true);
   expect (b1 .center .equals (new Vector3 (11, 14, 17))) .toBe (true);
});

test ("multRight", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   b1 .multLeft (new Matrix4 (2, 0, 0, 0,  0, 2, 0, 0,  0, 0, 2, 0,  1, 2, 3, 1));

   expect (b1 .isEmpty ()) .toBe (false);
   expect ([... b1 .size ]) .toEqual ([4, 6, 8]);
   expect ([... b1 .center]) .toEqual ([6, 9, 13]);
});

test ("containsPoint", () =>
{
   const b1 = new Box3 (new Vector3 (2, 3, 4), new Vector3 (5, 6, 7));

   expect (b1 .containsPoint (new Vector3 (5, 6, 7))) .toBe (true);
   expect (b1 .containsPoint (new Vector3 (4.5, 5, 6))) .toBe (true);
   expect (b1 .containsPoint (new Vector3 (4, 4.5, 5))) .toBe (true);

   expect (b1 .containsPoint (new Vector3 (3, 4, 4))) .toBe (false);
   expect (b1 .containsPoint (new Vector3 (7, 8, 10))) .toBe (false);
});
