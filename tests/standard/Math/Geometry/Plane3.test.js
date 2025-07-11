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

test ("equals", () =>
{
   const p1 = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p2 = new Plane3 ();
   const p3 = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p4 = new Plane3 ();

   expect (p3 .normal .equals (p1 .normal)) .toBe (true);
   expect (p3 .distanceFromOrigin) .toBe (p1 .distanceFromOrigin);
   expect (p3 .equals (p1)) .toBe (true);

   expect (p4 .normal .equals (p2 .normal)) .toBe (true);
   expect (p4 .distanceFromOrigin) .toBe (p2 .distanceFromOrigin);
   expect (p4 .equals (p2)) .toBe (true);

   expect (p3 .normal .equals (p2 .normal)) .not .toBe (true);
   expect (p3 .distanceFromOrigin) .not .toBe (p2 .distanceFromOrigin);
   expect (p3 .equals (p2)) .not .toBe (true);

   expect (p4 .normal .equals (p3 .normal)) .not .toBe (true);
   expect (p4 .distanceFromOrigin) .not .toBe (p3 .distanceFromOrigin);
   expect (p4 .equals (p3)) .not .toBe (true);
});

test ("set", () =>
{
   const px = new Plane3 ();

   px .set (Vector3 .xAxis, Vector3 .xAxis);

   expect (px .normal .equals (Vector3 .xAxis)) .toBe (true);
   expect (px .distanceFromOrigin) .toBe (1);

   const py = new Plane3 ();

   py .set (Vector3 .yAxis, Vector3 .yAxis);

   expect (py .normal .equals (Vector3 .yAxis)) .toBe (true);
   expect (py .distanceFromOrigin) .toBe (1);

   const pz = new Plane3 ();

   pz .set (Vector3 .zAxis, Vector3 .zAxis);

   expect (pz .normal .equals (Vector3 .zAxis)) .toBe (true);
   expect (pz .distanceFromOrigin) .toBe (1);

   px .set ();

   expect (px .normal .equals (Vector3 .zAxis)) .toBe (true);
   expect (px .distanceFromOrigin) .toBe (0);
});

test ("multRight", () =>
{
   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const m1 = new Matrix4 (0, 1, 0, 0,  -1, 0, 0, 0,  0, 0, 1, 0,  1, 1, 1, 1);

   px .multRight (m1);

   expect (px .normal .equals (Vector3 .yAxis)) .toBe (true);
   expect (px .distanceFromOrigin) .toBe (2);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);

   py .multRight (m1);

   expect (py .normal .equals (Vector3 .xAxis .copy () .negate ())) .toBe (true);
   expect (py .distanceFromOrigin) .toBe (0);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);

   pz .multRight (m1);

   expect (pz .normal .equals (Vector3 .zAxis)) .toBe (true);
   expect (pz .distanceFromOrigin) .toBe (2);
});

test ("multLeft", () =>
{
   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const m1 = new Matrix4 (0, 1, 0, 0,  -1, 0, 0, 0,  0, 0, 1, 0,  1, 1, 1, 1);

   px .multLeft (m1);

   expect (px .normal .equals (Vector3 .yAxis .copy () .negate ())) .toBe (true);
   expect (px .distanceFromOrigin) .toBe (0.5);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);

   py .multLeft (m1);

   expect (py .normal .equals (Vector3 .xAxis .copy ())) .toBe (true);
   expect (py .distanceFromOrigin) .toBe (0.5);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);

   pz .multLeft (m1);

   expect (pz .normal .equals (Vector3 .zAxis)) .toBe (true);
   expect (pz .distanceFromOrigin) .toBe (0.5);
});

test ("getDistanceToPoint", () =>
{
   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p1 = new Vector3 (2, 0, 0);

   expect (px .getDistanceToPoint (p1)) .toBe (1);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);
   const p2 = new Vector3 (0, 2, 0);

   expect (py .getDistanceToPoint (p2)) .toBe (1);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);
   const p3 = new Vector3 (0, 0, 2);

   expect (pz .getDistanceToPoint (p3)) .toBe (1);
});

test ("getPerpendicularVectorToPoint", () =>
{
   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p1 = new Vector3 (2, 0, 0);

   expect (px .getPerpendicularVectorToPoint (p1) .equals (Vector3 .xAxis .copy () .negate ())) .toBe (true);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);
   const p2 = new Vector3 (0, 2, 0);

   expect (py .getPerpendicularVectorToPoint (p2) .equals (Vector3 .yAxis .copy () .negate ())) .toBe (true);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);
   const p3 = new Vector3 (0, 0, 2);

   expect (pz .getPerpendicularVectorToPoint (p3) .equals (Vector3 .zAxis .copy () .negate ())) .toBe (true);
});

test ("getClosestPointToPoint", () =>
{
   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const p1 = new Vector3 (2, 0, 0);

   expect (px .getClosestPointToPoint (p1) .equals (Vector3 .xAxis)) .toBe (true);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);
   const p2 = new Vector3 (0, 2, 0);

   expect (py .getClosestPointToPoint (p2) .equals (Vector3 .yAxis)) .toBe (true);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);
   const p3 = new Vector3 (0, 0, 2);

   expect (pz .getClosestPointToPoint (p3) .equals (Vector3 .zAxis)) .toBe (true);
});

test ("intersectsLine", () =>
{
   const px = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);
   const l1 = new Line3 (Vector3 .Zero, Vector3 .xAxis);
   const is = new Vector3 ();

   expect (px .intersectsLine (l1, is)) .toBe (true);
   expect (is .equals (Vector3 .xAxis)) .toBe (true);

   const py = new Plane3 (Vector3 .yAxis, Vector3 .yAxis);
   const l2 = new Line3 (Vector3 .Zero, Vector3 .yAxis);

   expect (py .intersectsLine (l2, is)) .toBe (true);
   expect (is .equals (Vector3 .yAxis)) .toBe (true);

   const pz = new Plane3 (Vector3 .zAxis, Vector3 .zAxis);
   const l3 = new Line3 (Vector3 .Zero, Vector3 .zAxis);

   expect (pz .intersectsLine (l3, is)) .toBe (true);
   expect (is .equals (Vector3 .zAxis)) .toBe (true);

   expect (px .intersectsLine (l2, is)) .toBe (false);
   expect (py .intersectsLine (l3, is)) .toBe (false);
   expect (pz .intersectsLine (l1, is)) .toBe (false);
});

test ("toString", () =>
{
   const p1 = new Plane3 (Vector3 .xAxis, Vector3 .xAxis);

   expect (typeof p1 .toString ()) .toBe ("string");
   expect (p1 .toString () .length > 0) .toBe (true);
});
