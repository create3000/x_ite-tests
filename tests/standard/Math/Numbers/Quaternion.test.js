const
   X3D        = require ("../../../X3D"),
   Quaternion = X3D .Quaternion,
   Matrix3    = X3D .Matrix3

test ("constructor", () =>
{
   const q0 = new Quaternion ()

   expect (q0 .x) .toBe (0)
   expect (q0 .y) .toBe (0)
   expect (q0 .z) .toBe (0)
   expect (q0 .w) .toBe (1)

   expect (q0 [0]) .toBe (0)
   expect (q0 [1]) .toBe (0)
   expect (q0 [2]) .toBe (0)
   expect (q0 [3]) .toBe (1)

   expect (q0) .toHaveLength (4)

   expect ([... q0]) .toEqual ([0,0,0,1])

   const q1 = new Quaternion (1, 2, 3, 4)

   expect (q1 .x) .toBe (1)
   expect (q1 .y) .toBe (2)
   expect (q1 .z) .toBe (3)
   expect (q1 .w) .toBe (4)

   expect (q1 [0]) .toBe (1)
   expect (q1 [1]) .toBe (2)
   expect (q1 [2]) .toBe (3)
   expect (q1 [3]) .toBe (4)

   expect (q1) .toHaveLength (4)

   expect ([... q1]) .toEqual ([1,2,3,4])
})

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
   const q = new Quaternion (1, 2, 3, 4)
   const b = q .copy ()

   expect (b .equals (q)) .toBe (true)
})

test ("assign", () =>
{
   const q = new Quaternion (1, 2, 3, 4)
   const b = new Quaternion () .assign (q)

   expect (b .equals (q)) .toBe (true)
})

test ("set", () =>
{
   const q = new Quaternion () .set (2, 3, 4, 5)

   expect (q .equals (new Quaternion (2, 3, 4, 5))) .toBe (true)
   expect ([... q .set ()]) .toEqual ([0,0,0,1])
})

test ("getMatrix/setMatrix", () =>
{
   const m = new Matrix3 (1, 2, 3, 4, 5, 6, 7, 8, 9)
   const a = new Quaternion () .setMatrix (m) .normalize ()
   const b = new Quaternion () .setMatrix (a .getMatrix ())

   expect (b .x) .toBeCloseTo (a .x)
   expect (b .y) .toBeCloseTo (a .y)
   expect (b .z) .toBeCloseTo (a .z)
   expect (b .w) .toBeCloseTo (a .w)
})

test ("isReal", () =>
{
   const q = new Quaternion (0, 0, 0, 1)

   expect (q .isReal ()) .toBe (true)
   expect (q .isImag ()) .not .toBe (true)
})

test ("isImag", () =>
{
   const q = new Quaternion (1, 2, 3, 0)

   expect (q .isReal ()) .not .toBe (true)
   expect (q .isImag ()) .toBe (true)
})

test ("equals", () =>
{
   const a = new Quaternion (1, 2, 3, 4)
   const b = new Quaternion (1, 2, 3, 4)
   const c = new Quaternion (4, 3, 2, 1)

   expect (a .equals (b)) .toBe (true)
   expect (a .equals (c)) .toBe (false)
})

test ("negate", () =>
{
   const a = new Quaternion (1, 2, 3, 4)
   const b = a .negate ()
   expect (b .x) .toBe (-1)
   expect (b .y) .toBe (-2)
   expect (b .z) .toBe (-3)
   expect (b .w) .toBe (-4)
 })

 test ("inverse", () =>
 {
   const a = new Quaternion (1, 2, 3, 4) .normalize ()
   const b = a .copy () .inverse ()
   const c = a .copy () .multLeft (b)
   const d = a .copy () .multRight (b)

   expect (c .x) .toBeCloseTo (0)
   expect (c .y) .toBeCloseTo (0)
   expect (c .z) .toBeCloseTo (0)
   expect (c .w) .toBeCloseTo (1)

   expect (d .x) .toBeCloseTo (0)
   expect (d .y) .toBeCloseTo (0)
   expect (d .z) .toBeCloseTo (0)
   expect (d .w) .toBeCloseTo (1)
 })

 test ("add", () =>
 {
   const a = new Quaternion (1, 2, 3, 4)
   const b = new Quaternion (5, 6, 7, 8)
   const c = a .add (b)
   expect (c.x) .toBe (6)
   expect (c.y) .toBe (8)
   expect (c.z) .toBe (10)
   expect (c.w) .toBe (12)
 })

 test ("subtract", () =>
 {
   const a = new Quaternion (5, 6, 7, 8)
   const b = new Quaternion (1, 2, 3, 4)
   const c = a .subtract (b)
   expect (c.x) .toBe (4)
   expect (c.y) .toBe (4)
   expect (c.z) .toBe (4)
   expect (c.w) .toBe (4)
 })

 test ("multiply", () => {
   const a = new Quaternion (1, 2, 3, 4)
   const b = a .multiply (5)
   expect (b.x) .toBe (5)
   expect (b.y) .toBe (10)
   expect (b.z) .toBe (15)
   expect (b.w) .toBe (20)
 })

 test ("divide", () =>
 {
   const a = new Quaternion (2, 4, 6, 8)
   const b = a .divide (2)
   expect (b.x) .toBe (1)
   expect (b.y) .toBe (2)
   expect (b.z) .toBe (3)
   expect (b.w) .toBe (4)
})

 test("norm (length)", () =>
 {
   const q = new Quaternion (3, 4, 5, 6)
   const m = q .norm ()
   expect (m) .toBeCloseTo (9.273618495495704)
 })

 test ("toString", () =>
 {
    const q = new Quaternion (3, 4, 5, 6)

    expect (q .toString ()) .toBe ([... q] .join (" "))
 })
