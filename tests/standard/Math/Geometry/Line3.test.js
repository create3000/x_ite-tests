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
   const l2 = Line3 .Points (p1, p2);

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);

   const l3 = new Line3 ();

   expect (l3 .point .equals (Vector3 .Zero)) .toBe (true);
   expect (l3 .direction .equals (Vector3 .zAxis)) .toBe (true);
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
   const p1 = Vector3 .Zero;
   const d1 = Vector3 .xAxis;
   const l1 = new Line3 (p1, d1);
   const m1 = new Matrix4 (0, 1, 0, 0,  -1, 0, 0, 0,  0, 0, 1, 0,  1, 1, 1, -1);

   l1 .multLineMatrix (m1);

   expect (l1 .point .equals (Vector3 .One .copy () .negate ())) .toBe (true);
   expect (l1 .direction .equals (Vector3 .yAxis)) .toBe (true);
});

test ("multMatrixLine", () =>
{
   const p1 = Vector3 .Zero;
   const d1 = Vector3 .xAxis;
   const l1 = new Line3 (p1, d1);
   const m1 = new Matrix4 (0, 1, 0, 0,  -1, 0, 0, 0,  0, 0, 1, 0,  1, 1, 1, -1);

   l1 .multMatrixLine (m1);

   expect (l1 .point .equals (Vector3 .Zero)) .toBe (true);
   expect (l1 .direction .equals (Vector3 .yAxis .copy () .negate ())) .toBe (true);
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
