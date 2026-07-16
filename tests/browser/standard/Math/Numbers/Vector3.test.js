import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const Vector3 = X3D .Vector3;

test .concurrent ("constants", () =>
{
   expect (Vector3 .ZERO .equals (new Vector3 (0))) .toBe (true);

   expect (Vector3 .ONE .equals (new Vector3 (1))) .toBe (true);
   expect (Vector3 .X_AXIS .equals (new Vector3 (1,0,0))) .toBe (true);
   expect (Vector3 .Y_AXIS .equals (new Vector3 (0,1,0))) .toBe (true);
   expect (Vector3 .Z_AXIS .equals (new Vector3 (0,0,1))) .toBe (true);

   expect (Vector3 .NEGATIVE_ONE .equals (new Vector3 (-1))) .toBe (true);
   expect (Vector3 .NEGATIVE_X_AXIS .equals (new Vector3 (-1,0,0))) .toBe (true);
   expect (Vector3 .NEGATIVE_Y_AXIS .equals (new Vector3 (0,-1,0))) .toBe (true);
   expect (Vector3 .NEGATIVE_Z_AXIS .equals (new Vector3 (0,0,-1))) .toBe (true);
});

test .concurrent ("constructor", () =>
{
   const v0 = new Vector3 ();

   expect (v0) .toEqual ({ x:0, y:0, z:0 });
   expect (v0 [0]) .toBe (0);
   expect (v0 [1]) .toBe (0);
   expect (v0 [2]) .toBe (0);
   expect (v0 .x) .toBe (0);
   expect (v0 .y) .toBe (0);
   expect (v0 .z) .toBe (0);
   expect ([... v0]) .toEqual ([ 0, 0, 0 ]);
   expect (v0) .toHaveLength (3);

   const v1 = new Vector3 (0, 0, 0);

   expect (v1) .toEqual ({ x:0, y:0, z:0 });
   expect (v1 [0]) .toBe (0);
   expect (v1 [1]) .toBe (0);
   expect (v1 [2]) .toBe (0);
   expect (v1 .x) .toBe (0);
   expect (v1 .y) .toBe (0);
   expect (v1 .z) .toBe (0);
   expect ([... v1]) .toEqual ([ 0, 0, 0 ]);
   expect (v1) .toHaveLength (3);

   const v2 = new Vector3 (2, 3, 4);

   expect (v2) .toEqual ({ x:2, y:3, z:4 });
   expect (v2 [0]) .toBe (2);
   expect (v2 [1]) .toBe (3);
   expect (v2 [2]) .toBe (4);
   expect (v2 .x) .toBe (2);
   expect (v2 .y) .toBe (3);
   expect (v2 .z) .toBe (4);
   expect ([... v2]) .toEqual ([ 2, 3, 4 ]);
   expect (v2) .toHaveLength (3);

   const v3 = new Vector3 (2);

   expect (v3 .x) .toBe (2);
   expect (v3 .y) .toBe (2);
   expect (v3 .z) .toBe (2);
   expect (v3 [0]) .toBe (2);
   expect (v3 [1]) .toBe (2);
   expect (v3 [2]) .toBe (2);
   expect ([... v3]) .toEqual ([2, 2, 2]);
   expect (v3) .toHaveLength (3);

   const v4 = new Vector3 (2, 3);

   expect (v4 .x) .toBe (2);
   expect (v4 .y) .toBe (3);
   expect (v4 .z) .toBe (3);
   expect (v4 [0]) .toBe (2);
   expect (v4 [1]) .toBe (3);
   expect (v4 [2]) .toBe (3);
   expect ([... v4]) .toEqual ([2, 3, 3]);
   expect (v4) .toHaveLength (3);
});

test .concurrent ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
      "z",
   ];

   enumerate (properties, new Vector3 ());
   enumerate (properties, new Vector3 (1, 2, 3));
});

test .concurrent ("copy", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   expect (v1 .copy ()) .toEqual ({ x:2, y:3, z:4 });
});

test .concurrent ("assign", () =>
{
   const
      v1 = new Vector3 (0, 0, 0),
      v2 = new Vector3 (2, 3, 4);

   expect (v1 .assign (v2)) .toEqual ({ x:2, y:3, z:4 });
});

test .concurrent ("set", () =>
{
   const v1 = new Vector3 (0, 0, 0);

   expect (v1 .set (2, 3, 4)) .toEqual ({ x:2, y:3, z:4 });
   expect (v1 .set ()) .toEqual ({ x:0, y:0, z:0 });
   expect ([... v1 .set (2)]) .toEqual ([2, 2, 2]);
   expect ([... v1 .set (2, 3)]) .toEqual ([2, 3, 3]);
});

test .concurrent ("negate", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   v1 .negate ();

   expect (v1 [0]) .toBe (-2);
   expect (v1 [1]) .toBe (-3);
   expect (v1 [2]) .toBe (-4);

   const v2 = new Vector3 (-2, -3, -4);

   v2 .negate ();

   expect (v2 [0]) .toBe (2);
   expect (v2 [1]) .toBe (3);
   expect (v2 [2]) .toBe (4);
});

test .concurrent ("inverse", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   v1 .inverse ();

   expect (v1 [0]) .toBeCloseTo (1 / 2);
   expect (v1 [1]) .toBeCloseTo (1 / 3);
   expect (v1 [2]) .toBeCloseTo (1 / 4);
});

test .concurrent ("add", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .add (v2);

   expect (v1 [0]) .toBe (2 + 6);
   expect (v1 [1]) .toBe (3 + 7);
   expect (v1 [2]) .toBe (4 + 8);
});

test .concurrent ("subtract", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .subtract (v2);

   expect (v1 [0]) .toBe (2 - 6);
   expect (v1 [1]) .toBe (3 - 7);
   expect (v1 [2]) .toBe (4 - 8);
});

test .concurrent ("multiply", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   v1 .multiply (6);

   expect (v1 [0]) .toBe (2 * 6);
   expect (v1 [1]) .toBe (3 * 6);
   expect (v1 [2]) .toBe (4 * 6);
});

test .concurrent ("multVec", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .multVec (v2);

   expect (v1 [0]) .toBe (2 * 6);
   expect (v1 [1]) .toBe (3 * 7);
   expect (v1 [2]) .toBe (4 * 8);
});

test .concurrent ("divide", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   v1 .divide (6);

   expect (v1 [0]) .toBeCloseTo (2 / 6);
   expect (v1 [1]) .toBeCloseTo (3 / 6);
   expect (v1 [2]) .toBeCloseTo (4 / 6);
});

test .concurrent ("divVec", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .divVec (v2);

   expect (v1 [0]) .toBeCloseTo (2 / 6);
   expect (v1 [1]) .toBeCloseTo (3 / 7);
   expect (v1 [2]) .toBeCloseTo (4 / 8);
});

test .concurrent ("cross", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .cross (v2);

   expect (v1 [0]) .toBe (-4);
   expect (v1 [1]) .toBe (8);
   expect (v1 [2]) .toBe (-4);
});

test .concurrent ("normalize", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      l  = Math .hypot (2, 3, 4);

   v1 .normalize ();

   expect (v1 [0]) .toBeCloseTo (2 / l);
   expect (v1 [1]) .toBeCloseTo (3 / l);
   expect (v1 [2]) .toBeCloseTo (4 / l);

   const v2 = new Vector3 (0);

   v2 .normalize ();

   expect (v2 .equals (Vector3 .ZERO)) .toBe (true);
});

test .concurrent ("dot", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   expect (v1 .dot (v2)) .toBe (2 * 6 + 3 * 7 + 4 * 8);
});

test .concurrent ("squaredNorm", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   expect (v1 .squaredNorm ()) .toBe (2 * 2 + 3 * 3 + 4 * 4);
});

test .concurrent ("norm", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   expect (v1 .norm ()) .toBeCloseTo (Math .hypot (2, 3, 4));
});

test .concurrent ("distance", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   expect (v1 .distance (v2)) .toBeCloseTo (Math .hypot (2 - 6, 3 - 7, 4 - 8));
});

test .concurrent ("lerp", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .lerp (v2, 0.5);

   expect (v1 [0]) .toBeCloseTo ((2 + 6) / 2);
   expect (v1 [1]) .toBeCloseTo ((3 + 7) / 2);
   expect (v1 [2]) .toBeCloseTo ((4 + 8) / 2);
});

test .concurrent ("abs", () =>
{
   const v1 = new Vector3 (2, 3, 4);

   v1 .abs ();

   expect (v1 [0]) .toBe (2);
   expect (v1 [1]) .toBe (3);
   expect (v1 [2]) .toBe (4);

   const v2 = new Vector3 (-2, -3, -4);

   v2 .abs ();

   expect (v2 [0]) .toBe (2);
   expect (v2 [1]) .toBe (3);
   expect (v2 [2]) .toBe (4);
});

test .concurrent ("min", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .min (v2);

   expect (v1 [0]) .toBe (2);
   expect (v1 [1]) .toBe (3);
   expect (v1 [2]) .toBe (4);
});

test .concurrent ("max", () =>
{
   const
      v1 = new Vector3 (2, 3, 4),
      v2 = new Vector3 (6, 7, 8);

   v1 .max (v2);

   expect (v1 [0]) .toBe (6);
   expect (v1 [1]) .toBe (7);
   expect (v1 [2]) .toBe (8);
});

test .concurrent ("equals", () =>
{
   const
      a = new Vector3 (2,3,4),
      b = new Vector3 (2,3,4);

   expect (a .equals (b)) .toBe (true);

   for (let i = 0; i < a .length; ++ i)
   {
      const c = a .copy ();

      c [i] = 0;

      expect (a .equals (c)) .toBe (false);
   }
});

test .concurrent ("reflect", () =>
{
   const
      v1 = new Vector3 (-1, 0, -1),
      v2 = new Vector3 (0, 0, 1);

   v1 .reflect (v2);

   expect (v1 [0]) .toBe (-1);
   expect (v1 [1]) .toBe (0);
   expect (v1 [2]) .toBe (1);
});

test .concurrent ("toString", () =>
{
   const v = new Vector3 (3, 4, 5);

   expect (v .toString ()) .toBe ([... v] .join (" "));
});
