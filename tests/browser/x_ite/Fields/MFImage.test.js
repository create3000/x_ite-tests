import { expect, test } from "vitest";
import X3D              from "../../X3D.js";

const MFImage = X3D .MFImage;
const MFInt32 = X3D .MFInt32;
const SFImage = X3D .SFImage;

test .concurrent ("constructor static methods", () =>
{
   const a = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (MFImage .from (a) .equals (a)) .toBe (true);
   expect (MFImage .fromArray (a .flat ()) .equals (a)) .toBe (true);
});

test .concurrent ("constructor", () =>
{
   const a = new MFImage ();

   expect (a) .toHaveLength (0);
   expect (a [0]) .toBe (undefined);
   expect (a) .toHaveLength (0);

   const b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));
   expect (b) .toHaveLength (2);
   expect (b [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   expect (b [1] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);

   const c = [... b];
   expect (c) .toHaveLength (2);
   expect (c [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   expect (c [1] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);
   for (let i = 0; i < 2; ++ i)
      expect (c [i]) .toBe (b [i]);

   const d = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)));
   expect (d) .toHaveLength (1);
   expect (d [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   d [0] .width  = 2;
   d [0] .height = 2;
   d [0] .comp   = 3;
   d [0] .array  = new MFInt32 (1,2,3,4);
   d .length = 2;
   d [1] .width  = 3;
   d [1] .height = 3;
   d [1] .comp   = 3;
   d [1] .array  = new MFInt32 (1,2,3,4,5,6,7,8,9);
   expect (d) .toHaveLength (2);
   expect (d [0] .equals (new SFImage (2,2,3,new MFInt32(1,2,3,4)))) .toBe (true);
   expect (d [1] .equals (new SFImage (3,3,3,new MFInt32(1,2,3,4,5,6,7,8,9)))) .toBe (true);

   expect ((new MFImage ()) [0]) .toBe (undefined);
});

test .concurrent ("get1Value", () =>
{
   const field = new MFImage ();

   expect (field) .toHaveLength (0);

   for (let i = -10; i < 10; ++ i)
   {
      expect (field [i]) .toBe (undefined);
      expect (field) .toHaveLength (0);
   }

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (0);

   field .push (new SFImage ());
   field .push (new SFImage ());

   expect (field) .toHaveLength (2);
   expect (field [0]) .toBeInstanceOf (SFImage);
   expect (field [1]) .toBeInstanceOf (SFImage);

   expect (field [field .length]) .toBe (undefined);
   expect (field [-1]) .toBe (undefined);
   expect (field) .toHaveLength (2);

   field [2] = new SFImage ();
   expect (field) .toHaveLength (3);
   expect (field [2]) .toBeInstanceOf (SFImage);
});

test .concurrent ("set1Value", () =>
{
   const field = new MFImage ();

   field [0] = new SFImage (1,2,3,new MFInt32(0xa,0xb));
   field [2] = new SFImage (2,1,4,new MFInt32(0xc,0xd));
   expect (field) .toHaveLength (3);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage(), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);
});

test .concurrent ("setValue", () =>
{
   const field = new MFImage ();

   field .setValue ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);
   expect (field [0] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);
   expect (field [1] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);

   field .setValue ([2,1,4,0xc,0xd,1,2,3,0xa,0xb]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (2,1,4,new MFInt32(0xc,0xd)), new SFImage (1,2,3,new MFInt32(0xa,0xb))))) .toBe (true);
   expect (field [0] .equals (new SFImage (2,1,4,new MFInt32(0xc,0xd)))) .toBe (true);
   expect (field [1] .equals (new SFImage (1,2,3,new MFInt32(0xa,0xb)))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFImage ())) .toBe (true);

   field .setValue ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   field .setValue ([2,1,4,0xc,0xd,1,2,3,0xa,0xb]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (2,1,4,new MFInt32(0xc,0xd)), new SFImage (1,2,3,new MFInt32(0xa,0xb))))) .toBe (true);

   field .setValue ([ ]);

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFImage ())) .toBe (true);

   field .setValue ([new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))]);

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);
});

test .concurrent ("assign", () =>
{
   const field = new MFImage ();

   field .assign (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   field .assign (new MFImage (new SFImage (1,2,3,new MFInt32(1,2)), new SFImage (2,1,4,new MFInt32(2,3))));

   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(1,2)), new SFImage (2,1,4,new MFInt32(2,3))))) .toBe (true);

   field .assign (new MFImage ());

   expect (field) .toHaveLength (0);
   expect (field .equals (new MFImage ())) .toBe (true);
});

test .concurrent ("shrinkToFit", () =>
{
   const field = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (field .shrinkToFit ()) .toHaveLength (2);
   expect (field) .toHaveLength (2);
   expect (field .shrinkToFit ()) .toBe (field .shrinkToFit ());

   field .length = 1;
   expect (field .shrinkToFit ()) .toHaveLength (1);
   expect (field) .toHaveLength (1);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb))))) .toBe (true);

   field .length = 2;
   expect (field .shrinkToFit ()) .toHaveLength (2);
   expect (field) .toHaveLength (2);
   expect (field .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)),new SFImage()))) .toBe (true);
});

test .concurrent ("common", () =>
{
   const field = new MFImage ();

   expect (field .getType ()) .toBe (X3D .X3DConstants ["MFImage"]);
   expect (field .getTypeName ()) .toBe ("MFImage");
   expect (Object .prototype .toString .call (field)) .toBe (`[object ${"MFImage"}]`);
});

test .concurrent ("copy", () =>
{
   const
      a = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))),
      b = a .copy ();

   expect (b) .toBeInstanceOf (MFImage);
   expect (b) .toHaveLength (a .length);
   expect (b .equals (a)) .toBe (true);
   expect (b .getValue ()) .not .toBe (a .getValue ());
});

test .concurrent ("equals", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))),
      c = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .equals (a)) .toBe (true);
   expect (b .equals (b)) .toBe (true);
   expect (a .equals (b)) .toBe (false);
   expect (b .equals (c)) .toBe (true);
});

test .concurrent ("isDefaultValue", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage ());

   expect (a .isDefaultValue ()) .toBe (true);
   expect (b .isDefaultValue ()) .toBe (false);
});

test .concurrent ("at", () =>
{
   const
      N = 10,
      a = new MFImage ();

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFImage (1,1,3,++n))) .toBe (i + 1);

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,++n);
      expect (a .at (i)) .toBe (a [i]);
      expect (a .at (i) .equals (v)) .toBe (true);
      expect (a .at (i - N) .equals (a [i])) .toBe (true);
      expect (a .at (i - N) .equals (v)) .toBe (true);
   }
});

test .concurrent ("entries", () =>
{
   const
      N = 10,
      a = new MFImage ();

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFImage (1,1,3,++n))) .toBe (i + 1);

   expect ([... a .entries ()]) .toHaveLength (N);

   for (const [i, value] of a .entries ())
      expect (value) .toBe (a [i]);
});

test .concurrent ("keys", () =>
{
   const
      N = 10,
      a = new MFImage ();

   a .length = N;
   expect (a .keys ()) .toEqual (new Array (N) .keys ());
   a .length = N/2;
   expect (a .keys ()) .toEqual (new Array (N/2) .keys ());
});

test .concurrent ("push", () =>
{
   const
      N = 1_000,
      a = new MFImage ();

   expect (a) .toHaveLength (0);

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,[++n]);
      expect (a .push (v)) .toBe (i + 1);
      expect (a [i] .equals (v)) .toBe (true);
      expect (a) .toHaveLength (i + 1);
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,[++n]);
      expect (a [i] .equals (v)) .toBe (true);
   }
});

test .concurrent ("shift", () =>
{
   const
      N = 10,
      a = new MFImage ();

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,[++n]);
      a .push (v);
      expect (a [i] .equals (v)) .toBe (true);
      expect (a) .toHaveLength (i + 1);
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,[++n]);
      expect (a [i] .equals (v)) .toBe (true);
   }

   const b = a .slice ();

   for (let j = 0; j < N; ++ j)
   {
      expect (a .shift () .equals (b .shift ())) .toBe (true);
      expect (a) .toHaveLength (N - j - 1);

      for (let i = 0, n = j * 1 + 1; i < a .length; ++ i)
      {
         const v = new SFImage (1,1,3,[++n]);
         expect (a [i] .equals (v)) .toBe (true);
      }
   }
});

test .concurrent ("slice", () =>
{
   const
      N = 10,
      a = new MFImage ();

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFImage (1,1,3,[++n]))) .toBe (i + 1);

   expect (a) .toHaveLength (N);

   const b = a .slice ();

   expect (b) .toHaveLength (N);
   expect (b) .toBeInstanceOf (MFImage);

   for (let i = 0; i < N; ++ i)
   {
      expect (b [i]) .not .toBe (a [i]);
      expect (b [i] .equals (a [i])) .toBe (true);
   }

   const c = a .slice (1, N - 1);

   expect (c) .toHaveLength (N - 2);
   expect (c) .toBeInstanceOf (MFImage);

   for (let i = 0, j = 1; i < N - 2; ++ i, ++ j)
   {
      expect (c [i]) .not .toBe (a [j]);
      expect (c [i] .equals (a [j])) .toBe (true);
   }
});

test .concurrent ("splice", () =>
{
   const
      N = 10,
      a = new MFImage ();

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a .push (new SFImage (1,1,3,++n))) .toBe (i + 1);

   const
      v0 = a [0] .copy (),
      v1 = a .at (-1) .copy ();

   expect (a) .toHaveLength (N);

   const b = a .splice (1,N-2);

   expect (a) .toHaveLength (2);
   expect (b) .toHaveLength (N-2);
   expect (b) .toBeInstanceOf (MFImage);
   expect (a [0] .equals (v0)) .toBe (true);
   expect (a [1] .equals (v1)) .toBe (true);

   for (let i = 0, n = 1; i < N-2; ++ i)
      expect (b [i] .equals (new SFImage (1,1,3,++n))) .toBe (true);

   const c = a .splice (1,0,...b);

   expect (a) .toHaveLength (N);
   expect (c) .toHaveLength (0);
   expect (c) .toBeInstanceOf (MFImage);

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i] .equals (new SFImage (1,1,3,++n))) .toBe (true);

   const d = a .splice (1,N-2,...b);

   expect (a) .toHaveLength (N);
   expect (d) .toHaveLength (N-2);
   expect (d) .toBeInstanceOf (MFImage);

   for (let i = 0, n = 1; i < N-2; ++ i)
   {
      const v = new SFImage (1,1,3,++n);
      expect (d [i] .equals (v)) .toBe (true);
      expect (b [i] .equals (v)) .toBe (true);
      expect (d [i]) .not .toBe (b [i]);
   }

   for (let i = 0, n = 0; i < N; ++ i)
      expect (a [i] .equals (new SFImage (1,1,3,++n))) .toBe (true);

   const e = new MFImage (new SFImage (1, 2, 1), new SFImage (5, 6, 2), new SFImage (9, 10, 3), new SFImage (13, 14, 4));

   expect (e .splice (2) .equals (new MFImage (new SFImage (9, 10, 3), new SFImage (13, 14, 4)))) .toBe (true);
   expect (e .equals (new MFImage (new SFImage (1, 2, 1), new SFImage (5, 6, 2)))) .toBe (true);

   expect (e .splice () .equals (new MFImage ())) .toBe (true);
   expect (e .equals (new MFImage (new SFImage (1, 2, 1), new SFImage (5, 6, 2)))) .toBe (true);

   const n = new MFImage (new SFImage (1, 2, 1), new SFImage (5, 6, 2), new SFImage (9, 10, 3), new SFImage (13, 14, 4));

   expect (n .splice (-2) .equals (new MFImage(new SFImage (9, 10, 3), new SFImage (13, 14, 4)))) .toBe (true);
   expect (n .equals (new MFImage (new SFImage (1, 2, 1), new SFImage (5, 6, 2)))) .toBe (true);
});

test .concurrent ("sort-reverse", () =>
{
   const a = new MFImage (new SFImage (1, 1, 3, [4]),
                          new SFImage (1, 1, 3, [5]),
                          new SFImage (1, 1, 3, [6]),
                          new SFImage (1, 1, 3, [7]),
                          new SFImage (1, 1, 3, [8]),
                          new SFImage (1, 1, 3, [9]));

   expect (a) .toHaveLength (6);
   expect (a [0] .equals (new SFImage (1, 1, 3, [4]))) .toBe (true);
   expect (a [1] .equals (new SFImage (1, 1, 3, [5]))) .toBe (true);
   expect (a [2] .equals (new SFImage (1, 1, 3, [6]))) .toBe (true);
   expect (a [3] .equals (new SFImage (1, 1, 3, [7]))) .toBe (true);
   expect (a [4] .equals (new SFImage (1, 1, 3, [8]))) .toBe (true);
   expect (a [5] .equals (new SFImage (1, 1, 3, [9]))) .toBe (true);

   expect (a .reverse ()) .toBe (a);

   expect (a) .toHaveLength (6);
   expect (a [0] .equals (new SFImage (1, 1, 3, [9]))) .toBe (true);
   expect (a [1] .equals (new SFImage (1, 1, 3, [8]))) .toBe (true);
   expect (a [2] .equals (new SFImage (1, 1, 3, [7]))) .toBe (true);
   expect (a [3] .equals (new SFImage (1, 1, 3, [6]))) .toBe (true);
   expect (a [4] .equals (new SFImage (1, 1, 3, [5]))) .toBe (true);
   expect (a [5] .equals (new SFImage (1, 1, 3, [4]))) .toBe (true);

   expect (a .sort ()) .toBe (a);

   expect (a) .toHaveLength (6);
   expect (a [0] .equals (new SFImage (1, 1, 3, [4]))) .toBe (true);
   expect (a [1] .equals (new SFImage (1, 1, 3, [5]))) .toBe (true);
   expect (a [2] .equals (new SFImage (1, 1, 3, [6]))) .toBe (true);
   expect (a [3] .equals (new SFImage (1, 1, 3, [7]))) .toBe (true);
   expect (a [4] .equals (new SFImage (1, 1, 3, [8]))) .toBe (true);
   expect (a [5] .equals (new SFImage (1, 1, 3, [9]))) .toBe (true);

   const Algorithm = X3D .Algorithm;

   a .sort ((a, b) => Algorithm .cmp (b .array [0], a .array [0]));

   expect (a) .toHaveLength (6);
   expect (a [0] .equals (new SFImage (1, 1, 3, [9]))) .toBe (true);
   expect (a [1] .equals (new SFImage (1, 1, 3, [8]))) .toBe (true);
   expect (a [2] .equals (new SFImage (1, 1, 3, [7]))) .toBe (true);
   expect (a [3] .equals (new SFImage (1, 1, 3, [6]))) .toBe (true);
   expect (a [4] .equals (new SFImage (1, 1, 3, [5]))) .toBe (true);
   expect (a [5] .equals (new SFImage (1, 1, 3, [4]))) .toBe (true);
});

test .concurrent ("unshift", () =>
{
   const
      N = 1_000,
      a = new MFImage ();

   expect (a) .toHaveLength (0);

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,[++n]);
      expect (a .unshift (v)) .toBe (i + 1);
      expect (a [0] .equals (v)) .toBe (true);
      expect (a) .toHaveLength (i + 1);
   }

   for (let i = 0, n = 0; i < N; ++ i)
   {
      const v = new SFImage (1,1,3,[++n]);
      expect (a .at (-(i + 1)) .equals (v)) .toBe (true);
   }
});

test .concurrent ("enumerate", () =>
{
   const a = new MFImage (new SFImage (1, 2, 3), new SFImage (5, 6, 4), new SFImage (9, 10, 1));

   expect (a) .toBe (a);

   enumerate (["0", "1", "2"], a);

   expect (Reflect .ownKeys (a) .includes ("length")) .toBe (true);
   expect (a) .toHaveLength (3);
   expect (Object .keys (a)) .toEqual (Array .from (Array (a .length) .keys (), String));
   expect (Array .from (a .keys ())) .toEqual (Array .from (Array (a .length) .keys ()));

   const s = Symbol ();

   a [s]     = "symbol";
   a ["abc"] = "string";

   expect (a [s])     .toBe ("symbol");
   expect (a ["abc"]) .toBe ("string");

   expect (Reflect .ownKeys (a) .includes (s))     .toBe (true);
   expect (Reflect .ownKeys (a) .includes ("abc")) .toBe (true);

   expect ("length" in a) .toBe (true);
   expect (s in a) .toBe (true);
   expect ("abc" in a) .toBe (true);

   expect (Object .keys (a) .includes ("0")) .toBe (true);
   expect (Object .keys (a) .includes ("length")) .toBe (false);
   expect (Object .keys (a) .includes (s)) .toBe (false);
   expect (Object .keys (a) .includes ("abc")) .toBe (true);

   expect (Object .keys (a)) .toEqual (Array .from (Array (a .length) .keys (), String) .concat ("abc"));
});

test .concurrent ("enumerate single", () =>
{
   const properties = [
      "width",
      "height",
      "comp",
      "array",
   ];

   enumerate (properties, new MFImage (new SFImage ()) [0]);
});

test .concurrent ("concat", () =>
{
   const
      a = new MFImage (new SFImage (1, 2, 3), new SFImage (2, 3, 4)),
      b = a .concat (),
      c = a .concat (new MFImage (new SFImage (5, 6, 1), new SFImage (7, 8, 2))),
      d = a .concat (new MFImage (new SFImage (5, 6, 1), new SFImage (7, 8, 2)), new MFImage (new SFImage (9, 10, 3), new SFImage (11, 12, 1)));

   expect (a) .toHaveLength (2);
   expect (a [0] .equals (new SFImage (1, 2, 3))) .toBe (true);
   expect (a [1] .equals (new SFImage (2, 3, 4))) .toBe (true);

   expect (b) .toHaveLength (2);
   expect (b [0] .equals (new SFImage (1, 2, 3))) .toBe (true);
   expect (b [1] .equals (new SFImage (2, 3, 4))) .toBe (true);

   expect (c) .toHaveLength (4);
   expect (c [0] .equals (new SFImage (1, 2, 3))) .toBe (true);
   expect (c [1] .equals (new SFImage (2, 3, 4))) .toBe (true);
   expect (c [2] .equals (new SFImage (5, 6, 1))) .toBe (true);
   expect (c [3] .equals (new SFImage (7, 8, 2))) .toBe (true);

   expect (d) .toHaveLength (6);
   expect (d [0] .equals (new SFImage (1, 2, 3))) .toBe (true);
   expect (d [1] .equals (new SFImage (2, 3, 4))) .toBe (true);
   expect (d [2] .equals (new SFImage (5, 6, 1))) .toBe (true);
   expect (d [3] .equals (new SFImage (7, 8, 2))) .toBe (true);
   expect (d [4] .equals (new SFImage (9, 10, 3))) .toBe (true);
   expect (d [5] .equals (new SFImage (11, 12, 1))) .toBe (true);
});

test .concurrent ("flat", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .flat ()) .toBeInstanceOf (Array);
   expect (a .flat ()) .toEqual ([ ]);
   expect (b .flat ()) .toBeInstanceOf (Array);
   expect (b .flat ()) .toEqual ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);
});

test .concurrent ("flatMap", () =>
{
   const
      a = new MFImage (),
      b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .flatMap (v => [... v])) .toBeInstanceOf (Array);
   expect (a .flatMap (v => [... v])) .toEqual ([ ]);
   expect (b .flatMap (v => [... v])) .toBeInstanceOf (Array);
   expect (b .flatMap (v => [... v])) .toEqual ([1,2,3,0xa,0xb,2,1,4,0xc,0xd]);
});

test .concurrent ("length", () =>
{
   expect (new MFImage () .length) .toBe (0);
   expect (new MFImage (new SFImage (2,3,4), new SFImage (2,3,4)) .length) .toBe (2);

   const m = new MFImage ();

   m .length = 10;

   expect (m) .toHaveLength (10);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFImage ())) .toBe (true);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 20; ++ i)
      expect (m [i] .equals (new SFImage ())) .toBe (true);

   // Test shrinking the array and then growing it again.

   for (let i = 0; i < 20; ++ i)
      m [i] = new SFImage (1,2,3);

   m .length = 10;

   expect (m) .toHaveLength (10);

   m .length = 20;

   expect (m) .toHaveLength (20);

   for (let i = 0; i < 10; ++ i)
      expect (m [i] .equals (new SFImage (1,2,3))) .toBe (true);

   for (let i = 10; i < 20; ++ i)
      expect (m [i] .equals (new SFImage ())) .toBe (true);
});

test .concurrent ("fromString", () =>
{
   const a = new MFImage ();

   a .fromString ("[1,2,3,0xa,0xb,2,1,4,0xc,0xd]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   a .fromString ("[1,2,3,4,5]");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFImage (new SFImage (1, 2, 3, new MFInt32 (4,5))))) .toBe (true);

   a .fromString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFImage ())) .toBe (true);

   expect (() => a .fromString ("[1 2 3 4 foo 6 7 8]")) .toThrow (Error);
});

test .concurrent ("fromVRMLString", () =>
{
   const a = new MFImage ();

   a .fromVRMLString ("[1,2,3,0xa,0xb,2,1,4,0xc,0xd]");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   a .fromVRMLString ("[1,2,3,4,5]");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFImage (new SFImage (1, 2, 3, new MFInt32 (4,5))))) .toBe (true);

   a .fromVRMLString ("[ ]");

   expect (a) .toHaveLength (0);
   expect (a .equals (new MFImage ())) .toBe (true);

   expect (() => a .fromVRMLString ("[1 2 3 4 foo 6 7 8]")) .toThrow (Error);
});

test .concurrent ("fromXMLString", () =>
{
   const a = new MFImage ();

   a .fromXMLString ("1,2,3,0xa,0xb,2,1,4,0xc,0xd");

   expect (a) .toHaveLength (2);
   expect (a .equals (new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd))))) .toBe (true);

   a .fromXMLString ("1,2,3,4,5");

   expect (a) .toHaveLength (1);
   expect (a .equals (new MFImage (new SFImage (1, 2, 3, new MFInt32 (4,5))))) .toBe (true);

   expect (() => a .fromXMLString ("")) .toThrow (Error);

   expect (() => a .fromXMLString ("1 2 3 4 foo 6 7 8")) .toThrow (Error);
});

test .concurrent ("toString", () =>
{
   const a = new MFImage ();
   const b = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)));
   const c = new MFImage (new SFImage (1,2,3,new MFInt32(0xa,0xb)), new SFImage (2,1,4,new MFInt32(0xc,0xd)));

   expect (a .toString ({ style: "CLEAN" })) .toBe ("[]");
   expect (b .toString ({ style: "CLEAN" })) .toBe ("1 2 3 0xa 0xb");
   expect (c .toString ({ style: "CLEAN" })) .toBe ("[1 2 3 0xa 0xb 2 1 4 0xc 0xd]");
});

test .concurrent ("enumerate", () =>
{
   enumerate (["0", "1", "2"], new MFImage (new SFImage (), new SFImage (), new SFImage ()));
});
