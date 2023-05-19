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
//    const matrix = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9);
//    const qSetMatrix = new Quaternion ().setMatrix(matrix);
//    const matrixResult = qSetMatrix.getMatrix(new Matrix3 ());

//    expect (matrixResult [0]) .toBeCloseTo (matrix [0]);
//    expect (matrixResult [1]) .toBeCloseTo (matrix [1]);
//    expect (matrixResult [2]) .toBeCloseTo (matrix [2]);
//    expect (matrixResult [3]) .toBeCloseTo (matrix [3]);
//    expect (matrixResult [4]) .toBeCloseTo (matrix [4]);
//    expect (matrixResult [5]) .toBeCloseTo (matrix [5]);
//    expect (matrixResult [6]) .toBeCloseTo (matrix [6]);
//    expect (matrixResult [7]) .toBeCloseTo (matrix [7]);
//    expect (matrixResult [8]) .toBeCloseTo (matrix [8]);
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
