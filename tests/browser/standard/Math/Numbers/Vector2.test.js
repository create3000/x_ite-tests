import { expect, test } from "vitest";
import X3D              from "../../../X3D.js";

const Vector2 = X3D .Vector2;

test .concurrent ("constants", () =>
{
   expect (Vector2 .ZERO .equals (new Vector2 (0))) .toBe (true);

   expect (Vector2 .ONE .equals (new Vector2 (1))) .toBe (true);
   expect (Vector2 .X_AXIS .equals (new Vector2 (1,0))) .toBe (true);
   expect (Vector2 .Y_AXIS .equals (new Vector2 (0,1))) .toBe (true);

   expect (Vector2 .NEGATIVE_ONE .equals (new Vector2 (-1))) .toBe (true);
   expect (Vector2 .NEGATIVE_X_AXIS .equals (new Vector2 (-1,0))) .toBe (true);
   expect (Vector2 .NEGATIVE_Y_AXIS .equals (new Vector2 (0,-1))) .toBe (true);
});

test .concurrent ("constructor", () =>
{
   const v0 = new Vector2 ();

   expect (v0) .toEqual ({ x:0, y:0 });
   expect (v0 [0]) .toBe (0);
   expect (v0 [1]) .toBe (0);
   expect (v0 .x) .toBe (0);
   expect (v0 .y) .toBe (0);
   expect ([... v0]) .toEqual ([ 0, 0 ]);
   expect (v0) .toHaveLength (2);

   const v1 = new Vector2 (0, 0);

   expect (v1) .toEqual ({ x:0, y:0 });
   expect (v1 [0]) .toBe (0);
   expect (v1 [1]) .toBe (0);
   expect (v1 .x) .toBe (0);
   expect (v1 .y) .toBe (0);
   expect ([... v1]) .toEqual ([ 0, 0 ]);
   expect (v1) .toHaveLength (2);

   const v2 = new Vector2 (2, 3);

   expect (v2) .toEqual ({ x:2, y:3 });
   expect (v2 [0]) .toBe (2);
   expect (v2 [1]) .toBe (3);
   expect (v2 .x) .toBe (2);
   expect (v2 .y) .toBe (3);
   expect ([... v2]) .toEqual ([ 2, 3 ]);
   expect (v2) .toHaveLength (2);

   const v3 = new Vector2 (2);

   expect (v3 .x) .toBe (2);
   expect (v3 .y) .toBe (2);
   expect (v3 [0]) .toBe (2);
   expect (v3 [1]) .toBe (2);
   expect ([... v3]) .toEqual ([2, 2]);
   expect (v3) .toHaveLength (2);
});


test .concurrent ("enumerate", () =>
{
   const properties = [
      "x",
      "y",
   ];

   enumerate (properties, new Vector2 ());
   enumerate (properties, new Vector2 (1, 2));
});

test .concurrent ("copy", () =>
{
   const v1 = new Vector2 (2, 3);

   expect (v1 .copy ()) .toEqual ({ x:2, y:3 });
});

test .concurrent ("assign", () =>
{
   const
      v1 = new Vector2 (0, 0),
      v2 = new Vector2 (2, 3);

   expect (v1 .assign (v2)) .toEqual ({ x:2, y:3 });
});

test .concurrent ("set", () =>
{
   const v1 = new Vector2 (0, 0);

   expect (v1 .set (2, 3, 4, 5)) .toEqual ({ x:2, y:3 });
   expect (v1 .set ()) .toEqual ({ x:0, y:0 });
   expect ([... v1 .set (2)]) .toEqual ([2, 2]);
});

test .concurrent ("negate", () =>
{
   const v1 = new Vector2 (2, 3);

   v1 .negate ();

   expect (v1 [0]) .toBe (-2);
   expect (v1 [1]) .toBe (-3);

   const v2 = new Vector2 (-2, -3);

   v2 .negate ();

   expect (v2 [0]) .toBe (2);
   expect (v2 [1]) .toBe (3);
});

test .concurrent ("inverse", () =>
{
   const v1 = new Vector2 (2, 3);

   v1 .inverse ();

   expect (v1 [0]) .toBeCloseTo (1 / 2);
   expect (v1 [1]) .toBeCloseTo (1 / 3);
});

test .concurrent ("add", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .add (v2);

   expect (v1 [0]) .toBe (2 + 6);
   expect (v1 [1]) .toBe (3 + 7);
});

test .concurrent ("subtract", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .subtract (v2);

   expect (v1 [0]) .toBe (2 - 6);
   expect (v1 [1]) .toBe (3 - 7);
});

test .concurrent ("multiply", () =>
{
   const v1 = new Vector2 (2, 3);

   v1 .multiply (6);

   expect (v1 [0]) .toBe (2 * 6);
   expect (v1 [1]) .toBe (3 * 6);
});

test .concurrent ("multVec", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .multVec (v2);

   expect (v1 [0]) .toBe (2 * 6);
   expect (v1 [1]) .toBe (3 * 7);
});

test .concurrent ("divide", () =>
{
   const v1 = new Vector2 (2, 3);

   v1 .divide (6);

   expect (v1 [0]) .toBeCloseTo (2 / 6);
   expect (v1 [1]) .toBeCloseTo (3 / 6);
});

test .concurrent ("divVec", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .divVec (v2);

   expect (v1 [0]) .toBeCloseTo (2 / 6);
   expect (v1 [1]) .toBeCloseTo (3 / 7);
});

test .concurrent ("normalize", () =>
{
   const
      v1 = new Vector2 (2, 3),
      l  = Math .hypot (2, 3);

   v1 .normalize ();

   expect (v1 [0]) .toBeCloseTo (2 / l);
   expect (v1 [1]) .toBeCloseTo (3 / l);

   const v2 = new Vector2 (0);

   v2 .normalize ();

   expect (v2 .equals (Vector2 .ZERO)) .toBe (true);
});

test .concurrent ("dot", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   expect (v1 .dot (v2)) .toBe (2 * 6 + 3 * 7);
});

test .concurrent ("squaredNorm", () =>
{
   const v1 = new Vector2 (2, 3);

   expect (v1 .squaredNorm ()) .toBe (2 * 2 + 3 * 3);
});

test .concurrent ("norm", () =>
{
   const v1 = new Vector2 (2, 3);

   expect (v1 .norm ()) .toBeCloseTo (Math .hypot (2, 3));
});

test .concurrent ("distance", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   expect (v1 .distance (v2)) .toBeCloseTo (Math .hypot (2 - 6, 3 - 7));
});

test .concurrent ("lerp", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .lerp (v2, 0.5);

   expect (v1 [0]) .toBeCloseTo ((2 + 6) / 2);
   expect (v1 [1]) .toBeCloseTo ((3 + 7) / 2);
});

test .concurrent ("abs", () =>
{
   const v1 = new Vector2 (2, 3);

   v1 .abs ();

   expect (v1 [0]) .toBe (2);
   expect (v1 [1]) .toBe (3);

   const v2 = new Vector2 (-2, -3);

   v2 .abs ();

   expect (v2 [0]) .toBe (2);
   expect (v2 [1]) .toBe (3);
});

test .concurrent ("min", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .min (v2);

   expect (v1 [0]) .toBe (2);
   expect (v1 [1]) .toBe (3);
});

test .concurrent ("max", () =>
{
   const
      v1 = new Vector2 (2, 3),
      v2 = new Vector2 (6, 7);

   v1 .max (v2);

   expect (v1 [0]) .toBe (6);
   expect (v1 [1]) .toBe (7);
});

test .concurrent ("equals", () =>
{
   const
      a = new Vector2 (2,3),
      b = new Vector2 (2,3);

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
      v1 = new Vector2 (-1, 1),
      v2 = new Vector2 (0, -1);

   v1 .reflect (v2);

   expect (v1 [0]) .toBe (-1);
   expect (v1 [1]) .toBe (-1);
});

test .concurrent ("toString", () =>
{
   const v = new Vector2 (3, 4);

   expect (v .toString ()) .toBe ([... v] .join (" "));
});
