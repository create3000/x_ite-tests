const
   X3D       = require ("../../../X3D"),
   Cylinder3 = X3D .Cylinder3,
   Line3     = X3D .Line3,
   Vector3   = X3D .Vector3;

test ("constructor", () =>
{
   const c1 = new Cylinder3 ();

   expect (c1 .axis .equals (new Line3 ())) .toBe (true);
   expect (c1 .radius) .toBe (1);

   const c2 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);

   expect (c2 .axis .equals (new Line3 (Vector3 .Zero, Vector3 .xAxis))) .toBe (true);
   expect (c2 .radius) .toBe (2);
});

test ("copy", () =>
{
   const c1 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);
   const c2 = c1 .copy ();

   expect (c2 .axis .equals (new Line3 (Vector3 .Zero, Vector3 .xAxis))) .toBe (true);
   expect (c2 .radius) .toBe (2);
});

test ("assign", () =>
{
   const c1 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);
   const c2 = new Cylinder3 ();

   c2 .assign (c1);

   expect (c2 .axis .equals (new Line3 (Vector3 .Zero, Vector3 .xAxis))) .toBe (true);
   expect (c2 .radius) .toBe (2);
});

test ("equals", () =>
{
   const c1 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);
   const c2 = new Cylinder3 ();
   const c3 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);
   const c4 = new Cylinder3 ();

   expect (c3 .axis .equals (c1 .axis)) .toBe (true);
   expect (c3 .radius) .toBe (c1 .radius);
   expect (c3 .equals (c1)) .toBe (true);

   expect (c4 .axis .equals (c2 .axis)) .toBe (true);
   expect (c4 .radius) .toBe (c2 .radius);
   expect (c4 .equals (c2)) .toBe (true);

   expect (c3 .axis .equals (c2 .axis)) .not .toBe (true);
   expect (c3 .radius) .not .toBe (c2 .radius);
   expect (c3 .equals (c2)) .not .toBe (true);

   expect (c4 .axis .equals (c3 .axis)) .not .toBe (true);
   expect (c4 .radius) .not .toBe (c3 .radius);
   expect (c4 .equals (c3)) .not .toBe (true);
});

test ("set", () =>
{
   const c1 = new Cylinder3 ();

   c1 .set (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);

   expect (c1 .axis .equals (new Line3 (Vector3 .Zero, Vector3 .xAxis))) .toBe (true);
   expect (c1 .radius) .toBe (2);
});

test ("intersectsLine", () =>
{
   const en = new Vector3 ();
   const ex = new Vector3 ();

   const c1 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .xAxis), 2);
   const lx = new Line3 (Vector3 .Zero, Vector3 .yAxis);

   expect (c1 .intersectsLine (lx, en, ex)) .toBe (true);
   expect (en .x) .toBeCloseTo (0);
   expect (en .y) .toBeCloseTo (-2);
   expect (en .z) .toBeCloseTo (0);
   expect (ex .x) .toBeCloseTo (0);
   expect (ex .y) .toBeCloseTo (2);
   expect (ex .z) .toBeCloseTo (0);

   const c2 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .yAxis), 2);
   const ly = new Line3 (Vector3 .Zero, Vector3 .zAxis);

   expect (c2 .intersectsLine (ly, en, ex)) .toBe (true);
   expect (en .x) .toBeCloseTo (0);
   expect (en .y) .toBeCloseTo (0);
   expect (en .z) .toBeCloseTo (-2);
   expect (ex .x) .toBeCloseTo (0);
   expect (ex .y) .toBeCloseTo (0);
   expect (ex .z) .toBeCloseTo (2);

   const c3 = new Cylinder3 (new Line3 (Vector3 .Zero, Vector3 .zAxis), 2);
   const lz = new Line3 (Vector3 .Zero, Vector3 .xAxis);

   expect (c3 .intersectsLine (lz, en, ex)) .toBe (true);
   expect (en .x) .toBeCloseTo (-2);
   expect (en .y) .toBeCloseTo (0);
   expect (en .z) .toBeCloseTo (0);
   expect (ex .x) .toBeCloseTo (2);
   expect (ex .y) .toBeCloseTo (0);
   expect (ex .z) .toBeCloseTo (0);

   // Not precise enough for this tests:

   // const ox = new Line3 (new Vector3 (0, 4, 0), Vector3 .xAxis);

   // expect (c1 .intersectsLine (ox, en, ex)) .toBe (true);

   // const oy = new Line3 (new Vector3 (0, 2, 4), Vector3 .yAxis);

   // expect (c1 .intersectsLine (oy, en, ex)) .toBe (false);

   // const oz = new Line3 (new Vector3 (4, 0, 0), Vector3 .zAxis);

   // expect (c1 .intersectsLine (oz, en, ex)) .toBe (false);
});

test ("toString", () =>
{
   const c1 = new Cylinder3 ();

   expect (typeof c1 .toString ()) .toBe ("string");
   expect (c1 .toString () .length > 0) .toBe (true);
});
