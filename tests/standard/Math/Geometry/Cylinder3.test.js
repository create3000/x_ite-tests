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
});

test ("equals", () =>
{
});

test ("set", () =>
{
});

test ("intersectsLine", () =>
{
});

test ("toString", () =>
{
   const c1 = new Cylinder3 ();

   expect (typeof c1 .toString ()) .toBe ("string");
   expect (c1 .toString () .length > 0) .toBe (true);
});
