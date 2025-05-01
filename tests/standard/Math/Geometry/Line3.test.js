const
   X3D     = require ("../../../X3D"),
   Line3   = X3D .Line3,
   Vector3 = X3D .Vector3,
   Matrix4 = X3D .Matrix4;

test ("constructor", () =>
{
   const p1 = new Vector3 (1, 1, 1);
   const d1 = new Vector3 (0, 1, 0);
   const l1 = new Line3 (p1, d1);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction) .not .toBe (d1);
   expect (l1 .direction .equals (d1)) .toBe (true);
});
