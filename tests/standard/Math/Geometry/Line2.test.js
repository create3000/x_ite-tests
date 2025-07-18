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

   const l3 = new Line2 ();

   expect (l3 .point .equals (Vector2 .Zero)) .toBe (true);
   expect (l3 .direction .equals (Vector2 .yAxis)) .toBe (true);
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

test ("assign", () =>
{
   const p1 = new Vector2 (1, 1);
   const d1 = new Vector2 (0, 1);
   const l1 = new Line2 (p1, d1);
   const l2 = new Line2 ();

   l2 .assign (l1);

   expect (l2 .point) .not .toBe (p1);
   expect (l2 .point .equals (p1)) .toBe (true);

   expect (l2 .direction) .not .toBe (d1);
   expect (l2 .direction .equals (d1)) .toBe (true);

   expect (l2 .equals (l1)) .toBe (true);
});

test ("equals", () =>
{
   const p1 = new Vector2 (1, 1);
   const d1 = new Vector2 (0, 1);
   const l1 = new Line2 (p1, d1);
   const l2 = new Line2 ();
   const l3 = new Line2 (p1, d1);

   expect (l1 .equals (l1)) .toBe (true);
   expect (l2 .equals (l2)) .toBe (true);
   expect (l1 .equals (l2)) .toBe (false);
   expect (l2 .equals (l1)) .toBe (false);
   expect (l1 .equals (l3)) .toBe (true);
   expect (l3 .equals (l1)) .toBe (true);
});

test ("set", () =>
{
   const p1 = new Vector2 (1, 1);
   const d1 = new Vector2 (0, 1);
   const l1 = new Line2 ();

   l1 .set (p1, d1);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction) .not .toBe (d1);
   expect (l1 .direction .equals (d1)) .toBe (true);

   l1 .set ();

   expect (l1 .point .equals (Vector2 .Zero)) .toBe (true);
   expect (l1 .direction .equals (Vector2 .yAxis)) .toBe (true);
});

test ("setPoints", () =>
{
   const p1 = new Vector2 (1, 1);
   const p2 = new Vector2 (1, 2);
   const d1 = new Vector2 (0, 1);
   const l1 = new Line2 ();

   l1 .setPoints (p1, p2);

   expect (l1 .point) .not .toBe (p1);
   expect (l1 .point .equals (p1)) .toBe (true);

   expect (l1 .direction .equals (d1)) .toBe (true);
});

test ("multLineMatrix", () =>
{
   const p1 = Vector2 .Zero;
   const d1 = Vector2 .xAxis;
   const l1 = new Line2 (p1, d1);
   const m1 = new Matrix3 (0, 1, 0,  -1, 0, 0,  1, 1, -1);

   l1 .multLineMatrix (m1);

   expect (l1 .point .equals (Vector2 .One .copy () .negate ())) .toBe (true);
   expect (l1 .direction .equals (Vector2 .yAxis)) .toBe (true);
});

test ("multMatrixLine", () =>
{
   const p1 = Vector2 .Zero;
   const d1 = Vector2 .xAxis;
   const l1 = new Line2 (p1, d1);
   const m1 = new Matrix3 (0, 1, 0,  -1, 0, 0,  1, 1, -1);

   l1 .multMatrixLine (m1);

   expect (l1 .point .equals (Vector2 .Zero)) .toBe (true);
   expect (l1 .direction .equals (Vector2 .yAxis .copy () .negate ())) .toBe (true);
});

test ("getClosestPointToPoint", () =>
{
   const p1 = new Vector2 (0, 0);
   const d1 = new Vector2 (1, 0);
   const l1 = new Line2 (p1, d1);
   const p2 = new Vector2 (1, 1);

   const cp = l1 .getClosestPointToPoint (p2);

   expect (cp .equals (new Vector2 (1, 0))) .toEqual (true);
});

test ("getPerpendicularVectorToPoint", () =>
{
   const p1 = new Vector2 (0, 0);
   const d1 = new Vector2 (1, 0);
   const l1 = new Line2 (p1, d1);
   const p2 = new Vector2 (1, 1);

   const pv = l1 .getPerpendicularVectorToPoint (p2);

   expect (pv .equals (new Vector2 (0, -1))) .toEqual (true);
});

test ("getPerpendicularVectorToPoint", () =>
{
   const p1 = new Vector2 (0, 0);
   const d1 = new Vector2 (1, 0);
   const l1 = new Line2 (p1, d1);
   const p2 = new Vector2 (1, 1);
   const d2 = new Vector2 (0, 1);
   const l2 = new Line2 (p2, d2);

   const ip = new Vector2 ();

   expect (l1 .intersectsLine (l2, ip)) .toBe (true);
   expect (ip .equals (new Vector2 (1, 0))) .toEqual (true);

   const l3 = new Line2 (p2, d1);
   expect (l1 .intersectsLine (l3, ip)) .toBe (false);
});

test ("toString", () =>
{
   const p1 = new Vector2 (0, 0);
   const d1 = new Vector2 (0, 0);
   const l1 = new Line2 (p1, d1);

   expect (typeof l1 .toString ()) .toBe ("string");
   expect (l1 .toString () .length > 0) .toBe (true);
});
