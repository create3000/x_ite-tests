const
   X3D     = require ("../../../X3D"),
   Box2    = X3D .Box2,
   Vector2 = X3D .Vector2;

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
