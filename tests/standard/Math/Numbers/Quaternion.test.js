const
   X3D        = require ("../../../X3D"),
   Quaternion = X3D .require ("standard/Math/Numbers/Quaternion"),
   Matrix3    = X3D .require ("standard/Math/Numbers/Matrix3")

test ("constructor", () =>
{
   const q = new Quaternion (1, 2, 3, 4);

   expect (q .x) .toBe (1);
   expect (q .y) .toBe (2);
   expect (q .z) .toBe (3);
   expect (q .w) .toBe (4);
});

test ("copy", () =>
{
   const q = new Quaternion (1, 2, 3, 4);
   const b = q .copy ();

   expect (b .equals (q)) .toBe (true);
});

test ("assign", () =>
{
   const q = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion () .assign (q);

   expect (b .equals (q)) .toBe (true);
});

test ("set", () =>
{
   const q = new Quaternion () .set (2, 3, 4, 5);

   expect (q .equals (new Quaternion (2, 3, 4, 5))) .toBe (true);
});

test ("getMatrix/setMatrix", () =>
{
   const m = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9);
   const a = new Quaternion () .setMatrix (m) .normalize ();
   const b = new Quaternion () .setMatrix (a .getMatrix (new Matrix3 ())) .normalize ();

   expect (b .x) .toBeCloseTo (a .x);
   expect (b .y) .toBeCloseTo (a .y);
   expect (b .z) .toBeCloseTo (a .z);
   expect (b .w) .toBeCloseTo (a .w);
});

test ("isReal", () =>
{
   const q = new Quaternion (0, 0, 0, 1);

   expect (q .isReal ()) .toBe (true);
   expect (q .isImag ()) .not .toBe (true);
});

test ("isImag", () =>
{
   const q = new Quaternion (1, 2, 3, 0);

   expect (q .isReal ()) .not .toBe (true);
   expect (q .isImag ()) .toBe (true);
});

test ("equals", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion (1, 2, 3, 4);
   const c = new Quaternion (4, 3, 2, 1);

   expect (a .equals (b)) .toBe (true);
   expect (a .equals (c)) .toBe (false);
});
