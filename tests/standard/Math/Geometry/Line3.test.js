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

   const p2 = new Vector3 (1, 2, 1);
   const l2 = Line3 .fromPoints (p1, p2);

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);

   const l3 = new Line3 ();

   expect (l3 .point .equals (Vector3 .ZERO)) .toBe (true);
   expect (l3 .direction .equals (Vector3 .Z_AXIS)) .toBe (true);
});

test ("copy", () =>
{
   const p1 = new Vector3 (1, 1, 1);
   const d1 = new Vector3 (0, 1, 0);
   const l1 = new Line3 (p1, d1);
   const l2 = l1 .copy ();

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);
});

test ("assign", () =>
{
   const p1 = new Vector3 (1, 1, 1);
   const d1 = new Vector3 (0, 1, 0);
   const l1 = new Line3 (p1, d1);
   const l2 = new Line3 ();

   l2 .assign (l1);

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);
});

test ("equals", () =>
{
   const p1 = new Vector3 (1, 1, 1);
   const d1 = new Vector3 (0, 1, 0);
   const l1 = new Line3 (p1, d1);
   const l2 = new Line3 ();
   const l3 = new Line3 (p1, d1);

   expect (l1 .equals (l1)) .toBe (true);
   expect (l2 .equals (l2)) .toBe (true);
   expect (l1 .equals (l2)) .toBe (false);
   expect (l2 .equals (l1)) .toBe (false);
   expect (l1 .equals (l3)) .toBe (true);
   expect (l3 .equals (l1)) .toBe (true);
});

test ("set", () =>
{
   const p1 = new Vector3 (1, 1, 1);
   const d1 = new Vector3 (0, 1, 0);
   const l1 = new Line3 ();

   l1 .set (p1, d1);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction) .not .toBe (d1);
   expect (l1 .direction .equals (d1)) .toBe (true);

   l1 .set ();

   expect (l1 .point .equals (Vector3 .ZERO)) .toBe (true);
   expect (l1 .direction .equals (Vector3 .Z_AXIS)) .toBe (true);
});

test ("setPoints", () =>
{
   const p1 = new Vector3 (1, 1, 1);
   const p2 = new Vector3 (1, 2, 1);
   const d1 = new Vector3 (0, 1, 0);
   const l1 = new Line3 ();

   l1 .setPoints (p1, p2);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction .equals (d1)) .toBe (true);
});

test ("multLineMatrix", () =>
{
   const p1 = Vector3 .ZERO;
   const d1 = Vector3 .X_AXIS;
   const l1 = new Line3 (p1, d1);
   const m1 = new Matrix4 (0, 1, 0, 0,  -1, 0, 0, 0,  0, 0, 1, 0,  1, 1, 1, 1);

   l1 .multLineMatrix (m1);

   expect (l1 .point .equals (Vector3 .ONE)) .toBe (true);
   expect (l1 .direction .equals (Vector3 .Y_AXIS)) .toBe (true);
});

test ("multMatrixLine", () =>
{
   const p1 = Vector3 .ZERO;
   const d1 = Vector3 .X_AXIS;
   const l1 = new Line3 (p1, d1);
   const m1 = new Matrix4 (0, 1, 0, 0,  -1, 0, 0, 0,  0, 0, 1, 0,  1, 1, 1, 1);

   l1 .multMatrixLine (m1);

   expect (l1 .point .equals (Vector3 .ZERO)) .toBe (true);
   expect (l1 .direction .equals (Vector3 .Y_AXIS .copy () .negate ())) .toBe (true);
});

test ("getClosestPointToPoint", () =>
{
   const p1 = new Vector3 (0, 0, 0);
   const d1 = new Vector3 (1, 0, 0);
   const l1 = new Line3 (p1, d1);
   const p2 = new Vector3 (1, 1, 0);

   const cp = l1 .getClosestPointToPoint (p2);

   expect (cp .equals (new Vector3 (1, 0, 0))) .toEqual (true);
});

test ("getClosestPointToLine", () =>
{
   const p1 = new Vector3 (0, 0, 0);
   const d1 = new Vector3 (1, 0, 0);
   const l1 = new Line3 (p1, d1);

   const p2 = new Vector3 (1, 1, 0);
   const d2 = new Vector3 (0, 0, 1);
   const l2 = new Line3 (p2, d2);

   const cp = new Vector3 ();

   expect (l1 .getClosestPointToLine (l2, cp)) .toBe (true);
   expect (cp .equals (new Vector3 (1, 0, 0))) .toEqual (true);

   const p3 = new Vector3 (0, 1, 0);
   const l3 = new Line3 (p3, d1);

   expect (l1 .getClosestPointToLine (l3, cp)) .toBe (false);
});

test ("getPerpendicularVectorToPoint", () =>
{
   const p1 = new Vector3 (0, 0, 0);
   const d1 = new Vector3 (1, 0, 0);
   const l1 = new Line3 (p1, d1);
   const p2 = new Vector3 (1, 1, 0);

   const pv = l1 .getPerpendicularVectorToPoint (p2);

   expect (pv .equals (new Vector3 (0, -1, 0))) .toEqual (true);
});

test ("getPerpendicularVectorToLine", () =>
{
   const p1 = new Vector3 (0, 0, 0);
   const d1 = new Vector3 (1, 0, 0);
   const l1 = new Line3 (p1, d1);

   const p2 = new Vector3 (1, 1, 0);
   const d2 = new Vector3 (0, 0, 1);
   const l2 = new Line3 (p2, d2);

   const pv1 = l1 .getPerpendicularVectorToLine (l2);

   expect (pv1 .equals (new Vector3 (0, -1, 0))) .toBe (true);

   const p3 = new Vector3 (0, 1, 0);
   const l3 = new Line3 (p3, d1);

   const pv2 = l1 .getPerpendicularVectorToLine (l3);

   expect (pv2 .equals (new Vector3 (0, -1, 0))) .toBe (true);
});

test ("intersectsTriangle", () =>
{
   const p1 = new Vector3 (0, 0, 0);
   const d1 = new Vector3 (0, 0, 1);
   const l1 = new Line3 (p1, d1);

   const a1 = new Vector3 (-1, -1, 0);
   const b1 = new Vector3 (1, -1, 0);
   const c1 = new Vector3 (0, 1, 0);
   const uvt = { };

   expect (l1 .intersectsTriangle (a1, b1, c1, uvt)) .toBe (true);
   expect (uvt .u) .toBe (0.25);
   expect (uvt .v) .toBe (0.25);
   expect (uvt .t) .toBe (0.5);

   const a2 = new Vector3 (9, -1, 0);
   const b2 = new Vector3 (11, -1, 0);
   const c2 = new Vector3 (10, 1, 0);

   expect (l1 .intersectsTriangle (a2, b2, c2, uvt)) .toBe (false);
});

test ("toString", () =>
{
   const p1 = new Vector3 (0, 0, 0);
   const d1 = new Vector3 (0, 0, 1);
   const l1 = new Line3 (p1, d1);

   expect (typeof l1 .toString ()) .toBe ("string");
   expect (l1 .toString () .length > 0) .toBe (true);
});
