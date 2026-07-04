const
   X3D        = require ("../../../X3D"),
   Quaternion = X3D .Quaternion,
   Matrix3    = X3D .Matrix3,
   Matrix4    = X3D .Matrix4,
   Vector3    = X3D .Vector3;

test ("constants", () =>
{
   expect (Quaternion .IDENTITY .equals (new Quaternion ())) .toBe (true);
});

test ("constructor", () =>
{
   const q0 = new Quaternion ();

   expect (q0 .x) .toBe (0);
   expect (q0 .y) .toBe (0);
   expect (q0 .z) .toBe (0);
   expect (q0 .w) .toBe (1);

   expect (q0 [0]) .toBe (0);
   expect (q0 [1]) .toBe (0);
   expect (q0 [2]) .toBe (0);
   expect (q0 [3]) .toBe (1);

   expect (q0) .toHaveLength (4);

   expect ([... q0]) .toEqual ([0,0,0,1]);

   const q1 = new Quaternion (1, 2, 3, 4);

   expect (q1 .x) .toBe (1);
   expect (q1 .y) .toBe (2);
   expect (q1 .z) .toBe (3);
   expect (q1 .w) .toBe (4);

   expect (q1 [0]) .toBe (1);
   expect (q1 [1]) .toBe (2);
   expect (q1 [2]) .toBe (3);
   expect (q1 [3]) .toBe (4);

   expect (q1) .toHaveLength (4);

   expect ([... q1]) .toEqual ([1,2,3,4]);
});

test ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
      "z",
      "w",
   ];

   enumerate (properties, new Quaternion ());
   enumerate (properties, new Quaternion (1, 2, 3, 4));
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
   expect ([... q .set ()]) .toEqual ([0,0,0,1]);
});

test ("getMatrix/setMatrix", () =>
{
   const m = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9);
   const a = new Quaternion () .setMatrix (m) .normalize ();
   const b = new Quaternion () .setMatrix (a .getMatrix ());

   expect (b .x) .toBeCloseTo (a .x);
   expect (b .y) .toBeCloseTo (a .y);
   expect (b .z) .toBeCloseTo (a .z);
   expect (b .w) .toBeCloseTo (a .w);

   const m3 = a .getMatrix (new Matrix3 ());
   const m4 = a .getMatrix (new Matrix4 ());

   expect (m3 [0]) .toBeCloseTo (m4 [0]);
   expect (m3 [1]) .toBeCloseTo (m4 [1]);
   expect (m3 [2]) .toBeCloseTo (m4 [2]);
   expect (m4 [3]) .toBe (0);

   expect (m3 [3]) .toBeCloseTo (m4 [4]);
   expect (m3 [4]) .toBeCloseTo (m4 [5]);
   expect (m3 [5]) .toBeCloseTo (m4 [6]);
   expect (m4 [7]) .toBe (0);

   expect (m3 [6]) .toBeCloseTo (m4 [8]);
   expect (m3 [7]) .toBeCloseTo (m4 [9]);
   expect (m3 [8]) .toBeCloseTo (m4 [10]);
   expect (m4 [11]) .toBe (0);

   expect (m4 [12]) .toBe (0);
   expect (m4 [13]) .toBe (0);
   expect (m4 [14]) .toBe (0);
   expect (m4 [15]) .toBe (1);
});

// test ("isReal", () =>
// {
//    const q = new Quaternion (0, 0, 0, 1);

//    expect (q .isReal ()) .toBe (true);
//    expect (q .isImag ()) .not .toBe (true);
// });

// test ("isImag", () =>
// {
//    const q = new Quaternion (1, 2, 3, 0);

//    expect (q .isReal ()) .not .toBe (true);
//    expect (q .isImag ()) .toBe (true);
// });

test ("equals", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion (1, 2, 3, 4);
   const c = new Quaternion (4, 3, 2, 1);

   expect (a .equals (b)) .toBe (true);
   expect (a .equals (c)) .toBe (false);
});

test ("add", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion (5, 6, 7, 8);
   const c = a .add (b);
   expect (c.x) .toBe (6);
   expect (c.y) .toBe (8);
   expect (c.z) .toBe (10);
   expect (c.w) .toBe (12);
});

test ("conjugate", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = a .conjugate ();
   expect (b .x) .toBe (-1);
   expect (b .y) .toBe (-2);
   expect (b .z) .toBe (-3);
   expect (b .w) .toBe (4);
});

test ("divide", () =>
{
   const a = new Quaternion (2, 4, 6, 8);
   const b = a .divide (2);
   expect (b.x) .toBe (1);
   expect (b.y) .toBe (2);
   expect (b.z) .toBe (3);
   expect (b.w) .toBe (4);
});

test ("dot", () =>
{
   const a = new Quaternion (2, 3, 4, 5);
   const b = new Quaternion (5, 6, 7, 8);

   expect (a .dot (b)) .toEqual (2*5 + 3*6 + 4*7 + 5*8);
});

test ("exp", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion (5, 6, 7, 8);

   a .exp ();
   b .exp ();

   expect (a .x) .toBeCloseTo (-8.240025266756874);
   expect (a .y) .toBeCloseTo (-16.480050533513747);
   expect (a .z) .toBeCloseTo (-24.72007580027062);
   expect (a .w) .toBeCloseTo (-45.05980201339819);

   expect (b .x) .toBeCloseTo (-1242.0114657960858);
   expect (b .y) .toBeCloseTo (-1490.413758955303);
   expect (b .z) .toBeCloseTo (-1738.81605211452);
   expect (b .w) .toBeCloseTo (-1448.6903062299164);
});

test ("inverse", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = a .copy () .inverse ();
   const c = a .copy () .multLeft (b);
   const d = a .copy () .multRight (b);

   expect (c .x) .toBeCloseTo (0);
   expect (c .y) .toBeCloseTo (0);
   expect (c .z) .toBeCloseTo (0);
   expect (c .w) .toBeCloseTo (1);

   expect (d .x) .toBeCloseTo (0);
   expect (d .y) .toBeCloseTo (0);
   expect (d .z) .toBeCloseTo (0);
   expect (d .w) .toBeCloseTo (1);
});

test ("log", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion (5, 6, 7, 8);

   a .log ();
   b .log ();

   expect (a .x) .toBeCloseTo (0.20099116820547408);
   expect (a .y) .toBeCloseTo (0.40198233641094816);
   expect (a .z) .toBeCloseTo (0.6029735046164222);
   expect (a .w) .toBeCloseTo (1.7005986908310777);

   expect (b .x) .toBeCloseTo (0.43819822073423786);
   expect (b .y) .toBeCloseTo (0.5258378648810854);
   expect (b .z) .toBeCloseTo (0.613477509027933);
   expect (b .w) .toBeCloseTo (2.5795276496072646);
});

test ("multiply", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = a .multiply (5);
   expect (b.x) .toBe (5);
   expect (b.y) .toBe (10);
   expect (b.z) .toBe (15);
   expect (b.w) .toBe (20);
 });

 test ("multLeft", () =>
{
   const a = new Quaternion (2, 3, 4, 5);
   const b = new Quaternion (6, 7, 8, 9);
   const c = a .multLeft (b);

   expect (c.x) .toBe (44);
   expect (c.y) .toBe (70);
   expect (c.z) .toBe (72);
   expect (c.w) .toBe (-20);

   const a1 = new Quaternion (2, 3, 4, 5);
   const b1 = new Quaternion (6, 7, 8, 9);
   const c1 = b1 .multLeft (a1);

   expect (c1.x) .toBe (52);
   expect (c1.y) .toBe (54);
   expect (c1.z) .toBe (80);
   expect (c1.w) .toBe (-20);
});

test ("multRight", () => {
   const a = new Quaternion (2, 3, 4, 5);
   const b = new Quaternion (6, 7, 8, 9);
   const c = a .multRight (b);

   expect (c.x) .toBe (52);
   expect (c.y) .toBe (54);
   expect (c.z) .toBe (80);
   expect (c.w) .toBe (-20);

   const a1 = new Quaternion (2, 3, 4, 5);
   const b1 = new Quaternion (6, 7, 8, 9);
   const c1 = b1 .multRight (a1);

   expect (c1.x) .toBe (44);
   expect (c1.y) .toBe (70);
   expect (c1.z) .toBe (72);
   expect (c1.w) .toBe (-20);
});

test ("multVecQuat", () =>
{
   const a = new Quaternion (2, 4, 6, 8);
   const b = new Vector3 (3, 4, 5);
   const c = a .multVecQuat (b .copy ());

   expect ([... c]) .toEqual ([-189, 100, 5]);

   const m = a .getMatrix ();
   const d = m .multVecMatrix (b .copy ());

   expect (d [0]) .toBeCloseTo (c [0]);
   expect (d [1]) .toBeCloseTo (c [1]);
   expect (d [2]) .toBeCloseTo (c [2]);
});

test ("multQuatVec", () =>
{
   const a = new Quaternion (2, 4, 6, 8);
   const b = new Vector3 (3, 4, 5);
   const c = a .multQuatVec (b .copy ());

   expect ([... c]) .toEqual ([-61, -156, 133]);

   const m = a .getMatrix ();
   const d = m .multMatrixVec (b .copy ());

   expect (d [0]) .toBeCloseTo (c [0]);
   expect (d [1]) .toBeCloseTo (c [1]);
   expect (d [2]) .toBeCloseTo (c [2]);
});

test ("negate", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = a .negate ();
   expect (b .x) .toBe (-1);
   expect (b .y) .toBe (-2);
   expect (b .z) .toBe (-3);
   expect (b .w) .toBe (-4);
});

test ("norm (length)", () =>
{
   const q = new Quaternion (3, 4, 5, 6);
   const m = q .norm ();
   expect (m) .toBeCloseTo (9.273618495495704);
});

test ("normalize", () =>
{
   const q = new Quaternion (2, 2, 2, 2);
   const n = q .normalize ();
   expect ([... n]) .toEqual ([0.5, 0.5, 0.5, 0.5]);
});

test ("pow", () =>
{
   const a = new Quaternion (1, 2, 3, 4);
   const b = new Quaternion (5, 6, 7, 8);

   a .pow (2.3);
   b .pow (2.3);

   expect (a .x) .toBeCloseTo (13.18620084468108);
   expect (a .y) .toBeCloseTo (26.37240168936216);
   expect (a .z) .toBeCloseTo (39.55860253404324);
   expect (a .w) .toBeCloseTo (-7.906295287757057);

   expect (b .x) .toBeCloseTo (153.95109525465574);
   expect (b .y) .toBeCloseTo (184.74131430558688);
   expect (b .z) .toBeCloseTo (215.53153335651803);
   expect (b .w) .toBeCloseTo (-195.02561928757083);

   const c = new Quaternion (1, 2, 3, 4);
   const d = new Quaternion (5, 6, 7, 8);

   c .pow (d);

   expect (c .x) .toBeCloseTo (-148.7236935874203);
   expect (c .y) .toBeCloseTo (-240.13511773723667);
   expect (c .z) .toBeCloseTo (-254.46318509663763);
   expect (c .w) .toBeCloseTo (88.67240264348418);
});

test ("subtract", () =>
{
   const a = new Quaternion (5, 6, 7, 8);
   const b = new Quaternion (1, 2, 3, 4);
   const c = a .subtract (b);
   expect (c.x) .toBe (4);
   expect (c.y) .toBe (4);
   expect (c.z) .toBe (4);
   expect (c.w) .toBe (4);
});

test ("toString", () =>
{
   const q = new Quaternion (3, 4, 5, 6);

   expect (q .toString ()) .toBe ([... q] .join (" "));
});
