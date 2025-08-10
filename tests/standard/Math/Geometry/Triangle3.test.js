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

   expect (Triangle3 .normal (a, b, c, n) .equals (Vector3 .Z_AXIS)) .toBe (true);
});

test ("quadNormal", () =>
{
   const a = new Vector3 ();
   const b = new Vector3 (1, 0, 0);
   const c = new Vector3 (1, 1, 0);
   const d = new Vector3 (0, 1, 0);
   const n = new Vector3 ();

   expect (Triangle3 .quadNormal (a, b, c, d, n) .equals (Vector3 .Z_AXIS)) .toBe (true);
});

test ("triangulatePolygon", () =>
{
   const a = new Vector3 ();
   const b = new Vector3 (1, 0, 0);
   const c = new Vector3 (1, 1, 0);
   const d = new Vector3 (0, 1, 0);

   const polygon = [ a, b, c, d ];

   polygon .forEach ((v, i) => v .index = i);

   const triangles = Triangle3 .triangulatePolygon (polygon, [ ]);

   expect (triangles) .toEqual ([1, 3, 0, 3, 1, 2]);
});

test ("triangulateConvexPolygon", () =>
{
   const p1 = [ 0, 1, 2, 3 ];
   const p2 = [ 0, 1, 2, 3, 4 ];

   const t1 = Triangle3 .triangulateConvexPolygon (p1, [ ]);
   const t2 = Triangle3 .triangulateConvexPolygon (p2, [ ]);

   expect (t1) .toEqual ([0, 1, 2,  0, 2, 3]);
   expect (t2) .toEqual ([0, 1, 2,  0, 2, 3,  0, 3, 4]);
});
