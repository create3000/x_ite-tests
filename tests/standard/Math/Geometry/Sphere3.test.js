const
   X3D     = require ("../../../X3D"),
   Sphere3  = X3D .Sphere3,
   Line3   = X3D .Line3,
   Vector3 = X3D .Vector3;

test ("constructor", () =>
{
   const s1 = new Sphere3 ();

   expect (s1 .radius) .toBe (1);
   expect (s1 .center .equals (Vector3 .Zero)) .toBe (true);
   expect (s1 .center) .not .toBe (Vector3 .Zero);

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
});

test ("toString", () =>
{
   const s1 = new Sphere3 ();

   expect (typeof s1 .toString ()) .toBe ("string");
   expect (s1 .toString () .length > 0) .toBe (true);
});
