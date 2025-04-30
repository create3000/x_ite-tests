const
   X3D     = require ("../../../X3D"),
   Box3    = X3D .Box3,
   Vector3 = X3D .Vector3;

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
