const
   X3D     = require ("../../../X3D"),
   Line2   = X3D .Line2,
   Vector2 = X3D .Vector2,
   Matrix3 = X3D .Matrix3;

test ("constructor", () =>
{
   const p1 = new Vector2 (1, 1);
   const d1 = new Vector2 (0, );
   const l1 = new Line2 (p1, d1);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction) .not .toBe (d1);
   expect (l1 .direction .equals (d1)) .toBe (true);
});
