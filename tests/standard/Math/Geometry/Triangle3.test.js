const
   X3D       = require ("../../../X3D"),
   Triangle3 = X3D .Triangle3,
   Vector3   = X3D .Vector3;

test ("area", () =>
{
   const a = new Vector3 ();
   const b = new Vector3 (1, 0, 0);
   const c = new Vector3 (0, 1, 0);

   expect (Triangle3 .area (a, b, c)) .toBeCloseTo (0.5);
});

test ("normal", () =>
{
   const a = new Vector3 ();
   const b = new Vector3 (1, 0, 0);
   const c = new Vector3 (0, 1, 0);
   const n = new Vector3 ();

   expect (Triangle3 .normal (a, b, c, n) .equals (Vector3 .zAxis)) .toBe (true);
});

test ("quadNormal", () =>
{
   const a = new Vector3 ();
   const b = new Vector3 (1, 0, 0);
   const c = new Vector3 (1, 1, 0);
   const d = new Vector3 (0, 1, 0);
   const n = new Vector3 ();

   expect (Triangle3 .quadNormal (a, b, c, d, n) .equals (Vector3 .zAxis)) .toBe (true);
});
