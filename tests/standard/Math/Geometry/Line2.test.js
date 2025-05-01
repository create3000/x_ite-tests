const
   X3D     = require ("../../../X3D"),
   Line2   = X3D .Line2,
   Vector2 = X3D .Vector2,
   Matrix3 = X3D .Matrix3;

test ("constructor", () =>
{
   const p1 = new Vector2 (1, 1);
   const d1 = new Vector2 (0, 1);
   const l1 = new Line2 (p1, d1);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction) .not .toBe (d1);
   expect (l1 .direction .equals (d1)) .toBe (true);

   const p2 = new Vector2 (1, 2);
   const l2 = Line2 .Points (p1, p2);

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);
});

test ("copy", () =>
{
   const p1 = new Vector2 (1, 1);
   const d1 = new Vector2 (0, 1);
   const l1 = new Line2 (p1, d1);
   const l2 = l1 .copy ();

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);
});
