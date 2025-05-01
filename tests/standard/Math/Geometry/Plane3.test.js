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

   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);

   expect (px .normal .equals (Vector3 .xAxis)) .toBe (true);
   expect (px .distanceFromOrigin) .toBe (1);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);

   expect (py .normal .equals (Vector3 .yAxis)) .toBe (true);
   expect (py .distanceFromOrigin) .toBe (1);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);

   expect (pz .normal .equals (Vector3 .zAxis)) .toBe (true);
   expect (pz .distanceFromOrigin) .toBe (1);
});

test ("copy", () =>
{
   const p1 = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p2 = p1 .copy ();

   expect (p2 .normal) .not .toBe (p1 .normal);
   expect (p2 .normal .equals (p1 .normal)) .toBe (true);
   expect (p2 .distanceFromOrigin) .toBe (p1 .distanceFromOrigin);
   expect (p2 .equals (p1)) .toBe (true);
});

test ("assign", () =>
{
   const p1 = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p2 = new Plane3 ();

   p2 .assign (p1);

   expect (p2 .normal) .not .toBe (p1 .normal);
   expect (p2 .normal .equals (p1 .normal)) .toBe (true);
   expect (p2 .distanceFromOrigin) .toBe (p1 .distanceFromOrigin);
   expect (p2 .equals (p1)) .toBe (true);
});
