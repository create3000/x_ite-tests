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

// test ("getMatrix/setMatrix", () =>
// {
//    const m = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9);
//    const q = new Quaternion () .setMatrix (matrix);
//    const r = q .getMatrix (new Matrix3 ());

//    expect (r [0]) .toBeCloseTo (m [0]);
//    expect (r [1]) .toBeCloseTo (m [1]);
//    expect (r [2]) .toBeCloseTo (m [2]);
//    expect (r [3]) .toBeCloseTo (m [3]);
//    expect (r [4]) .toBeCloseTo (m [4]);
//    expect (r [5]) .toBeCloseTo (m [5]);
//    expect (r [6]) .toBeCloseTo (m [6]);
//    expect (r [7]) .toBeCloseTo (m [7]);
//    expect (r [8]) .toBeCloseTo (m [8]);
// });

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
