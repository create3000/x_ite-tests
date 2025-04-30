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
