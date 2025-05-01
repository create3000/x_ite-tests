const
   X3D     = require ("../../../X3D"),
   Plane3  = X3D .Plane3,
   Line3   = X3D .Line3,
   Vector3 = X3D .Vector3,
   Matrix4 = X3D .Matrix4;

test ("constructor", () =>
{
   const p1 = new Plane3 ();

   expect (p1 .normal .equals (Vector3 .zAxis)) .toBe (true);
   expect (p1 .distanceFromOrigin) .toBe (0);
});
