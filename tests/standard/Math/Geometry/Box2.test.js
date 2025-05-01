const
   X3D     = require ("../../../X3D"),
   Box2    = X3D .Box2,
   Vector2 = X3D .Vector2,
   Matrix3 = X3D .Matrix3;

test ("constructor", () =>
{
   const b1 = new Box2 ();

   expect (b1 .isEmpty ()) .toBe (true);
   expect (b1 .size .equals (Vector2 .Zero)) .toBe (true);
   expect (b1 .center .equals (Vector2 .Zero)) .toBe (true);

   const b2 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

   expect (b2 .isEmpty ()) .toBe (false);
   expect (b2 .size .equals (new Vector2 (2, 3))) .toBe (true);
   expect (b2 .center .equals (new Vector2 (5, 6))) .toBe (true);
});

test ("copy", () =>
{
   const b1 = new Box2 ();
   const c1 = b1 .copy ();

   expect (c1) .not .toBe (b1);
   expect (c1 .equals (b1)) .toBe (true);
   expect (c1 .isEmpty ()) .toBe (true);
   expect (c1 .size .equals (Vector2 .Zero)) .toBe (true);
   expect (c1 .center .equals (Vector2 .Zero)) .toBe (true);

   const b2 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));
   const c2 = b2 .copy ();

   expect (c2) .not .toBe (b2);
   expect (c2 .equals (b2)) .toBe (true);
   expect (c2 .isEmpty ()) .toBe (false);
   expect (c2 .size .equals (new Vector2 (2, 3))) .toBe (true);
   expect (c2 .center .equals (new Vector2 (5, 6))) .toBe (true);
});

test ("assign", () =>
{
   const b1 = new Box2 ();
   const b2 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));
   const b3 = new Box2 ();

   b1 .assign (b2);

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .equals (b2)) .toBe (true);
   expect (b1 .size .equals (new Vector2 (2, 3))) .toBe (true);
   expect (b1 .center .equals (new Vector2 (5, 6))) .toBe (true);

   b2 .assign (b3);

   expect (b2 .isEmpty ()) .toBe (true);
   expect (b2 .equals (b3)) .toBe (true);
   expect (b2 .size .equals (Vector2 .Zero)) .toBe (true);
   expect (b2 .center .equals (Vector2 .Zero)) .toBe (true);
});

test ("equals", () =>
{
   const b1 = new Box2 ();
   const b2 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

   expect (b1 .equals (b1)) .toBe (true);
   expect (b2 .equals (b2)) .toBe (true);
   expect (b1 .equals (b2)) .toBe (false);
   expect (b2 .equals (b1)) .toBe (false);
});

test ("getExtents", () =>
{
   const b1 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));
   const min = new Vector2 ();
   const max = new Vector2 ();

   b1 .getExtents (min, max);

   expect (min .equals (new Vector2 (4, 4.5))) .toBe (true);
   expect (max .equals (new Vector2 (6, 7.5))) .toBe (true);
});

test ("setExtents", () =>
{
   const b1 = new Box2 ();
   const min = new Vector2 (4, 4.5);
   const max = new Vector2 (6, 7.5);

   b1 .setExtents (min, max);

   expect (b1 .size .equals (new Vector2 (2, 3))) .toBe (true);
   expect (b1 .center .equals (new Vector2 (5, 6))) .toBe (true);
});

test ("getAbsoluteExtents", () =>
{
   const b1 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));
   const min = new Vector2 ();
   const max = new Vector2 ();

   b1 .getAbsoluteExtents (min, max);

   expect (min .equals (new Vector2 (-1, -1.5))) .toBe (true);
   expect (max .equals (new Vector2 (1, 1.5))) .toBe (true);
});

// test ("getPoints", () =>
// {
//    const b1 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

//    const points = Array .from ({ length: 4 }, () => new Vector2 ());

//    b1 .getPoints (points);

//    expect ([... points [0]]) .toEqual ([6, 7.5]);
//    expect ([... points [1]]) .toEqual ([4, 7.5]);
//    expect ([... points [2]]) .toEqual ([4, 4.5]);
//    expect ([... points [3]]) .toEqual ([6, 4.5]);
// });

test ("isEmpty", () =>
{
   const b1 = new Box2 ();
   const b2 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

   expect (b1 .isEmpty ()) .toBe (true);
   expect (b2 .isEmpty ()) .toBe (false);
});

test ("add", () =>
{
   const b1 = new Box2 ();
   const b2 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));
   const b3 = new Box2 (new Vector2 (4, 6), new Vector2 (5, 6));

   b1 .add (b2);

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .equals (b2)) .toBe (true);

   b1 .add (b3);

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .equals (b3)) .toBe (true);
   expect (b1 .size .equals (new Vector2 (4, 6))) .toBe (true);
   expect (b1 .center .equals (new Vector2 (5, 6))) .toBe (true);
});

test ("multRight", () =>
{
   const b1 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

   b1 .multRight (new Matrix3 (2, 0, 0,  0, 2, 0,  1, 2, 1));

   expect (b1 .isEmpty ()) .toBe (false);
   expect (b1 .size .equals (new Vector2 (4, 6))) .toBe (true);
   expect (b1 .center .equals (new Vector2 (11, 14))) .toBe (true);
});

test ("multRight", () =>
{
   const b1 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

   b1 .multLeft (new Matrix3 (2, 0, 0,  0, 2, 0,  1, 2, 1));

   expect (b1 .isEmpty ()) .toBe (false);
   expect ([... b1 .size ]) .toEqual ([4, 6]);
   expect ([... b1 .center]) .toEqual ([6, 9]);
});

test ("containsPoint", () =>
{
   const b1 = new Box2 (new Vector2 (2, 3), new Vector2 (5, 6));

   expect (b1 .containsPoint (new Vector2 (5, 6))) .toBe (true);
   expect (b1 .containsPoint (new Vector2 (4.5, 5))) .toBe (true);
   expect (b1 .containsPoint (new Vector2 (4, 4.5))) .toBe (true);

   expect (b1 .containsPoint (new Vector2 (3, 4))) .toBe (false);
   expect (b1 .containsPoint (new Vector2 (7, 8))) .toBe (false);
});
