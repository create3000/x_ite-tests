const
   X3D     = require ("../../../X3D"),
   Sphere3  = X3D .Sphere3,
   Line3   = X3D .Line3,
   Vector3 = X3D .Vector3;

test ("constructor", () =>
{
   const s1 = new Sphere3 ();

   expect (s1 .radius) .toBe (1);
   expect (s1 .center .equals (Vector3 .ZERO)) .toBe (true);
   expect (s1 .center) .not .toBe (Vector3 .ZERO);

   const c2 = new Vector3 (1, 1, 1);
   const s2 = new Sphere3 (2, c2);

   expect (s2 .radius) .toBe (2);
   expect (s2 .center .equals (c2)) .toBe (true);
   expect (s2 .center) .not .toBe (c2);
});

test ("copy", () =>
{
   const c1 = new Vector3 (1, 1, 1);
   const s1 = new Sphere3 (2, c1);
   const s2 = s1 .copy ();

   expect (s2 .radius) .toBe (2);
   expect (s2 .center .equals (c1)) .toBe (true);
   expect (s2 .center) .not .toBe (c1);
   expect (s2 .center) .not .toBe (s1 .center);
   expect (s2 .equals (s1)) .toBe (true);
});

test ("assign", () =>
{
   const c1 = new Vector3 (1, 1, 1);
   const s1 = new Sphere3 (2, c1);
   const s2 = new Sphere3 ();

   s2 .assign (s1);

   expect (s2 .radius) .toBe (2);
   expect (s2 .center .equals (c1)) .toBe (true);
   expect (s2 .center) .not .toBe (c1);
   expect (s2 .center) .not .toBe (s1 .center);
   expect (s2 .equals (s1)) .toBe (true);
});

test ("equals", () =>
{
   const c1 = new Vector3 (1, 1, 1);
   const s1 = new Sphere3 (2, c1);
   const s2 = new Sphere3 ();
   const s3 = new Sphere3 (2, c1);
   const s4 = new Sphere3 ();

   expect (s3 .radius) .toBe (s1 .radius);
   expect (s3 .center .equals (s1 .center)) .toBe (true);
   expect (s3 .equals (s1)) .toBe (true);

   expect (s4 .radius) .toBe (s2 .radius);
   expect (s4 .center .equals (s2 .center)) .toBe (true);
   expect (s4 .equals (s2)) .toBe (true);

   expect (s3 .radius) .not .toBe (s2 .radius);
   expect (s3 .center .equals (s2 .center)) .not .toBe (true);
   expect (s3 .equals (s2)) .not .toBe (true);

   expect (s4 .radius) .not .toBe (s3 .radius);
   expect (s4 .center .equals (s3 .center)) .not .toBe (true);
   expect (s4 .equals (s3)) .not .toBe (true);
});

test ("set", () =>
{
   const c1 = new Vector3 (1, 1, 1);
   const s1 = new Sphere3 ();

   s1 .set (2, c1);

   expect (s1 .radius) .toBe (2);
   expect (s1 .center .equals (c1)) .toBe (true);
   expect (s1 .center) .not .toBe (c1);
   expect (s1 .equals (s1)) .toBe (true);

   s1 .set ();

   expect (s1 .radius) .toBe (1);
   expect (s1 .center .equals (Vector3 .ZERO)) .toBe (true);
   expect (s1 .equals (s1)) .toBe (true);
});

test ("intersectsLine", () =>
{
   const s1 = new Sphere3 ();
   const en = new Vector3 ();
   const ex = new Vector3 ();
   const lx = new Line3 (Vector3 .ZERO, Vector3 .X_AXIS);

   expect (s1 .intersectsLine (lx, en, ex)) .toBe (true);
   expect (en .equals (Vector3 .X_AXIS .copy () .negate ())) .toBe (true);
   expect (ex .equals (Vector3 .X_AXIS)) .toBe (true);

   const ly = new Line3 (Vector3 .ZERO, Vector3 .Y_AXIS);

   expect (s1 .intersectsLine (ly, en, ex)) .toBe (true);
   expect (en .equals (Vector3 .Y_AXIS .copy () .negate ())) .toBe (true);
   expect (ex .equals (Vector3 .Y_AXIS)) .toBe (true);

   const lz = new Line3 (Vector3 .ZERO, Vector3 .Z_AXIS);

   expect (s1 .intersectsLine (lz, en, ex)) .toBe (true);
   expect (en .equals (Vector3 .Z_AXIS .copy () .negate ())) .toBe (true);
   expect (ex .equals (Vector3 .Z_AXIS)) .toBe (true);

   const ox = new Line3 (new Vector3 (2, 0, 0), Vector3 .Y_AXIS);

   expect (s1 .intersectsLine (ox, en, ex)) .toBe (false);

   const oy = new Line3 (new Vector3 (0, 2, 0), Vector3 .Z_AXIS);

   expect (s1 .intersectsLine (oy, en, ex)) .toBe (false);

   const oz = new Line3 (new Vector3 (0, 0, 2), Vector3 .X_AXIS);

   expect (s1 .intersectsLine (oz, en, ex)) .toBe (false);
});

// test ("intersectsTriangle", () =>
// {
//    const s1 = new Sphere3 ();
//    const a1 = new Vector3 (-1, -1, 0);
//    const b1 = new Vector3 (1, -1, 0);
//    const c1 = new Vector3 (0, 1, 0);

//    expect (s1 .intersectsTriangle (a1, b1, c1)) .toBe (true);

//    const a2 = new Vector3 (9, -1, 0);
//    const b2 = new Vector3 (11, -1, 0);
//    const c2 = new Vector3 (10, 1, 0);

//    expect (s1 .intersectsTriangle (a2, b2, c2)) .toBe (false);
// });

test ("toString", () =>
{
   const s1 = new Sphere3 ();

   expect (typeof s1 .toString ()) .toBe ("string");
   expect (s1 .toString () .length > 0) .toBe (true);
});
